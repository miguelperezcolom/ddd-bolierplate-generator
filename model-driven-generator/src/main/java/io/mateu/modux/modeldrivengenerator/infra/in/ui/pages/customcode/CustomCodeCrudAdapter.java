package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.customcode;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CustomCodeEntity;
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
public class CustomCodeCrudAdapter implements CrudAdapter<
        CustomCodeViewModel,
        CustomCodeViewModel,
        NoFilters,
        CustomCodeRow,
        String
        > {

    final CustomCodeViewModel viewModel;
    final ModelStore repository;

    @Override
    public ListingData<CustomCodeRow> search(String searchText,
                                         NoFilters filters,
                                         Pageable pageable,
                                         HttpRequest httpRequest) {
        var data = repository.findAll(searchText, filters, pageable, CustomCodeEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(x -> new CustomCodeRow(x.id(), x.name(), x.language()))
                        .toList()));
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        repository.deleteAllById(selectedIds, CustomCodeEntity.class);
    }

    @Override
    public CustomCodeViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(repository.findById(id, CustomCodeEntity.class).orElseThrow());
    }

    @Override
    public CustomCodeViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(repository.findById(id, CustomCodeEntity.class).orElseThrow());
    }

    @Override
    public CustomCodeViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
