package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.etlflow;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.EtlFlowEntity;
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
public class EtlFlowCrudAdapter implements CrudAdapter<
        EtlFlowViewModel,
        EtlFlowViewModel,
        NoFilters,
        EtlFlowRow,
        String
        > {

    final EtlFlowViewModel viewModel;
    final ModelStore repository;

    @Override
    public ListingData<EtlFlowRow> search(String searchText,
                                         NoFilters filters,
                                         Pageable pageable,
                                         HttpRequest httpRequest) {
        var data = repository.findAll(searchText, filters, pageable, EtlFlowEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(x -> new EtlFlowRow(x.id(), x.name(), x.ownerModuleId()))
                        .toList()));
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        repository.deleteAllById(selectedIds, EtlFlowEntity.class);
    }

    @Override
    public EtlFlowViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(repository.findById(id, EtlFlowEntity.class).orElseThrow());
    }

    @Override
    public EtlFlowViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(repository.findById(id, EtlFlowEntity.class).orElseThrow());
    }

    @Override
    public EtlFlowViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
