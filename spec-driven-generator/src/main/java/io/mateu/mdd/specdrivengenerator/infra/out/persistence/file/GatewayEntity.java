package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record GatewayEntity(
        String id,
        String name,
        List<GatewayOperationEntity> operations
) implements Identifiable {
}
