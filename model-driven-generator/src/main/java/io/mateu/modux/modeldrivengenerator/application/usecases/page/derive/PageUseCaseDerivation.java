package io.mateu.modux.modeldrivengenerator.application.usecases.page.derive;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageButtonEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.QueryOperationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.QueryServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseEntity;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.queryservice.vo.QueryCardinality;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * The screen-first half of the intent ladder: a sketched page DERIVES the use cases that serve it
 * (the API half is the inbound OpenAPI import). Buttons without a use case get a stub wired in;
 * CRUD pages over an aggregate get the standard create/update/delete stubs; a listing without a
 * query service gets one with a paged {@code list} operation. Deterministic ids → re-deriving
 * updates instead of duplicating. Pure model→model transformation, unit-testable.
 */
public final class PageUseCaseDerivation {

    /** What deriving a single page produces: stubs to create and the page rewired to them. */
    public record Result(
            List<UseCaseEntity> newUseCases,
            QueryServiceEntity newQueryService,
            PageEntity rewiredPage,
            boolean changed
    ) {}

    private PageUseCaseDerivation() {}

    public static Result derive(PageEntity page,
                                List<AggregateEntity> aggregates,
                                List<UseCaseEntity> existingUseCases,
                                List<QueryServiceEntity> existingQueryServices) {
        var existingIds = existingUseCases.stream().map(UseCaseEntity::id).collect(java.util.stream.Collectors.toSet());
        var newUseCases = new ArrayList<UseCaseEntity>();
        boolean changed = false;

        // --- buttons: every action on the screen is a use case ---
        var toolbar = deriveButtons(page, page.toolbar(), existingIds, newUseCases);
        var bottomBar = deriveButtons(page, page.bottomBar(), existingIds, newUseCases);
        var completion = deriveButtons(page, page.completionActions(), existingIds, newUseCases);
        changed |= toolbar.changed || bottomBar.changed || completion.changed;

        // --- CRUD over an aggregate: the standard trio ---
        var aggregate = page.aggregateId() == null ? null : aggregates.stream()
                .filter(a -> a.id().equals(page.aggregateId())).findFirst().orElse(null);
        if (isCrud(page) && aggregate != null) {
            for (var action : List.of("create", "update", "delete")) {
                var id = "uc-" + aggregate.id() + "-" + action;
                if (!existingIds.contains(id)) {
                    newUseCases.add(stub(id, pascal(action) + aggregate.name(),
                            "delete".equals(action) ? null : aggregate.modelId(), null));
                    existingIds.add(id);
                }
            }
        }

        // --- listing without a query service: derive one with a paged list operation ---
        QueryServiceEntity newQueryService = null;
        String listingQueryServiceId = page.listingQueryServiceId();
        if (isCrud(page) && isBlank(listingQueryServiceId)) {
            var qsId = "qs-" + page.id();
            var exists = existingQueryServices.stream().anyMatch(qs -> qs.id().equals(qsId));
            if (!exists) {
                newQueryService = new QueryServiceEntity(qsId, page.name() + "Queries", null,
                        "Derived from page '" + page.name() + "'.",
                        List.of(new QueryOperationEntity(qsId + "-list", "list",
                                "Listing of " + page.name(), null, page.modelId(), QueryCardinality.Page)));
            }
            listingQueryServiceId = qsId;
            changed = true;
        }

        var rewired = page.toBuilder()
                .toolbar(toolbar.buttons).bottomBar(bottomBar.buttons)
                .completionActions(completion.buttons)
                .listingQueryServiceId(listingQueryServiceId)
                .build();

        return new Result(newUseCases, newQueryService, rewired, changed || !newUseCases.isEmpty());
    }

    // --- helpers ------------------------------------------------------------

    private record Buttons(List<PageButtonEntity> buttons, boolean changed) {}

    private static Buttons deriveButtons(PageEntity page, List<PageButtonEntity> buttons,
                                         Set<String> existingIds, List<UseCaseEntity> newUseCases) {
        if (buttons == null || buttons.isEmpty()) return new Buttons(buttons, false);
        var rewired = new ArrayList<PageButtonEntity>();
        boolean changed = false;
        for (var button : buttons) {
            var useCaseId = button.useCaseId();
            if (isBlank(useCaseId) && !isBlank(button.label())) {
                useCaseId = "uc-" + page.id() + "-" + kebab(button.label());
                changed = true;
            }
            if (!isBlank(useCaseId) && !existingIds.contains(useCaseId)) {
                newUseCases.add(stub(useCaseId, pascal(button.label() != null ? button.label() : useCaseId),
                        page.modelId(), null));
                existingIds.add(useCaseId);
            }
            rewired.add(new PageButtonEntity(button.label(), button.icon(), useCaseId, button.actionId(), button.mappingId()));
        }
        return new Buttons(rewired, changed);
    }

    /** A use-case stub: exposed to the UI, no steps — the developer (or a later intent) fills it in. */
    private static UseCaseEntity stub(String id, String name, String inputModelId, String outputModelId) {
        return new UseCaseEntity(id, name,
                false, false, false, false, true,
                inputModelId, outputModelId,
                List.of(), List.of(), List.of(),
                null, null, null, null,
                null, null, null, null, null,
                false, null, null,
                null, false, null,
                false, null,
                null, null);
    }

    private static boolean isCrud(PageEntity page) {
        return "CRUD".equalsIgnoreCase(page.type());
    }

    private static boolean isBlank(String s) {
        return s == null || s.isBlank();
    }

    private static String kebab(String s) {
        return s.trim().toLowerCase().replaceAll("[^a-z0-9áéíóúñ]+", "-").replaceAll("(^-|-$)", "");
    }

    private static String pascal(String s) {
        var sb = new StringBuilder();
        for (var word : s.split("[^A-Za-z0-9áéíóúñÁÉÍÓÚÑ]+")) {
            if (word.isEmpty()) continue;
            sb.append(Character.toUpperCase(word.charAt(0))).append(word.substring(1));
        }
        return sb.isEmpty() ? s : sb.toString();
    }
}
