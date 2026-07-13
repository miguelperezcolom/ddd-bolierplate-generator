package io.mateu.modux.modeldrivengenerator.application.usecases.usecase.consume;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.queryservice.vo.QueryCardinality;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.BoundedContextEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.QueryOperationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.QueryServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseStepEntity;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ConsumptionApiDerivationTest {

    // topology: mod-a (svc-1) consumes from mod-b (svc-2) → cross-service
    //           mod-a (svc-1) consumes from mod-c (svc-1) → in-process
    private static final BoundedContextEntity MOD_A = boundedContext("mod-a", List.of("uc-consumer"));
    private static final BoundedContextEntity MOD_B = boundedContext("mod-b", List.of("uc-provider"));
    private static final BoundedContextEntity MOD_C = boundedContext("mod-c", List.of("uc-local"));
    private static final List<ServiceEntity> SERVICES = List.of(
            service("svc-1", List.of("mod-a", "mod-c")),
            service("svc-2", List.of("mod-b")));

    @Test
    void cross_service_consumption_exposes_the_provider_as_grpc_with_convention_names() {
        var consumer = useCase("uc-consumer", List.of(
                callUseCase("s1", "uc-provider"),
                callUseCase("s2", "uc-local")));
        var provider = useCase("uc-provider", List.of());
        var local = useCase("uc-local", List.of());

        var result = ConsumptionApiDerivation.derive(
                List.of(consumer, provider, local), List.of(),
                List.of(MOD_A, MOD_B, MOD_C), SERVICES);

        // only the cross-service provider is exposed; the in-process one stays an interface
        assertEquals(1, result.useCasesToExpose().size());
        var exposed = result.useCasesToExpose().get(0);
        assertEquals("uc-provider", exposed.id());
        assertTrue(exposed.exposedAsGrpc());
        assertEquals("B", exposed.grpcServiceName());       // provider boundedContext name by convention
        assertEquals("uc-provider", exposed.grpcMethodName());
        assertEquals(1, result.crossServiceCalls());
        assertEquals(1, result.inProcessCalls());
    }

    @Test
    void cross_service_query_service_consumption_is_exposed_too_and_derivation_is_idempotent() {
        var qs = new QueryServiceEntity("qs-precios", "Precios", "mod-b", null,
                List.of(new QueryOperationEntity("op1", "getPrices", null, null, null, QueryCardinality.List)));
        var consumer = useCase("uc-consumer", List.of(callQueryService("s1", "qs-precios", "op1")));

        var first = ConsumptionApiDerivation.derive(List.of(consumer), List.of(qs),
                List.of(MOD_A, MOD_B), SERVICES);
        assertEquals(1, first.queryServicesToExpose().size());
        assertTrue(first.queryServicesToExpose().get(0).exposedAsGrpc());

        // re-derive over the already-exposed provider → nothing new
        var second = ConsumptionApiDerivation.derive(List.of(consumer), first.queryServicesToExpose(),
                List.of(MOD_A, MOD_B), SERVICES);
        assertTrue(second.queryServicesToExpose().isEmpty());
    }

    // --- compact factories ---

    private static BoundedContextEntity boundedContext(String id, List<String> useCaseIds) {
        return new BoundedContextEntity(id, id.replace("mod-", "").toUpperCase(), null, null, null, null,
                useCaseIds, null, null, null, null, null, null, null, null, null, false,
                null, null, null, null, null);
    }

    private static ServiceEntity service(String id, List<String> boundedContextIds) {
        return new ServiceEntity(id, id, null, null, null, null, null, null, null, null, null,
                null, null, null, false, null, null, null, null, null, null, false, false, null,
                null, null, null, null, null, boundedContextIds, null, null, null, false, null);
    }

    private static UseCaseEntity useCase(String id, List<UseCaseStepEntity> steps) {
        return new UseCaseEntity(id, id, false, false, false, false, false, null, null, steps,
                List.of(), List.of(), null, null, null, null, null, null, null, null, null,
                false, null, null, null, false, null, false, null, null, null);
    }

    private static UseCaseStepEntity callUseCase(String id, String target) {
        return new UseCaseStepEntity(id, id, UseCaseStepType.CallUseCase,
                null, null, null, null, null, target, null);
    }

    private static UseCaseStepEntity callQueryService(String id, String qsId, String opId) {
        return new UseCaseStepEntity(id, id, UseCaseStepType.CallQueryService,
                null, null, null, null, null, null, null, qsId, opId);
    }
}
