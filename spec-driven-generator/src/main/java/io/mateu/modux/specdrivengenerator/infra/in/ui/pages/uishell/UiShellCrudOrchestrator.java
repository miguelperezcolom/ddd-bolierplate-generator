package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.uishell;

import io.mateu.core.infra.declarative.CrudOrchestrator;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.UiShellRow;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.data.NoFilters;
import io.mateu.uidl.interfaces.CrudAdapter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Scope("prototype")
@Title("UI Shells")
public class UiShellCrudOrchestrator extends CrudOrchestrator<
        UiShellViewModel,
        UiShellViewModel,
        UiShellViewModel,
        NoFilters,
        UiShellRow,
        String
        > {

    final UiShellCrudAdapter adapter;

    @Override
    public CrudAdapter<UiShellViewModel, UiShellViewModel, UiShellViewModel, NoFilters, UiShellRow, String> adapter() {
        return adapter;
    }

    @Override
    public String toId(String s) {
        return s;
    }
}
