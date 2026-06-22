package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.usecase;

import io.mateu.modux.modeldrivengenerator.application.out.query.UseCaseQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.UseCaseRow;
import io.mateu.modux.modeldrivengenerator.application.usecases.usecase.delete.DeleteUseCaseCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.usecase.delete.DeleteUseCaseUseCase;
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
public class UseCaseCrudAdapter implements CrudAdapter<
        UseCaseViewModel,
        UseCaseViewModel,
        NoFilters,
        UseCaseRow,
        String
        > {

    final UseCaseViewModel viewModel;
    final DeleteUseCaseUseCase deleteUseCase;
    final UseCaseQueryService queryService;

    @Override
    public ListingData<UseCaseRow> search(String searchText,
                                          NoFilters filters,
                                          Pageable pageable,
                                          HttpRequest httpRequest) {
        return queryService.findAll(searchText, filters, pageable);
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        deleteUseCase.handle(new DeleteUseCaseCommand(selectedIds));
    }

    @Override
    public UseCaseViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public UseCaseViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public UseCaseViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
