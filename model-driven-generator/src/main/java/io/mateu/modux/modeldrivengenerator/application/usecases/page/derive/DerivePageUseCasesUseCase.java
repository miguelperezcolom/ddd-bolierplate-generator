package io.mateu.modux.modeldrivengenerator.application.usecases.page.derive;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.BoundedContextEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DomainEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.QueryServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Runs the screen→use-case derivation: creates the missing use-case stubs (and listing query
 * services and lifecycle domain events), rewires the pages to them, and attaches everything to
 * the boundedContext that owns the page's aggregate. Idempotent: re-running derives nothing new.
 * Invoked for every page (the manual «Derive» button) or for a single page (the automatic hook
 * on page create/save).
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class DerivePageUseCasesUseCase {

    final ModelStore repository;

    /** Returns a human summary of what was derived across every page. */
    public String handle() {
        int useCases = 0, queryServices = 0, domainEvents = 0, pagesRewired = 0;
        for (var page : repository.findAllOfType(PageEntity.class)) {
            var result = derive(page);
            if (result == null) continue;
            useCases += result.newUseCases().size();
            queryServices += result.newQueryService() != null ? 1 : 0;
            domainEvents += result.newDomainEvents().size();
            pagesRewired++;
        }
        var summary = useCases + " use cases, " + queryServices + " query services y " + domainEvents
                + " eventos de dominio derivados; " + pagesRewired + " páginas recableadas.";
        log.info("Screen→use-case derivation: {}", summary);
        return summary;
    }

    /** Derives a single page — the automatic hook after page create/save. No-op when nothing is missing. */
    public void handle(String pageId) {
        repository.findById(pageId, PageEntity.class).ifPresent(this::derive);
    }

    /** Derives one page and persists the outcome; null when nothing changed. */
    private PageUseCaseDerivation.Result derive(PageEntity page) {
        var result = PageUseCaseDerivation.derive(page,
                repository.findAllOfType(AggregateEntity.class),
                repository.findAllOfType(UseCaseEntity.class),
                repository.findAllOfType(QueryServiceEntity.class),
                repository.findAllOfType(DomainEventEntity.class));
        if (!result.changed()) return null;

        result.newUseCases().forEach(repository::save);
        if (result.newQueryService() != null) {
            repository.save(result.newQueryService());
        }
        result.newDomainEvents().forEach(repository::save);
        repository.save(result.rewiredPage());

        attachToOwnerBoundedContext(page, result.newUseCases(), result.newDomainEvents());
        return result;
    }

    /** New stubs belong to the boundedContext that owns the page's aggregate (when resolvable). */
    private void attachToOwnerBoundedContext(PageEntity page, List<UseCaseEntity> newUseCases,
                                             List<DomainEventEntity> newDomainEvents) {
        if (page.aggregateId() == null || (newUseCases.isEmpty() && newDomainEvents.isEmpty())) return;
        repository.findAllOfType(BoundedContextEntity.class).stream()
                .filter(m -> m.aggregateIds() != null && m.aggregateIds().contains(page.aggregateId()))
                .findFirst()
                .ifPresent(m -> {
                    var mergedUseCases = new ArrayList<>(m.useCaseIds() != null ? m.useCaseIds() : List.<String>of());
                    newUseCases.stream().map(UseCaseEntity::id)
                            .filter(id -> !mergedUseCases.contains(id)).forEach(mergedUseCases::add);
                    var mergedEvents = new ArrayList<>(m.domainEventIds() != null ? m.domainEventIds() : List.<String>of());
                    newDomainEvents.stream().map(DomainEventEntity::id)
                            .filter(id -> !mergedEvents.contains(id)).forEach(mergedEvents::add);
                    repository.save(m.toBuilder()
                            .useCaseIds(mergedUseCases)
                            .domainEventIds(mergedEvents)
                            .build());
                });
    }
}
