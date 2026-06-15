package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.enumdefinition;

import io.mateu.modux.specdrivengenerator.application.out.query.EnumDefinitionQueryService;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.EnumDefinitionRow;
import io.mateu.modux.specdrivengenerator.application.usecases.enumdefinition.delete.DeleteEnumDefinitionCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.enumdefinition.delete.DeleteEnumDefinitionUseCase;
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
public class EnumDefinitionCrudAdapter implements CrudAdapter<
        EnumDefinitionViewModel,
        EnumDefinitionViewModel,
        NoFilters,
        EnumDefinitionRow,
        String
        > {

    final EnumDefinitionViewModel viewModel;
    final DeleteEnumDefinitionUseCase deleteUseCase;
    final EnumDefinitionQueryService queryService;

    @Override
    public ListingData<EnumDefinitionRow> search(String searchText,
                                                 NoFilters filters,
                                                 Pageable pageable,
                                                 HttpRequest httpRequest) {
        return queryService.findAll(searchText, filters, pageable);
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        deleteUseCase.handle(new DeleteEnumDefinitionCommand(selectedIds));
    }

    @Override
    public EnumDefinitionViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public EnumDefinitionViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public EnumDefinitionViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
