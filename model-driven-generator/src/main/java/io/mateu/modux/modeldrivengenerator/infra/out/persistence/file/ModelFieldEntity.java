package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.model.vo.AnonymizationStrategy;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.model.vo.PiiClassification;
import io.mateu.uidl.data.FieldDataType;

import java.util.List;

public record ModelFieldEntity(
        String id,
        String name,
        boolean basicType,
        FieldDataType type,
        String modelId,
        @JsonProperty("enum") boolean isEnum,
        String enumId,
        List<ModelFieldValidationEntity> validations,
        /** Privacy classification; null/NONE when the field carries no personal data. */
        PiiClassification piiClassification,
        /** How the field is anonymized on erasure requests; meaningful when piiClassification != NONE. */
        AnonymizationStrategy anonymizationStrategy,
        /** Optional human label for UIs; falls back to the humanized field name. */
        String label,
        /** Column priority for compact listings (1 = most important); null = no preference. */
        Integer priority,
        /** Marks the field as the row title in compact/master-detail listings. */
        Boolean identifier
) {

    /** Backward-compatible constructor (pre-PII callers and stores). */
    public ModelFieldEntity(String id, String name, boolean basicType, FieldDataType type,
                            String modelId, boolean isEnum, String enumId,
                            List<ModelFieldValidationEntity> validations) {
        this(id, name, basicType, type, modelId, isEnum, enumId, validations, null, null,
                null, null, null);
    }

    /** Backward-compatible constructor (pre-label/priority callers). */
    public ModelFieldEntity(String id, String name, boolean basicType, FieldDataType type,
                            String modelId, boolean isEnum, String enumId,
                            List<ModelFieldValidationEntity> validations,
                            PiiClassification piiClassification,
                            AnonymizationStrategy anonymizationStrategy) {
        this(id, name, basicType, type, modelId, isEnum, enumId, validations,
                piiClassification, anonymizationStrategy, null, null, null);
    }
}
