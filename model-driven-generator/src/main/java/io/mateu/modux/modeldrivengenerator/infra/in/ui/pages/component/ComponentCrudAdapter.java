package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.component;

import io.mateu.modux.modeldrivengenerator.application.out.query.ComponentQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ComponentRow;
import io.mateu.modux.modeldrivengenerator.application.usecases.component.delete.DeleteComponentCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.component.delete.DeleteComponentUseCase;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.NoFilters;
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
public class ComponentCrudAdapter implements CrudAdapter<

        ComponentViewModel,
        ComponentViewModel,
        NoFilters,
        ComponentRow,
        String
        > {

    final ComponentViewModel viewModel;
    final DeleteComponentUseCase deleteUseCase;
    final ComponentQueryService queryService;

    @Override
    public ListingData<ComponentRow> search(String searchText,
                                            NoFilters filters,
                                            Pageable pageable,
                                            HttpRequest httpRequest) {
        return queryService.findAll(searchText, filters, pageable);
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        deleteUseCase.handle(new DeleteComponentCommand(selectedIds));
    }

    @Override
    public ComponentViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public ComponentViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public ComponentViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
