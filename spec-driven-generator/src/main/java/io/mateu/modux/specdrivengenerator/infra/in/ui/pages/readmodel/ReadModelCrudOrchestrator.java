package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.readmodel;

import io.mateu.core.infra.declarative.CrudOrchestrator;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ReadModelRow;
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
@Title("Read Models")
@Slf4j
public class ReadModelCrudOrchestrator extends CrudOrchestrator<
        ReadModelViewModel,
        ReadModelViewModel,
        ReadModelViewModel,
        NoFilters,
        ReadModelRow,
        String
        > {

    final ReadModelCrudAdapter adapter;

    @Override
    public CrudAdapter<ReadModelViewModel, ReadModelViewModel, ReadModelViewModel,
            NoFilters, ReadModelRow, String> adapter() {
        return adapter;
    }

    @Override
    public String toId(String s) {
        return s;
    }
}
