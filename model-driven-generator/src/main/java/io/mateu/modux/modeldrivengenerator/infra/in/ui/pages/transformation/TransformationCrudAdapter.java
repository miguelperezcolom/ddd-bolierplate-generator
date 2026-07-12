package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.transformation;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.TransformationEntity;
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
public class TransformationCrudAdapter implements CrudAdapter<
        TransformationViewModel,
        TransformationViewModel,
        NoFilters,
        TransformationRow,
        String
        > {

    final TransformationViewModel viewModel;
    final ModelStore repository;

    @Override
    public ListingData<TransformationRow> search(String searchText,
                                         NoFilters filters,
                                         Pageable pageable,
                                         HttpRequest httpRequest) {
        var data = repository.findAll(searchText, filters, pageable, TransformationEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(x -> new TransformationRow(x.id(), x.name()))
                        .toList()));
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        repository.deleteAllById(selectedIds, TransformationEntity.class);
    }

    @Override
    public TransformationViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(repository.findById(id, TransformationEntity.class).orElseThrow());
    }

    @Override
    public TransformationViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(repository.findById(id, TransformationEntity.class).orElseThrow());
    }

    @Override
    public TransformationViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
