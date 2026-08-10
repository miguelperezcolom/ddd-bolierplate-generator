package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType;
import java.util.List;

/**
 * One step of a modeled operation body — the aggregate-method / domain-service counterpart of
 * {@link UseCaseStepEntity}. See {@code docs/design/operation-body.md}.
 *
 * <p>The vocabulary ({@link UseCaseStepType}) is shared with use-case steps; which types are
 * <em>legal</em> for the carrier of this step (aggregate method vs domain service) is enforced by
 * the linter, not by the type system — an aggregate method may not {@code CallGateway}, a domain
 * service may not {@code SetField}.
 *
 * <p>Control flow is <strong>structured nesting</strong>, not a graph: an {@code If} step carries
 * {@code then}/{@code else} child steps, a {@code ForEach} step carries {@code body} child steps.
 * This makes the body reducible by construction and generates plain {@code if}/{@code for} Java.
 * Nested lists are {@code List<OperationStepEntity>} — the record is recursive.
 *
 * @param id         unique id of the step
 * @param name       human name of the step
 * @param type       the step's kind (shared vocabulary; legality per carrier is a lint concern)
 * @param intent     Custom steps: what the step does, in natural language (two-zone hook spec)
 * @param condition  If: the boolean expression that guards {@code then}/{@code else}
 * @param collection If/ForEach helpers: the collection expression a {@code ForEach} iterates
 * @param itemVar    ForEach: the loop variable bound to each element of {@code collection}
 * @param then       If: the steps run when {@code condition} holds
 * @param elseSteps  If: the steps run otherwise (YAML key {@code else})
 * @param body       ForEach: the steps run for each element
 * @param fieldName  SetField: the aggregate field this step mutates
 */
public record OperationStepEntity(
        String id,
        String name,
        UseCaseStepType type,
        String aggregateId,
        String operationId,
        String gatewayId,
        String gatewayOperationId,
        String domainEventId,
        String useCaseId,
        /** CallDomainService: the domain service whose operation this step delegates to. */
        String domainServiceId,
        String modelMappingId,
        String queryServiceId,
        String queryOperationId,
        String applicationEventId,
        String externalUseCaseId,
        String customCodeId,
        /** SetField: the aggregate field this step mutates (aggregate methods only). */
        String fieldName,
        /**
         * SetField: the value expression assigned to {@code fieldName}. A Java expression over the
         * operation's {@code context} (operation-body.md §5, Phase 3c). When present, generation
         * emits {@code context.<fieldName>(<value>)} inline; when absent, it stubs a two-zone hook.
         */
        String value,
        /** If: the boolean expression that decides the branch (invariant-expression grammar). */
        String condition,
        /** ForEach: the collection expression to iterate. */
        String collection,
        /** ForEach: the loop variable bound to each element. */
        String itemVar,
        /** If: steps run when {@code condition} holds. */
        List<OperationStepEntity> then,
        /** If: steps run otherwise (reserved word — persisted as {@code else}). */
        @JsonProperty("else") List<OperationStepEntity> elseSteps,
        /** ForEach: steps run for each element of {@code collection}. */
        List<OperationStepEntity> body,
        /** Custom: what this step does, in natural language (two-zone hook spec). */
        String intent
) {

    /** Backward-compatible constructor (pre-value callers and stores). */
    public OperationStepEntity(String id, String name, UseCaseStepType type, String aggregateId,
            String operationId, String gatewayId, String gatewayOperationId, String domainEventId,
            String useCaseId, String domainServiceId, String modelMappingId, String queryServiceId,
            String queryOperationId, String applicationEventId, String externalUseCaseId,
            String customCodeId, String fieldName, String condition, String collection,
            String itemVar, List<OperationStepEntity> then, List<OperationStepEntity> elseSteps,
            List<OperationStepEntity> body, String intent) {
        this(id, name, type, aggregateId, operationId, gatewayId, gatewayOperationId, domainEventId,
                useCaseId, domainServiceId, modelMappingId, queryServiceId, queryOperationId,
                applicationEventId, externalUseCaseId, customCodeId, fieldName, null, condition,
                collection, itemVar, then, elseSteps, body, intent);
    }
}
