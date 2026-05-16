package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.usecase;

import io.mateu.core.infra.declarative.CrudOrchestrator;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.UseCaseRow;
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
@Title("Use Cases")
@Slf4j
public class UseCaseCrudOrchestrator extends CrudOrchestrator<
        UseCaseViewModel,
        UseCaseViewModel,
        UseCaseViewModel,
        NoFilters,
        UseCaseRow,
        String
        > {

    final UseCaseCrudAdapter adapter;

    @Override
    public CrudAdapter<UseCaseViewModel, UseCaseViewModel, UseCaseViewModel,
            NoFilters, UseCaseRow, String> adapter() {
        return adapter;
    }

    @Override
    public String toId(String s) {
        return s;
    }
}
