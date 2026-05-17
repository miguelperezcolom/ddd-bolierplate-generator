package io.mateu.modux.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

public record ComponentEntity(
        String id,
        String name,
        String dataSourceType,
        String queryServiceId,
        String gatewayId,
        String presentationType
) implements Identifiable {
}
