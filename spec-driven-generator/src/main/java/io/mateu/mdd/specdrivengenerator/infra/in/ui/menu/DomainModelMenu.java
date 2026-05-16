package io.mateu.mdd.specdrivengenerator.infra.in.ui.menu;

import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.aggregate.AggregateCrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.entity.EntityCrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.invariant.InvariantCrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.model.ModelCrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.valueobject.ValueObjectCrudOrchestrator;
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
    InvariantCrudOrchestrator invariants;

    @Menu
    ModelCrudOrchestrator models;

}
