package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.integrationevent;

import io.mateu.modux.modeldrivengenerator.application.out.query.IntegrationEventQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.IntegrationEventRow;
import io.mateu.modux.modeldrivengenerator.application.usecases.integrationevent.delete.DeleteIntegrationEventCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.integrationevent.delete.DeleteIntegrationEventUseCase;
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
public class IntegrationEventCrudAdapter implements CrudAdapter<

        IntegrationEventViewModel,
        IntegrationEventViewModel,
        NoFilters,
        IntegrationEventRow,
        String
        > {

    final IntegrationEventViewModel viewModel;
    final DeleteIntegrationEventUseCase deleteUseCase;
    final IntegrationEventQueryService queryService;

    @Override
    public ListingData<IntegrationEventRow> search(String searchText,
                                          NoFilters filters,
                                          Pageable pageable,
                                          HttpRequest httpRequest) {
        return queryService.findAll(searchText, filters, pageable);
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        deleteUseCase.handle(new DeleteIntegrationEventCommand(selectedIds));
    }

    @Override
    public IntegrationEventViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public IntegrationEventViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public IntegrationEventViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
