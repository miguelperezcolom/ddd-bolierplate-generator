package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.identityprovider;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.IdentityProviderEntity;
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
public class IdentityProviderCrudAdapter implements CrudAdapter<
        IdentityProviderViewModel,
        IdentityProviderViewModel,
        NoFilters,
        IdentityProviderRow,
        String
        > {

    final IdentityProviderViewModel viewModel;
    final ModelStore repository;

    @Override
    public ListingData<IdentityProviderRow> search(String searchText,
                                         NoFilters filters,
                                         Pageable pageable,
                                         HttpRequest httpRequest) {
        var data = repository.findAll(searchText, filters, pageable, IdentityProviderEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(x -> new IdentityProviderRow(x.id(), x.name(), x.type()))
                        .toList()));
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        repository.deleteAllById(selectedIds, IdentityProviderEntity.class);
    }

    @Override
    public IdentityProviderViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(repository.findById(id, IdentityProviderEntity.class).orElseThrow());
    }

    @Override
    public IdentityProviderViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(repository.findById(id, IdentityProviderEntity.class).orElseThrow());
    }

    @Override
    public IdentityProviderViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
