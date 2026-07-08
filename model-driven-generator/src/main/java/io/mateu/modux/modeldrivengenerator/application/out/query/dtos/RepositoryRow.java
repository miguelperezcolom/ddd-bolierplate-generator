package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import io.mateu.uidl.annotations.Hidden;

public record RepositoryRow(
        @Hidden String id,
        String name,
        String type,
        String folder,
        String gitUrl
) {
}
