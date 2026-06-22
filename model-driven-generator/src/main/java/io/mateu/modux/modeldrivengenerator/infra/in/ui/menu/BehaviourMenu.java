package io.mateu.modux.modeldrivengenerator.infra.in.ui.menu;

import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.domainevent.DomainEventCrudOrchestrator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.modelmapping.ModelMappingCrudOrchestrator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.projection.ProjectionCrudOrchestrator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.usecase.UseCaseCrudOrchestrator;
import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;

@Title("Comportamiento")
public class BehaviourMenu {

    @Menu
    UseCaseCrudOrchestrator useCases;

    @Menu
    ProjectionCrudOrchestrator projections;

    @Menu
    ModelMappingCrudOrchestrator modelMappings;

}
