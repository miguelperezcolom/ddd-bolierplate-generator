package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.readmodel;

import io.mateu.modux.specdrivengenerator.application.out.query.ReadModelQueryService;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ReadModelRow;
import io.mateu.modux.specdrivengenerator.application.usecases.readmodel.delete.DeleteReadModelCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.readmodel.delete.DeleteReadModelUseCase;
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
public class ReadModelCrudAdapter implements CrudAdapter<
        ReadModelViewModel,
        ReadModelViewModel,
        ReadModelViewModel,
        NoFilters,
        ReadModelRow,
        String
        > {

    final ReadModelViewModel viewModel;
    final DeleteReadModelUseCase deleteUseCase;
    final ReadModelQueryService queryService;

    @Override
    public ListingData<ReadModelRow> search(String searchText,
                                            NoFilters filters,
                                            Pageable pageable,
                                            HttpRequest httpRequest) {
        return queryService.findAll(searchText, filters, pageable);
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        deleteUseCase.handle(new DeleteReadModelCommand(selectedIds));
    }

    @Override
    public ReadModelViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public ReadModelViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public ReadModelViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
