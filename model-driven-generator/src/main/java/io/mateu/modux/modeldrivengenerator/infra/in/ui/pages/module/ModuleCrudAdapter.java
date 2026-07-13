package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.module;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity;
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
public class ModuleCrudAdapter implements CrudAdapter<
        ModuleViewModel,
        ModuleViewModel,
        NoFilters,
        ModuleRow,
        String
        > {

    final ModuleViewModel viewModel;
    final ModelStore repository;

    @Override
    public ListingData<ModuleRow> search(String searchText,
                                         NoFilters filters,
                                         Pageable pageable,
                                         HttpRequest httpRequest) {
        var data = repository.findAll(searchText, filters, pageable, ModuleEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(x -> new ModuleRow(x.id(), x.name(), x.boundedContextId()))
                        .toList()));
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        repository.deleteAllById(selectedIds, ModuleEntity.class);
    }

    @Override
    public ModuleViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(repository.findById(id, ModuleEntity.class).orElseThrow());
    }

    @Override
    public ModuleViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(repository.findById(id, ModuleEntity.class).orElseThrow());
    }

    @Override
    public ModuleViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
