package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.gateway;

import io.mateu.mdd.specdrivengenerator.application.out.query.GatewayQueryService;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.GatewayRow;
import io.mateu.mdd.specdrivengenerator.application.usecases.gateway.delete.DeleteGatewayCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.gateway.delete.DeleteGatewayUseCase;
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
public class GatewayCrudAdapter implements CrudAdapter<
        GatewayViewModel,
        GatewayViewModel,
        GatewayViewModel,
        NoFilters,
        GatewayRow,
        String
        > {

    final GatewayViewModel viewModel;
    final DeleteGatewayUseCase deleteUseCase;
    final GatewayQueryService queryService;

    @Override
    public ListingData<GatewayRow> search(String searchText,
                                          NoFilters filters,
                                          Pageable pageable,
                                          HttpRequest httpRequest) {
        return queryService.findAll(searchText, filters, pageable);
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        deleteUseCase.handle(new DeleteGatewayCommand(selectedIds));
    }

    @Override
    public GatewayViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public GatewayViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public GatewayViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
