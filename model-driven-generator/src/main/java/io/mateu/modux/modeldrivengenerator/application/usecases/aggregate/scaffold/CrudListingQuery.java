package io.mateu.modux.modeldrivengenerator.application.usecases.aggregate.scaffold;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.queryservice.vo.QueryCardinality;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.QueryOperationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.QueryServiceEntity;

import java.util.List;

/**
 * The ONE canonical listing query of an aggregate ({@code qs-crud-{aggId}}, paged over the
 * aggregate's model). Shared by every consumer surface that lists the aggregate — the UI's CRUD
 * page and the CRUD {@link CrudApi} — so they point at the same query instead of each minting its
 * own (the UI used to key it on the page id, the API on the aggregate). Deterministic → idempotent.
 */
public final class CrudListingQuery {

    private CrudListingQuery() {}

    public static String idFor(String aggregateId) {
        return "qs-crud-" + aggregateId;
    }

    public static String listOperationId(String aggregateId) {
        return idFor(aggregateId) + "-list";
    }

    public static QueryServiceEntity forAggregate(AggregateEntity aggregate, String boundedContextId) {
        var qsId = idFor(aggregate.id());
        return new QueryServiceEntity(qsId, cap(aggregate.name()) + "Queries", boundedContextId,
                "Listado canónico del agregado " + aggregate.name() + ".",
                List.of(new QueryOperationEntity(listOperationId(aggregate.id()), "list",
                        "Listado paginado de " + aggregate.name(),
                        null, aggregate.modelId(), QueryCardinality.Page)));
    }

    private static String cap(String s) {
        return s == null || s.isEmpty() ? s : Character.toUpperCase(s.charAt(0)) + s.substring(1);
    }
}
