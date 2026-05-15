package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.role;

import io.mateu.core.infra.declarative.CrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.RoleRow;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.data.NoFilters;
import io.mateu.uidl.interfaces.CrudAdapter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Scope("prototype")
@Title("Roles")
public class RoleCrudOrchestrator extends CrudOrchestrator<
        RoleViewModel,
        RoleViewModel,
        RoleViewModel,
        NoFilters,
        RoleRow,
        String
        > {

    final RoleCrudAdapter adapter;

    @Override
    public CrudAdapter<RoleViewModel, RoleViewModel, RoleViewModel, NoFilters, RoleRow, String> adapter() {
        return adapter;
    }

    @Override
    public String toId(String s) {
        return s;
    }
}
