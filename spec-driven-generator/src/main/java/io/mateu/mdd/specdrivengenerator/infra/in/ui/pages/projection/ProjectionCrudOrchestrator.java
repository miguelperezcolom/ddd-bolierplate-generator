package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.projection;

import io.mateu.core.infra.declarative.CrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ProjectionRow;
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
@Title("Projections")
@Slf4j
public class ProjectionCrudOrchestrator extends CrudOrchestrator<
        ProjectionViewModel,
        ProjectionViewModel,
        ProjectionViewModel,
        NoFilters,
        ProjectionRow,
        String
        > {

    final ProjectionCrudAdapter adapter;

    @Override
    public CrudAdapter<ProjectionViewModel, ProjectionViewModel, ProjectionViewModel,
            NoFilters, ProjectionRow, String> adapter() {
        return adapter;
    }

    @Override
    public String toId(String s) {
        return s;
    }
}
