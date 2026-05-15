package io.mateu.mdd.specdrivengenerator.infra.in.ui;

import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.aggregate.AggregateCrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.entity.EntityCrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.invariant.InvariantCrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.module.ModuleCrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.domainevent.DomainEventCrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.gateway.GatewayCrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.modelmapping.ModelMappingCrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.model.ModelCrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.usecase.UseCaseCrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.saga.SagaCrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.projection.ProjectionCrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.subscription.SubscriptionCrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.scheduledtrigger.ScheduledTriggerCrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.readmodel.ReadModelCrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.project.ProjectCrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.service.ServiceCrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.valueobject.ValueObjectCrudOrchestrator;
import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.annotations.UI;

@UI("")
@Title("Spec-driven code generator")
public class SpecDrivenGeneratorHome {

    @Menu
    ProjectCrudOrchestrator projects;

    @Menu
    ServiceCrudOrchestrator services;

    @Menu
    ModuleCrudOrchestrator modules;

    @Menu
    AggregateCrudOrchestrator aggregates;

    @Menu
    EntityCrudOrchestrator entities;

    @Menu
    ValueObjectCrudOrchestrator valueObjects;

    @Menu
    InvariantCrudOrchestrator invariants;

    @Menu
    DomainEventCrudOrchestrator domainEvents;

    @Menu
    UseCaseCrudOrchestrator useCases;

    @Menu
    ModelCrudOrchestrator models;

    @Menu
    GatewayCrudOrchestrator gateways;

    @Menu
    ModelMappingCrudOrchestrator modelMappings;

    @Menu
    SagaCrudOrchestrator sagas;

    @Menu
    ProjectionCrudOrchestrator projections;

    @Menu
    SubscriptionCrudOrchestrator subscriptions;

    @Menu
    ScheduledTriggerCrudOrchestrator scheduledTriggers;

    @Menu
    ReadModelCrudOrchestrator readModels;

}
