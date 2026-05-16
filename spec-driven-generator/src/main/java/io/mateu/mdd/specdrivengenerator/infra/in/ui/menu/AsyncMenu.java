package io.mateu.mdd.specdrivengenerator.infra.in.ui.menu;

import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.projection.ProjectionCrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.saga.SagaCrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.scheduledtrigger.ScheduledTriggerCrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.subscription.SubscriptionCrudOrchestrator;
import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;

@Title("Async / Reacciones")
public class AsyncMenu {

    @Menu
    SagaCrudOrchestrator sagas;

    @Menu
    SubscriptionCrudOrchestrator subscriptions;

    @Menu
    ProjectionCrudOrchestrator projections;

    @Menu
    ScheduledTriggerCrudOrchestrator scheduledTriggers;

}
