package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.uiadapter;

import io.mateu.modux.specdrivengenerator.application.out.query.UiAdapterQueryService;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.UiAdapterRow;
import io.mateu.modux.specdrivengenerator.application.usecases.uiadapter.delete.DeleteUiAdapterCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.uiadapter.delete.DeleteUiAdapterUseCase;
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
public class UiAdapterCrudAdapter implements CrudAdapter<
        UiAdapterViewModel,
        UiAdapterViewModel,
        UiAdapterViewModel,
        NoFilters,
        UiAdapterRow,
        String
        > {

    final UiAdapterViewModel viewModel;
    final DeleteUiAdapterUseCase deleteUseCase;
    final UiAdapterQueryService queryService;

    @Override
    public ListingData<UiAdapterRow> search(String searchText,
                                             NoFilters filters,
                                             Pageable pageable,
                                             HttpRequest httpRequest) {
        return queryService.findAll(searchText, filters, pageable);
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        deleteUseCase.handle(new DeleteUiAdapterCommand(selectedIds));
    }

    @Override
    public UiAdapterViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public UiAdapterViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public UiAdapterViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
