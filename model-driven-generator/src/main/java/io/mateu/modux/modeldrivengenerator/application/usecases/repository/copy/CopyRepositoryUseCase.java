package io.mateu.modux.modeldrivengenerator.application.usecases.repository.copy;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.application.usecases.repository.open.OpenRepositoryUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Copies a repository's model into another repository (F4 of
 * docs/design/storage-ports.md): open the source, take the snapshot, open the target
 * and replace its contents — which doubles as YAML export/import between backends
 * (file ↔ database) with zero extra machinery. The target repository stays open,
 * because you copied it to work there.
 */
@Service
@RequiredArgsConstructor
public class CopyRepositoryUseCase {

    final OpenRepositoryUseCase openUseCase;
    final ModelStore store;

    public void handle(String sourceRepositoryId, String targetRepositoryId) {
        if (sourceRepositoryId.equals(targetRepositoryId)) {
            throw new IllegalArgumentException("Origen y destino son el mismo repositorio");
        }
        openUseCase.handle(sourceRepositoryId);
        var model = store.snapshot();
        openUseCase.handle(targetRepositoryId);
        store.replaceWith(model);
    }
}
