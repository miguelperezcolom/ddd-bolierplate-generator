package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.scheduledtrigger;

import io.mateu.core.infra.declarative.CrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ScheduledTriggerRow;
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
@Title("Scheduled Triggers")
@Slf4j
public class ScheduledTriggerCrudOrchestrator extends CrudOrchestrator<
        ScheduledTriggerViewModel,
        ScheduledTriggerViewModel,
        ScheduledTriggerViewModel,
        NoFilters,
        ScheduledTriggerRow,
        String
        > {

    final ScheduledTriggerCrudAdapter adapter;

    @Override
    public CrudAdapter<ScheduledTriggerViewModel, ScheduledTriggerViewModel, ScheduledTriggerViewModel,
            NoFilters, ScheduledTriggerRow, String> adapter() {
        return adapter;
    }

    @Override
    public String toId(String s) {
        return s;
    }
}
