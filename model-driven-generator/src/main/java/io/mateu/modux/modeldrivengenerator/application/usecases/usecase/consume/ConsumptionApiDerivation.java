package io.mateu.modux.modeldrivengenerator.application.usecases.usecase.consume;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.BoundedContextEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.QueryServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Consumption intent → transport, derived from deployment topology: a use case consumes
 * functionality (another use case, or a query service operation) declared as a step. If the
 * provider lives in the SAME service, the call is an in-process interface — nothing to derive.
 * If the boundedContexts are distributed into DIFFERENT services, the call crosses a process boundary,
 * which implies an API: the provider is exposed as gRPC (names by convention). Pure and idempotent.
 */
public final class ConsumptionApiDerivation {

    public record Result(
            List<UseCaseEntity> useCasesToExpose,
            List<QueryServiceEntity> queryServicesToExpose,
            int crossServiceCalls,
            int inProcessCalls
    ) {}

    private ConsumptionApiDerivation() {}

    public static Result derive(List<UseCaseEntity> useCases,
                                List<QueryServiceEntity> queryServices,
                                List<BoundedContextEntity> boundedContexts,
                                List<ServiceEntity> services) {
        var useCasesToExpose = new ArrayList<UseCaseEntity>();
        var queryServicesToExpose = new ArrayList<QueryServiceEntity>();
        int crossService = 0, inProcess = 0;

        for (var boundedContext : boundedContexts) {
            if (boundedContext.useCaseIds() == null) continue;
            var consumerService = serviceOf(services, boundedContext.id());
            for (var useCaseId : boundedContext.useCaseIds()) {
                var consumer = byId(useCases, useCaseId);
                if (consumer == null || consumer.steps() == null) continue;
                for (var step : consumer.steps()) {
                    if (step.type() == UseCaseStepType.CallUseCase && step.useCaseId() != null) {
                        var provider = byId(useCases, step.useCaseId());
                        var providerBoundedContext = ownerBoundedContext(boundedContexts, step.useCaseId());
                        if (provider == null || providerBoundedContext == null) continue;
                        if (sameService(consumerService, serviceOf(services, providerBoundedContext.id()))) {
                            inProcess++;
                        } else {
                            crossService++;
                            if (!provider.exposedAsGrpc() && !provider.exposedAsRest()
                                    && useCasesToExpose.stream().noneMatch(u -> u.id().equals(provider.id()))) {
                                useCasesToExpose.add(exposedAsGrpc(provider, providerBoundedContext));
                            }
                        }
                    }
                    if (step.type() == UseCaseStepType.CallQueryService && step.queryServiceId() != null) {
                        var provider = queryServices.stream()
                                .filter(qs -> qs.id().equals(step.queryServiceId())).findFirst().orElse(null);
                        if (provider == null) continue;
                        var providerBoundedContextId = provider.boundedContextId();
                        if (sameService(consumerService, serviceOf(services, providerBoundedContextId))) {
                            inProcess++;
                        } else {
                            crossService++;
                            if (!provider.exposedAsGrpc()
                                    && queryServicesToExpose.stream().noneMatch(q -> q.id().equals(provider.id()))) {
                                queryServicesToExpose.add(new QueryServiceEntity(
                                        provider.id(), provider.name(), provider.boundedContextId(),
                                        provider.description(), provider.operations(), true));
                            }
                        }
                    }
                }
            }
        }
        return new Result(useCasesToExpose, queryServicesToExpose, crossService, inProcess);
    }

    // --- helpers ------------------------------------------------------------

    private static UseCaseEntity byId(List<UseCaseEntity> useCases, String id) {
        return useCases.stream().filter(uc -> uc.id().equals(id)).findFirst().orElse(null);
    }

    private static BoundedContextEntity ownerBoundedContext(List<BoundedContextEntity> boundedContexts, String useCaseId) {
        return boundedContexts.stream()
                .filter(m -> m.useCaseIds() != null && m.useCaseIds().contains(useCaseId))
                .findFirst().orElse(null);
    }

    private static ServiceEntity serviceOf(List<ServiceEntity> services, String boundedContextId) {
        if (boundedContextId == null) return null;
        return services.stream()
                .filter(s -> s.boundedContextIds() != null && s.boundedContextIds().contains(boundedContextId))
                .findFirst().orElse(null);
    }

    private static boolean sameService(ServiceEntity a, ServiceEntity b) {
        // unresolvable topology defaults to in-process (nothing to derive, the linter stays quiet)
        if (a == null || b == null) return true;
        return Objects.equals(a.id(), b.id());
    }

    /** Copy of the provider exposed as gRPC, service/method names by convention. */
    private static UseCaseEntity exposedAsGrpc(UseCaseEntity uc, BoundedContextEntity providerBoundedContext) {
        return new UseCaseEntity(uc.id(), uc.name(), uc.exposedAsRest(), true, uc.exposedAsMcp(),
                uc.exposedAsAsync(), uc.exposedAsUi(), uc.inputModelId(), uc.outputModelId(),
                uc.steps(), uc.allowedRoles(), uc.allowedScopes(), uc.apiVersion(), uc.mcpDescription(),
                uc.restHttpMethod(), uc.restPath(), uc.asyncRetryCount(), uc.asyncDeadLetterQueue(),
                uc.asyncOrderingKey(), uc.asyncTopicName(), uc.asyncConsumerGroup(), uc.cacheable(),
                uc.cacheTtlSeconds(), uc.timeoutMs(), uc.transactionBoundary(), uc.idempotencyEnabled(),
                uc.idempotencyKeyField(), uc.rateLimitEnabled(), uc.rateLimitRequestsPerSecond(),
                uc.grpcServiceName() != null ? uc.grpcServiceName() : providerBoundedContext.name(),
                uc.grpcMethodName() != null ? uc.grpcMethodName() : uc.name(),
                uc.decisionIds(), uc.policy());
    }
}
