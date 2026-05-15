package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record ModelEntity(
        String id,
        String name,
        List<ModelFieldEntity> fields,
        List<ModelValidationEntity> validations
) implements Identifiable {
}
