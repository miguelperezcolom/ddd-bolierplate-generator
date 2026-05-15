package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.saga;

import io.mateu.core.infra.declarative.CrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.SagaRow;
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
@Title("Sagas")
@Slf4j
public class SagaCrudOrchestrator extends CrudOrchestrator<
        SagaViewModel,
        SagaViewModel,
        SagaViewModel,
        NoFilters,
        SagaRow,
        String
        > {

    final SagaCrudAdapter adapter;

    @Override
    public CrudAdapter<SagaViewModel, SagaViewModel, SagaViewModel,
            NoFilters, SagaRow, String> adapter() {
        return adapter;
    }

    @Override
    public String toId(String s) {
        return s;
    }
}
