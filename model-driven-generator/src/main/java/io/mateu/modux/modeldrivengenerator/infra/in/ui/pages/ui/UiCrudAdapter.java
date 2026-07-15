package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.ui;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.NoFilters;
import io.mateu.uidl.data.Page;
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
public class UiCrudAdapter implements CrudAdapter<
        UiViewModel,
        UiViewModel,
        NoFilters,
        UiRow,
        String
        > {

    final UiViewModel viewModel;
    final ModelStore repository;

    @Override
    public ListingData<UiRow> search(String searchText,
                                     NoFilters filters,
                                     Pageable pageable,
                                     HttpRequest httpRequest) {
        var data = repository.findAll(searchText, filters, pageable, UiEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(x -> new UiRow(x.id(), x.name(), x.boundedContextId()))
                        .toList()));
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        repository.deleteAllById(selectedIds, UiEntity.class);
    }

    @Override
    public UiViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(repository.findById(id, UiEntity.class).orElseThrow());
    }

    @Override
    public UiViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(repository.findById(id, UiEntity.class).orElseThrow());
    }

    @Override
    public UiViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
