package io.mateu.modux.modeldrivengenerator.application.usecases.flow.expand;

import io.mateu.modux.modeldrivengenerator.domain.shared.FieldDataType;

import java.util.Map;

/**
 * Facts the {@link FlowExpander} needs that cannot be derived from the {@link
 * io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.Flow} alone — resolved from the
 * rest of the model (project, services, aggregate, field types).
 */
public record FlowExpansionContext(
        String projectName,
        String sourceServiceName,
        String aggregateName,
        String targetBoundedContextName,
        Map<String, FieldDataType> fieldTypes,
        String targetUseCaseName,
        String targetUseCaseInputModelId,
        String sourceBoundedContextId
) {
    public FieldDataType typeOf(String fieldName) {
        return fieldTypes != null ? fieldTypes.getOrDefault(fieldName, FieldDataType.string) : FieldDataType.string;
    }
}
