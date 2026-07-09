package io.mateu.modux.modeldrivengenerator.application.usecases.page.derive;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.QueryServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Runs the screen→use-case derivation over every page: creates the missing use-case stubs (and
 * listing query services), rewires the pages to them, and attaches the stubs to the module that
 * owns the page's aggregate. Idempotent: re-running derives nothing new.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class DerivePageUseCasesUseCase {

    final ModelStore repository;

    /** Returns a human summary of what was derived. */
    public String handle() {
        var aggregates = repository.findAllOfType(AggregateEntity.class);
        int useCases = 0, queryServices = 0, pagesRewired = 0;

        for (var page : repository.findAllOfType(PageEntity.class)) {
            var result = PageUseCaseDerivation.derive(page, aggregates,
                    repository.findAllOfType(UseCaseEntity.class),
                    repository.findAllOfType(QueryServiceEntity.class));
            if (!result.changed()) continue;

            result.newUseCases().forEach(repository::save);
            useCases += result.newUseCases().size();
            if (result.newQueryService() != null) {
                repository.save(result.newQueryService());
                queryServices++;
            }
            repository.save(result.rewiredPage());
            pagesRewired++;

            attachToOwnerModule(page, result.newUseCases());
        }
        var summary = useCases + " use cases y " + queryServices + " query services derivados; "
                + pagesRewired + " páginas recableadas.";
        log.info("Screen→use-case derivation: {}", summary);
        return summary;
    }

    /** New stubs belong to the module that owns the page's aggregate (when resolvable). */
    private void attachToOwnerModule(PageEntity page, List<UseCaseEntity> newUseCases) {
        if (page.aggregateId() == null || newUseCases.isEmpty()) return;
        repository.findAllOfType(ModuleEntity.class).stream()
                .filter(m -> m.aggregateIds() != null && m.aggregateIds().contains(page.aggregateId()))
                .findFirst()
                .ifPresent(m -> {
                    var merged = new ArrayList<>(m.useCaseIds() != null ? m.useCaseIds() : List.<String>of());
                    newUseCases.stream().map(UseCaseEntity::id)
                            .filter(id -> !merged.contains(id)).forEach(merged::add);
                    repository.save(m.toBuilder().useCaseIds(merged).build());
                });
    }
}
