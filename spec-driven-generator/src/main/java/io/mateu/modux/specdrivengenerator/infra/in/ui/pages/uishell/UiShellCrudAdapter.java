package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.uishell;

import io.mateu.modux.specdrivengenerator.application.out.query.UiShellQueryService;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.UiShellRow;
import io.mateu.modux.specdrivengenerator.application.usecases.uishell.delete.DeleteUiShellCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.uishell.delete.DeleteUiShellUseCase;
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
public class UiShellCrudAdapter implements CrudAdapter<
        UiShellViewModel,
        UiShellViewModel,
        UiShellViewModel,
        NoFilters,
        UiShellRow,
        String
        > {

    final UiShellViewModel viewModel;
    final DeleteUiShellUseCase deleteUseCase;
    final UiShellQueryService queryService;

    @Override
    public ListingData<UiShellRow> search(String searchText,
                                          NoFilters filters,
                                          Pageable pageable,
                                          HttpRequest httpRequest) {
        return queryService.findAll(searchText, filters, pageable);
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        deleteUseCase.handle(new DeleteUiShellCommand(selectedIds));
    }

    @Override
    public UiShellViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public UiShellViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public UiShellViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
