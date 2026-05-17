package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.uiadapter;

import io.mateu.core.infra.declarative.CrudOrchestrator;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.UiAdapterRow;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.data.NoFilters;
import io.mateu.uidl.interfaces.CrudAdapter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Scope("prototype")
@Title("UI Adapters")
public class UiAdapterCrudOrchestrator extends CrudOrchestrator<
        UiAdapterViewModel,
        UiAdapterViewModel,
        UiAdapterViewModel,
        NoFilters,
        UiAdapterRow,
        String
        > {

    final UiAdapterCrudAdapter adapter;

    @Override
    public CrudAdapter<UiAdapterViewModel, UiAdapterViewModel, UiAdapterViewModel, NoFilters, UiAdapterRow, String> adapter() {
        return adapter;
    }

    @Override
    public String toId(String s) {
        return s;
    }
}
