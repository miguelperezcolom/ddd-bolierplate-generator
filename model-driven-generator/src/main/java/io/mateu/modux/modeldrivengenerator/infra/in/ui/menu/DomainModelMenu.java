package io.mateu.modux.modeldrivengenerator.infra.in.ui.menu;

import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.aggregate.AggregateCrudOrchestrator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.domainevent.DomainEventCrudOrchestrator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.entity.EntityCrudOrchestrator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.enumdefinition.EnumDefinitionCrudOrchestrator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.invariant.InvariantCrudOrchestrator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.model.ModelCrudOrchestrator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.model.ModelJourneyPage;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.valueobject.ValueObjectCrudOrchestrator;
import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;

@Title("Modelo de dominio")
public class DomainModelMenu {

    @Menu
    AggregateCrudOrchestrator aggregates;

    @Menu
    EntityCrudOrchestrator entities;

    @Menu
    ValueObjectCrudOrchestrator valueObjects;

    @Menu
    EnumDefinitionCrudOrchestrator enums;

    @Menu
    DomainEventCrudOrchestrator domainEvents;


    @Menu
    InvariantCrudOrchestrator invariants;

    @Menu
    ModelCrudOrchestrator models;

    @Menu
    ModelJourneyPage modelJourneys;

}
