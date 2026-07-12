package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.buttongroup;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ButtonGroupEntity;
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
public class ButtonGroupCrudAdapter implements CrudAdapter<
        ButtonGroupViewModel,
        ButtonGroupViewModel,
        NoFilters,
        ButtonGroupRow,
        String
        > {

    final ButtonGroupViewModel viewModel;
    final ModelStore repository;

    @Override
    public ListingData<ButtonGroupRow> search(String searchText,
                                         NoFilters filters,
                                         Pageable pageable,
                                         HttpRequest httpRequest) {
        var data = repository.findAll(searchText, filters, pageable, ButtonGroupEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(x -> new ButtonGroupRow(x.id(), x.name(), x.buttons().size()))
                        .toList()));
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        repository.deleteAllById(selectedIds, ButtonGroupEntity.class);
    }

    @Override
    public ButtonGroupViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(repository.findById(id, ButtonGroupEntity.class).orElseThrow());
    }

    @Override
    public ButtonGroupViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(repository.findById(id, ButtonGroupEntity.class).orElseThrow());
    }

    @Override
    public ButtonGroupViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
