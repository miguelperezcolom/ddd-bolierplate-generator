package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.component;

import io.mateu.core.infra.declarative.CrudOrchestrator;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ComponentRow;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.data.NoFilters;
import io.mateu.uidl.interfaces.CrudAdapter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Scope("prototype")
@Title("Components")
public class ComponentCrudOrchestrator extends CrudOrchestrator<
        ComponentViewModel,
        ComponentViewModel,
        ComponentViewModel,
        NoFilters,
        ComponentRow,
        String
        > {

    final ComponentCrudAdapter adapter;

    @Override
    public CrudAdapter<ComponentViewModel, ComponentViewModel, ComponentViewModel, NoFilters, ComponentRow, String> adapter() {
        return adapter;
    }

    @Override
    public String toId(String s) {
        return s;
    }
}
