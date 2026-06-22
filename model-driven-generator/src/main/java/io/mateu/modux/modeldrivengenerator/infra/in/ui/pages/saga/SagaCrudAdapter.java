package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.saga;

import io.mateu.modux.modeldrivengenerator.application.out.query.SagaQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.SagaRow;
import io.mateu.modux.modeldrivengenerator.application.usecases.saga.delete.DeleteSagaCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.saga.delete.DeleteSagaUseCase;
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
public class SagaCrudAdapter implements CrudAdapter<

        SagaViewModel,
        SagaViewModel,
        NoFilters,
        SagaRow,
        String
        > {

    final SagaViewModel viewModel;
    final DeleteSagaUseCase deleteUseCase;
    final SagaQueryService queryService;

    @Override
    public ListingData<SagaRow> search(String searchText,
                                       NoFilters filters,
                                       Pageable pageable,
                                       HttpRequest httpRequest) {
        return queryService.findAll(searchText, filters, pageable);
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        deleteUseCase.handle(new DeleteSagaCommand(selectedIds));
    }

    @Override
    public SagaViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public SagaViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public SagaViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
