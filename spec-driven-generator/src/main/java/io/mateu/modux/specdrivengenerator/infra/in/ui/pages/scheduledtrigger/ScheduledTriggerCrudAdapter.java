package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.scheduledtrigger;

import io.mateu.modux.specdrivengenerator.application.out.query.ScheduledTriggerQueryService;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ScheduledTriggerRow;
import io.mateu.modux.specdrivengenerator.application.usecases.scheduledtrigger.delete.DeleteScheduledTriggerCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.scheduledtrigger.delete.DeleteScheduledTriggerUseCase;
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
public class ScheduledTriggerCrudAdapter implements CrudAdapter<
        ScheduledTriggerViewModel,
        ScheduledTriggerViewModel,
        ScheduledTriggerViewModel,
        NoFilters,
        ScheduledTriggerRow,
        String
        > {

    final ScheduledTriggerViewModel viewModel;
    final DeleteScheduledTriggerUseCase deleteUseCase;
    final ScheduledTriggerQueryService queryService;

    @Override
    public ListingData<ScheduledTriggerRow> search(String searchText,
                                                   NoFilters filters,
                                                   Pageable pageable,
                                                   HttpRequest httpRequest) {
        return queryService.findAll(searchText, filters, pageable);
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        deleteUseCase.handle(new DeleteScheduledTriggerCommand(selectedIds));
    }

    @Override
    public ScheduledTriggerViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public ScheduledTriggerViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public ScheduledTriggerViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
