package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.repository;

import io.mateu.modux.modeldrivengenerator.application.out.query.RepositoryQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.RepositoryRow;
import io.mateu.modux.modeldrivengenerator.application.usecases.repository.delete.DeleteRepositoryCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.repository.delete.DeleteRepositoryUseCase;
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
public class RepositoryCrudAdapter implements CrudAdapter<
        RepositoryViewModel,
        RepositoryViewModel,
        NoFilters,
        RepositoryRow,
        String
        > {

    final RepositoryViewModel viewModel;
    final DeleteRepositoryUseCase deleteUseCase;
    final RepositoryQueryService queryService;

    @Override
    public ListingData<RepositoryRow> search(String searchText,
                                             NoFilters filters,
                                             Pageable pageable,
                                             HttpRequest httpRequest) {
        return queryService.findAll(searchText, filters, pageable);
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        deleteUseCase.handle(new DeleteRepositoryCommand(selectedIds));
    }

    @Override
    public RepositoryViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public RepositoryViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public RepositoryViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
