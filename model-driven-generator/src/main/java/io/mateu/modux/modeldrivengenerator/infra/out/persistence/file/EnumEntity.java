package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record EnumEntity(String id, List<EnumValueEntity> values) implements Identifiable {
}
