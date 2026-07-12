package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.rag;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.RagEntity;
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
public class RagCrudAdapter implements CrudAdapter<
        RagViewModel,
        RagViewModel,
        NoFilters,
        RagRow,
        String
        > {

    final RagViewModel viewModel;
    final ModelStore repository;

    @Override
    public ListingData<RagRow> search(String searchText,
                                         NoFilters filters,
                                         Pageable pageable,
                                         HttpRequest httpRequest) {
        var data = repository.findAll(searchText, filters, pageable, RagEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(x -> new RagRow(x.id(), x.name()))
                        .toList()));
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        repository.deleteAllById(selectedIds, RagEntity.class);
    }

    @Override
    public RagViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(repository.findById(id, RagEntity.class).orElseThrow());
    }

    @Override
    public RagViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(repository.findById(id, RagEntity.class).orElseThrow());
    }

    @Override
    public RagViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
