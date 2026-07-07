package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.workflow;

import io.mateu.modux.modeldrivengenerator.application.out.query.WorkflowQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.WorkflowRow;
import io.mateu.modux.modeldrivengenerator.application.usecases.workflow.delete.DeleteWorkflowCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.workflow.delete.DeleteWorkflowUseCase;
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
public class WorkflowCrudAdapter implements CrudAdapter<

        WorkflowViewModel,
        WorkflowViewModel,
        NoFilters,
        WorkflowRow,
        String
        > {

    final WorkflowViewModel viewModel;
    final DeleteWorkflowUseCase deleteUseCase;
    final WorkflowQueryService queryService;

    @Override
    public ListingData<WorkflowRow> search(String searchText,
                                           NoFilters filters,
                                           Pageable pageable,
                                           HttpRequest httpRequest) {
        return queryService.findAll(searchText, filters, pageable);
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        deleteUseCase.handle(new DeleteWorkflowCommand(selectedIds));
    }

    @Override
    public WorkflowViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public WorkflowViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public WorkflowViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
