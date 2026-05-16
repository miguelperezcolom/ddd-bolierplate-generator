package io.mateu.mdd.specdrivengenerator.infra.in.ui.menu;

import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.domainevent.DomainEventCrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.modelmapping.ModelMappingCrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.usecase.UseCaseCrudOrchestrator;
import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;

@Title("Comportamiento")
public class BehaviourMenu {

    @Menu
    UseCaseCrudOrchestrator useCases;

    @Menu
    DomainEventCrudOrchestrator domainEvents;

    @Menu
    ModelMappingCrudOrchestrator modelMappings;

}
