package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

public record ValueObjectEntity(
        String id,
        String name,
        String type,
        String valuesJson,
        String fieldsJson,
        String dataType) implements Identifiable {
}
