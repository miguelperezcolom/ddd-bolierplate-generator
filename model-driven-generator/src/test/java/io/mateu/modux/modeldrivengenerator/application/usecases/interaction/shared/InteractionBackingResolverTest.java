package io.mateu.modux.modeldrivengenerator.application.usecases.interaction.shared;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowArchetype;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.interaction.vo.InteractionMessageKind;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ApiEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ApiOperationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ExternalSystemEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ExternalSystemUseCaseEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.FlowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.OperationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageButtonEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.QueryServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.RoleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiAdapterEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiComponentNodeEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiMenuItemEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseStepEntity;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Backing is strict by kind: a message is backed only when a mechanism of its OWN kind
 * performs it. Each test wires one rule and checks both the positive and the negative.
 */
class InteractionBackingResolverTest {

    @Test
    void command_actor_to_use_case_is_backed_by_allowed_use_cases() {
        var catalog = catalog(
                List.of(RoleEntity.builder().id("huesped").name("Huésped")
                        .allowedUseCaseIds(List.of("uc-checkin")).build()),
                null, null,
                List.of(useCase("uc-checkin")), null, null, null, null, null, null, null);

        assertTrue(backed(catalog, "huesped", "uc-checkin", InteractionMessageKind.COMMAND, null));
        assertFalse(backed(catalog, "huesped", "uc-otro", InteractionMessageKind.COMMAND, null));
        // strict by kind: the same link does not back a QUERY
        assertFalse(backed(catalog, "huesped", "uc-checkin", InteractionMessageKind.QUERY, null));
    }

    @Test
    void command_actor_to_page_is_backed_by_a_menu_entry_in_an_app_the_actor_uses() {
        var app = UiAdapterEntity.builder().id("app-recepcion").name("Recepción")
                .menuItems(List.of(new UiMenuItemEntity("Check-in", null, null, null,
                        "pagina-checkin", List.of(), "mi-1", null, null)))
                .build();
        var huesped = RoleEntity.builder().id("huesped").name("Huésped")
                .uiAdapterIds(List.of("app-recepcion")).build();
        var outsider = RoleEntity.builder().id("externo").name("Externo").build();
        var catalog = catalog(
                List.of(huesped, outsider),
                List.of(app),
                List.of(PageEntity.builder().id("pagina-checkin").name("Check-in").build()),
                null, null, null, null, null, null, null, null);

        assertTrue(backed(catalog, "huesped", "pagina-checkin", InteractionMessageKind.COMMAND, null));
        // an actor not linked to the app holding the page is not backed
        assertFalse(backed(catalog, "externo", "pagina-checkin", InteractionMessageKind.COMMAND, null));
    }

    @Test
    void command_page_to_use_case_is_backed_by_a_button_or_a_content_component() {
        var page = PageEntity.builder().id("pagina-checkin").name("Check-in")
                .toolbar(List.of(new PageButtonEntity("Confirmar", null, "uc-checkin", null)))
                .content(List.of(UiComponentNodeEntity.builder().id("n1").kind("verticalLayout")
                        .children(List.of(UiComponentNodeEntity.builder().id("n2").kind("button")
                                .useCaseId("uc-cancelar").build()))
                        .build()))
                .build();
        var catalog = catalog(null, null, List.of(page),
                List.of(useCase("uc-checkin"), useCase("uc-cancelar"), useCase("uc-ajeno")),
                null, null, null, null, null, null, null);

        assertTrue(backed(catalog, "pagina-checkin", "uc-checkin", InteractionMessageKind.COMMAND, null));
        assertTrue(backed(catalog, "pagina-checkin", "uc-cancelar", InteractionMessageKind.COMMAND, null));
        assertFalse(backed(catalog, "pagina-checkin", "uc-ajeno", InteractionMessageKind.COMMAND, null));
    }

    @Test
    void command_api_operation_to_use_case_is_backed_by_the_operation_wiring() {
        var api = ApiEntity.builder().id("api-publica").name("API")
                .operations(List.of(ApiOperationEntity.builder().id("op-checkin").name("POST /checkin")
                        .targetUseCaseId("uc-checkin").build()))
                .build();
        var catalog = catalog(null, null, null, List.of(useCase("uc-checkin")),
                null, null, null, List.of(api), null, null, null);

        assertTrue(backed(catalog, "op-checkin", "uc-checkin", InteractionMessageKind.COMMAND, null));
        assertFalse(backed(catalog, "op-checkin", "uc-otro", InteractionMessageKind.COMMAND, null));
    }

    @Test
    void command_use_case_to_aggregate_is_backed_by_a_write_step() {
        var reserva = new AggregateEntity("reserva", "Reserva", null, null, null, null, null,
                false, false, null, List.of(), List.of(), List.of(), null, false);
        var uc = useCase("uc-checkin",
                step(UseCaseStepType.SaveAggregate, "reserva", null, null, null, null, null, null));
        var catalog = catalog(null, null, null, List.of(uc), List.of(reserva),
                null, null, null, null, null, null);

        assertTrue(backed(catalog, "uc-checkin", "reserva", InteractionMessageKind.COMMAND, null));
        assertFalse(backed(catalog, "uc-checkin", "otro-agregado", InteractionMessageKind.COMMAND, null));
    }

    @Test
    void query_is_backed_by_call_steps_listings_and_allowed_query_services() {
        var qs = new QueryServiceEntity("qs-disponibilidad", "Disponibilidad", null, null, List.of());
        var uc = useCase("uc-consulta",
                step(UseCaseStepType.CallQueryService, null, null, null, null, "qs-disponibilidad", null, null));
        var page = PageEntity.builder().id("pagina-listado").name("Listado")
                .listingQueryServiceId("qs-disponibilidad").build();
        var actor = RoleEntity.builder().id("huesped").name("Huésped")
                .allowedQueryServiceIds(List.of("qs-disponibilidad")).build();
        var catalog = catalog(List.of(actor), null, List.of(page), List.of(uc, useCase("uc-sin-step")), null,
                List.of(qs), null, null, null, null, null);

        assertTrue(backed(catalog, "uc-consulta", "qs-disponibilidad", InteractionMessageKind.QUERY, null));
        assertTrue(backed(catalog, "pagina-listado", "qs-disponibilidad", InteractionMessageKind.QUERY, null));
        assertTrue(backed(catalog, "huesped", "qs-disponibilidad", InteractionMessageKind.QUERY, null));
        // a use case without the CallQueryService step is not backed
        assertFalse(backed(catalog, "uc-sin-step", "qs-disponibilidad", InteractionMessageKind.QUERY, null));
    }

    @Test
    void event_is_backed_when_the_emitter_emits_it_and_the_target_consumes_it() {
        var reserva = new AggregateEntity("reserva", "Reserva", null, null, null, null, null,
                false, false, null,
                List.of(new OperationEntity("op-checkin", "checkin", null, null, null, null,
                        "CheckinRealizado", null, false, null)),
                List.of(), List.of(), null, false);
        var flow = new FlowEntity("f1", "Notifica", null, FlowArchetype.TRIGGERS,
                "reserva", "CheckinRealizado", "mod-b", null, List.of(), "uc-notificar", List.of(), List.of());
        var catalog = catalog(null, null, null, List.of(useCase("uc-notificar")), List.of(reserva),
                null, null, null, List.of(flow), null, null);

        assertTrue(backed(catalog, "reserva", "uc-notificar", InteractionMessageKind.EVENT, "CheckinRealizado"));
        // the emitter must emit THE label's event
        assertFalse(backed(catalog, "reserva", "uc-notificar", InteractionMessageKind.EVENT, "OtroEvento"));
        // and someone must consume it
        assertFalse(backed(catalog, "reserva", "uc-ajena", InteractionMessageKind.EVENT, "CheckinRealizado"));
        // strict by kind: an emits + flow does not back a COMMAND
        assertFalse(backed(catalog, "reserva", "uc-notificar", InteractionMessageKind.COMMAND, "CheckinRealizado"));
    }

    @Test
    void external_is_backed_by_a_call_external_use_case_step() {
        var housekeeping = ExternalSystemEntity.builder().id("housekeeping").name("Housekeeping")
                .useCases(List.of(new ExternalSystemUseCaseEntity("ext-limpieza", "POST /limpieza", null)))
                .build();
        var uc = useCase("uc-notificar",
                step(UseCaseStepType.CallExternalUseCase, null, null, null, null, null, null, "ext-limpieza"));
        var catalog = catalog(null, null, null, List.of(uc), null,
                null, List.of(housekeeping), null, null, null, null);

        assertTrue(backed(catalog, "uc-notificar", "housekeeping", InteractionMessageKind.EXTERNAL, null));
        assertFalse(backed(catalog, "uc-notificar", "otro-sistema", InteractionMessageKind.EXTERNAL, null));
        // strict by kind: the external call does not back a COMMAND to the same system
        assertFalse(backed(catalog, "uc-notificar", "housekeeping", InteractionMessageKind.COMMAND, null));
    }

    // ---- fixtures ----------------------------------------------------------------------------

    private static boolean backed(InteractionCatalog catalog, String from, String to,
                                  InteractionMessageKind kind, String label) {
        return InteractionBackingResolver.isBacked(catalog, from, to, kind, label);
    }

    private static InteractionCatalog catalog(
            List<RoleEntity> actors, List<UiAdapterEntity> apps, List<PageEntity> pages,
            List<UseCaseEntity> useCases, List<AggregateEntity> aggregates,
            List<QueryServiceEntity> queryServices, List<ExternalSystemEntity> externalSystems,
            List<ApiEntity> apis, List<FlowEntity> flows,
            List<io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SubscriptionEntity> subscriptions,
            List<io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DomainEventEntity> domainEvents) {
        return new InteractionCatalog(actors, apps, pages, useCases, aggregates, null, queryServices,
                null, externalSystems, apis, null, null, null, flows, subscriptions, domainEvents, null);
    }

    private static UseCaseEntity useCase(String id, UseCaseStepEntity... steps) {
        return new UseCaseEntity(id, id, false, false, false, false, false, null, null,
                List.of(steps), null, null, null, null, null, null, null, null, null, null, null,
                false, null, null, null, false, null, false, null, null, null, List.of(), false, null);
    }

    private static UseCaseStepEntity step(UseCaseStepType type, String aggregateId, String operationId,
                                          String domainEventId, String useCaseId, String queryServiceId,
                                          String applicationEventId, String externalUseCaseId) {
        return new UseCaseStepEntity(null, null, type, aggregateId, operationId, null, null,
                domainEventId, useCaseId, null, queryServiceId, null, null, applicationEventId,
                externalUseCaseId, null);
    }
}
