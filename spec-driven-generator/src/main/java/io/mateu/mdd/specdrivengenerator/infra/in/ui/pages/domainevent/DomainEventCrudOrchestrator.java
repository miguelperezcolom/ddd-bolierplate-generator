package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.domainevent;

import io.mateu.core.infra.declarative.CrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.DomainEventRow;
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
@Title("Domain Events")
@Slf4j
public class DomainEventCrudOrchestrator extends CrudOrchestrator<
        DomainEventViewModel,
        DomainEventViewModel,
        DomainEventViewModel,
        NoFilters,
        DomainEventRow,
        String
        > {

    final DomainEventCrudAdapter adapter;

    @Override
    public CrudAdapter<DomainEventViewModel, DomainEventViewModel, DomainEventViewModel,
            NoFilters, DomainEventRow, String> adapter() {
        return adapter;
    }

    @Override
    public String toId(String s) {
        return s;
    }
}
