package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.domainevent;

import io.mateu.modux.modeldrivengenerator.application.out.query.DomainEventQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.DomainEventRow;
import io.mateu.modux.modeldrivengenerator.application.usecases.domainevent.delete.DeleteDomainEventCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.domainevent.delete.DeleteDomainEventUseCase;
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
public class DomainEventCrudAdapter implements CrudAdapter<

        DomainEventViewModel,
        DomainEventViewModel,
        NoFilters,
        DomainEventRow,
        String
        > {

    final DomainEventViewModel viewModel;
    final DeleteDomainEventUseCase deleteUseCase;
    final DomainEventQueryService queryService;

    @Override
    public ListingData<DomainEventRow> search(String searchText,
                                               NoFilters filters,
                                               Pageable pageable,
                                               HttpRequest httpRequest) {
        return queryService.findAll(searchText, filters, pageable);
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        deleteUseCase.handle(new DeleteDomainEventCommand(selectedIds));
    }

    @Override
    public DomainEventViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public DomainEventViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public DomainEventViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
