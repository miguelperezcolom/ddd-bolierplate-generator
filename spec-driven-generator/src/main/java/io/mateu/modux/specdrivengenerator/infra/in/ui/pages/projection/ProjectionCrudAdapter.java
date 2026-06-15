package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.projection;

import io.mateu.modux.specdrivengenerator.application.out.query.ProjectionQueryService;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ProjectionRow;
import io.mateu.modux.specdrivengenerator.application.usecases.projection.delete.DeleteProjectionCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.projection.delete.DeleteProjectionUseCase;
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
public class ProjectionCrudAdapter implements CrudAdapter<

        ProjectionViewModel,
        ProjectionViewModel,
        NoFilters,
        ProjectionRow,
        String
        > {

    final ProjectionViewModel viewModel;
    final DeleteProjectionUseCase deleteUseCase;
    final ProjectionQueryService queryService;

    @Override
    public ListingData<ProjectionRow> search(String searchText,
                                             NoFilters filters,
                                             Pageable pageable,
                                             HttpRequest httpRequest) {
        return queryService.findAll(searchText, filters, pageable);
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        deleteUseCase.handle(new DeleteProjectionCommand(selectedIds));
    }

    @Override
    public ProjectionViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public ProjectionViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public ProjectionViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
