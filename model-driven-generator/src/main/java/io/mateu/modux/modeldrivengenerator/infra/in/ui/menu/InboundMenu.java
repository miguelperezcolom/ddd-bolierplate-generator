package io.mateu.modux.modeldrivengenerator.infra.in.ui.menu;

import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.scheduledtrigger.ScheduledTriggerCrudOrchestrator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.subscription.SubscriptionCrudOrchestrator;
import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;

@Title("Inbound")
public class InboundMenu {

    @Menu
    UIMenu ui;

    @Menu
    SubscriptionCrudOrchestrator subscriptions;

    @Menu
    ScheduledTriggerCrudOrchestrator scheduledTriggers;

}
