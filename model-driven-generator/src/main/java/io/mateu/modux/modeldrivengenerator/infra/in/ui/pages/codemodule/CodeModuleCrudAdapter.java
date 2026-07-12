package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.codemodule;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CodeModuleEntity;
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
public class CodeModuleCrudAdapter implements CrudAdapter<
        CodeModuleViewModel,
        CodeModuleViewModel,
        NoFilters,
        CodeModuleRow,
        String
        > {

    final CodeModuleViewModel viewModel;
    final ModelStore repository;

    @Override
    public ListingData<CodeModuleRow> search(String searchText,
                                         NoFilters filters,
                                         Pageable pageable,
                                         HttpRequest httpRequest) {
        var data = repository.findAll(searchText, filters, pageable, CodeModuleEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(x -> new CodeModuleRow(x.id(), x.name(), x.moduleId()))
                        .toList()));
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        repository.deleteAllById(selectedIds, CodeModuleEntity.class);
    }

    @Override
    public CodeModuleViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(repository.findById(id, CodeModuleEntity.class).orElseThrow());
    }

    @Override
    public CodeModuleViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(repository.findById(id, CodeModuleEntity.class).orElseThrow());
    }

    @Override
    public CodeModuleViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
