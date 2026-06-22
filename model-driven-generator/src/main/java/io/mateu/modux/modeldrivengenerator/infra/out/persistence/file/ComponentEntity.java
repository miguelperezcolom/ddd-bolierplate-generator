package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

public record ComponentEntity(
        String id,
        String name,
        String dataSourceType,
        String gatewayId,
        String presentationType,
        String queryServiceId
) implements Identifiable {
}
