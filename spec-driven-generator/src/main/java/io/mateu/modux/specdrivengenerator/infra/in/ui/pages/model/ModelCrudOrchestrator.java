package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.model;

import io.mateu.core.infra.declarative.CrudOrchestrator;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ModelRow;
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
@Title("Models")
@Slf4j
public class ModelCrudOrchestrator extends CrudOrchestrator<
        ModelViewModel,
        ModelViewModel,
        ModelViewModel,
        NoFilters,
        ModelRow,
        String
        > {

    final ModelCrudAdapter adapter;

    @Override
    public CrudAdapter<ModelViewModel, ModelViewModel, ModelViewModel,
            NoFilters, ModelRow, String> adapter() {
        return adapter;
    }

    @Override
    public String toId(String s) {
        return s;
    }
}
