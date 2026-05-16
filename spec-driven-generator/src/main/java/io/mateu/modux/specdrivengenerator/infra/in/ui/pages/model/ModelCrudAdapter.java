package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.model;

import io.mateu.modux.specdrivengenerator.application.out.query.ModelQueryService;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ModelRow;
import io.mateu.modux.specdrivengenerator.application.usecases.model.delete.DeleteModelCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.model.delete.DeleteModelUseCase;
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
public class ModelCrudAdapter implements CrudAdapter<
        ModelViewModel,
        ModelViewModel,
        ModelViewModel,
        NoFilters,
        ModelRow,
        String
        > {

    final ModelViewModel viewModel;
    final DeleteModelUseCase deleteUseCase;
    final ModelQueryService queryService;

    @Override
    public ListingData<ModelRow> search(String searchText,
                                        NoFilters filters,
                                        Pageable pageable,
                                        HttpRequest httpRequest) {
        return queryService.findAll(searchText, filters, pageable);
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        deleteUseCase.handle(new DeleteModelCommand(selectedIds));
    }

    @Override
    public ModelViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public ModelViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public ModelViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
