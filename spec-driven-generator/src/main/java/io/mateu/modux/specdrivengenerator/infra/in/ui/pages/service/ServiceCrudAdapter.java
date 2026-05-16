package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.service;

import io.mateu.modux.specdrivengenerator.application.out.query.ServiceQueryService;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ServiceRow;
import io.mateu.modux.specdrivengenerator.application.usecases.service.delete.DeleteServiceCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.service.delete.DeleteServiceUseCase;
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
public class ServiceCrudAdapter implements CrudAdapter<
        ServiceViewModel,
        ServiceViewModel,
        ServiceViewModel,
        NoFilters,
        ServiceRow,
        String
        > {

    final ServiceViewModel viewModel;
    final DeleteServiceUseCase deleteUseCase;
    final ServiceQueryService queryService;

    @Override
    public ListingData<ServiceRow> search(String searchText,
                                          NoFilters filters,
                                          Pageable pageable,
                                          HttpRequest httpRequest) {
        return queryService.findAll(searchText, filters, pageable);
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        deleteUseCase.handle(new DeleteServiceCommand(selectedIds));
    }

    @Override
    public ServiceViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public ServiceViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public ServiceViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
