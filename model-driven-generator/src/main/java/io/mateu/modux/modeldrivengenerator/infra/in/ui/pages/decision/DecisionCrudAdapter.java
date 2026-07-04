package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.decision;

import io.mateu.modux.modeldrivengenerator.application.out.query.DecisionQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.DecisionRow;
import io.mateu.modux.modeldrivengenerator.application.usecases.decision.delete.DeleteDecisionCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.decision.delete.DeleteDecisionUseCase;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.NoFilters;
import io.mateu.uidl.data.Pageable;
import io.mateu.uidl.interfaces.CrudAdapter;
import io.mateu.uidl.interfaces.HttpRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Scope("prototype")
@RequiredArgsConstructor
public class DecisionCrudAdapter implements CrudAdapter<

        DecisionViewModel,
        DecisionViewModel,
        NoFilters,
        DecisionRow,
        String
        > {

    final DecisionViewModel viewModel;
    final DeleteDecisionUseCase deleteUseCase;
    final DecisionQueryService queryService;

    @Override
    public ListingData<DecisionRow> search(String searchText,
                                           NoFilters filters,
                                           Pageable pageable,
                                           HttpRequest httpRequest) {
        return queryService.findAll(searchText, filters, pageable);
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        deleteUseCase.handle(new DeleteDecisionCommand(selectedIds));
    }

    @Override
    public DecisionViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public DecisionViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public DecisionViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
