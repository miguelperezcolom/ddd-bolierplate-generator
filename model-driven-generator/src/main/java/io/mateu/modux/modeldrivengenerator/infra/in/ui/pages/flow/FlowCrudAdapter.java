package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.flow;

import io.mateu.modux.modeldrivengenerator.application.out.query.FlowQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.FlowRow;
import io.mateu.modux.modeldrivengenerator.application.usecases.flow.delete.DeleteFlowCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.flow.delete.DeleteFlowUseCase;
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
public class FlowCrudAdapter implements CrudAdapter<

        FlowViewModel,
        FlowViewModel,
        NoFilters,
        FlowRow,
        String
        > {

    final FlowViewModel viewModel;
    final DeleteFlowUseCase deleteUseCase;
    final FlowQueryService queryService;

    @Override
    public ListingData<FlowRow> search(String searchText,
                                       NoFilters filters,
                                       Pageable pageable,
                                       HttpRequest httpRequest) {
        return queryService.findAll(searchText, filters, pageable);
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        deleteUseCase.handle(new DeleteFlowCommand(selectedIds));
    }

    @Override
    public FlowViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public FlowViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public FlowViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
