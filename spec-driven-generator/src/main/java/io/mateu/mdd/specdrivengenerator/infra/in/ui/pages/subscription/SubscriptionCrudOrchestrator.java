package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.subscription;

import io.mateu.core.infra.declarative.CrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.SubscriptionRow;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.data.NoFilters;
import io.mateu.uidl.interfaces.CrudAdapter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Scope("prototype")
@Title("Subscriptions")
@Slf4j
public class SubscriptionCrudOrchestrator extends CrudOrchestrator<
        SubscriptionViewModel,
        SubscriptionViewModel,
        SubscriptionViewModel,
        NoFilters,
        SubscriptionRow,
        String
        > {

    final SubscriptionCrudAdapter adapter;

    @Override
    public CrudAdapter<SubscriptionViewModel, SubscriptionViewModel, SubscriptionViewModel,
            NoFilters, SubscriptionRow, String> adapter() {
        return adapter;
    }

    @Override
    public String toId(String s) {
        return s;
    }
}
