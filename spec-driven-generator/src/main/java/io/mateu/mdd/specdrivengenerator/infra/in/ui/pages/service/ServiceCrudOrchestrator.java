package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.service;

import io.mateu.core.infra.declarative.CrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ServiceRow;
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
@Title("Services")
@Slf4j
public class ServiceCrudOrchestrator extends CrudOrchestrator<
        ServiceViewModel,
        ServiceViewModel,
        ServiceViewModel,
        NoFilters,
        ServiceRow,
        String
        > {

    final ServiceCrudAdapter adapter;

    @Override
    public CrudAdapter<ServiceViewModel, ServiceViewModel, ServiceViewModel,
            NoFilters, ServiceRow, String> adapter() {
        return adapter;
    }

    @Override
    public String toId(String s) {
        return s;
    }
}
