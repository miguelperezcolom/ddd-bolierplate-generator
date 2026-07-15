package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.url;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UrlEntity;
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
public class UrlCrudAdapter implements CrudAdapter<
        UrlViewModel,
        UrlViewModel,
        NoFilters,
        UrlRow,
        String
        > {

    final UrlViewModel viewModel;
    final ModelStore repository;

    @Override
    public ListingData<UrlRow> search(String searchText,
                                      NoFilters filters,
                                      Pageable pageable,
                                      HttpRequest httpRequest) {
        var data = repository.findAll(searchText, filters, pageable, UrlEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(x -> new UrlRow(x.id(), x.name(), x.url()))
                        .toList()));
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        repository.deleteAllById(selectedIds, UrlEntity.class);
    }

    @Override
    public UrlViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(repository.findById(id, UrlEntity.class).orElseThrow());
    }

    @Override
    public UrlViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(repository.findById(id, UrlEntity.class).orElseThrow());
    }

    @Override
    public UrlViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
