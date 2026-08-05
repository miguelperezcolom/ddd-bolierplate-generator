package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.shared.Identifiable;

public record ComponentEntity(
        String id,
        String name,
        String dataSourceType,
        String gatewayId,
        String presentationType,
        String queryServiceId
,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId
) implements Identifiable {
}
