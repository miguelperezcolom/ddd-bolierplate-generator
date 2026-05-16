package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.modelmapping;

import io.mateu.modux.specdrivengenerator.application.out.query.ModelMappingQueryService;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ModelMappingRow;
import io.mateu.modux.specdrivengenerator.application.usecases.modelmapping.delete.DeleteModelMappingCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.modelmapping.delete.DeleteModelMappingUseCase;
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
public class ModelMappingCrudAdapter implements CrudAdapter<
        ModelMappingViewModel,
        ModelMappingViewModel,
        ModelMappingViewModel,
        NoFilters,
        ModelMappingRow,
        String
        > {

    final ModelMappingViewModel viewModel;
    final DeleteModelMappingUseCase deleteUseCase;
    final ModelMappingQueryService queryService;

    @Override
    public ListingData<ModelMappingRow> search(String searchText,
                                               NoFilters filters,
                                               Pageable pageable,
                                               HttpRequest httpRequest) {
        return queryService.findAll(searchText, filters, pageable);
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        deleteUseCase.handle(new DeleteModelMappingCommand(selectedIds));
    }

    @Override
    public ModelMappingViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public ModelMappingViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public ModelMappingViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
