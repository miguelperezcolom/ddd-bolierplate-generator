package io.mateu.modux.modeldrivengenerator.application.usecases.aggregate.scaffold;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.queryservice.vo.QueryCardinality;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ApiOperationEntity;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

/**
 * The CRUD API is the integration surface of an aggregate: its four operations REST-expose the
 * shared CRUD trio ({@link CrudUseCases}) and a canonical listing query — the API wires to them by
 * id (targetUseCaseId / targetQueryOperationId), it does not duplicate them.
 */
class CrudApiTest {

    private static final AggregateEntity RESERVA = new AggregateEntity(
            "agg-reserva", "Reserva", "m-reserva", null, null, null, null,
            false, false, null, List.of(), List.of(), List.of(), null, false);

    @Test
    void the_listing_query_is_a_paged_list_over_the_aggregate_model() {
        var qs = CrudApi.listingQuery(RESERVA, "bc-reservas");
        assertEquals("qs-crud-agg-reserva", qs.id());
        assertEquals("bc-reservas", qs.boundedContextId());
        assertEquals(1, qs.operations().size());
        assertEquals("qs-crud-agg-reserva-list", qs.operations().get(0).id());
        assertEquals("m-reserva", qs.operations().get(0).outputModelId());
        assertEquals(QueryCardinality.Page, qs.operations().get(0).cardinality());
    }

    @Test
    void the_api_rests_on_the_shared_trio_and_the_listing_query() {
        var api = CrudApi.forAggregate(RESERVA, "bc-reservas");
        assertEquals("api-crud-agg-reserva", api.id());
        assertEquals(List.of("bc-reservas"), api.implementedByBoundedContextIds());

        var byMethod = api.operations().stream()
                .collect(java.util.stream.Collectors.toMap(ApiOperationEntity::httpMethod, o -> o));
        assertEquals("uc-crearAgg-reserva", byMethod.get("POST").targetUseCaseId());
        assertEquals("uc-actualizarAgg-reserva", byMethod.get("PUT").targetUseCaseId());
        assertEquals("uc-eliminarAgg-reserva", byMethod.get("DELETE").targetUseCaseId());

        // the GET rests on the query (not a use case): this IS the REST exposure of the listing
        var get = byMethod.get("GET");
        assertNull(get.targetUseCaseId());
        assertEquals("qs-crud-agg-reserva", get.targetQueryServiceId());
        assertEquals("qs-crud-agg-reserva-list", get.targetQueryOperationId());
        assertEquals("m-reserva", get.responseModelId());

        // command operations are wired to their serving use case at the implementing context
        assertEquals(3, api.operationImplementations().size());
        assertEquals("uc-crearAgg-reserva", api.operationImplementations().stream()
                .filter(i -> i.operationId().equals("api-crud-agg-reserva-create"))
                .findFirst().orElseThrow().useCaseId());
    }
}
