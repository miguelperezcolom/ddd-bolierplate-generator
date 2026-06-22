package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.queryservice;

import io.mateu.modux.modeldrivengenerator.application.out.query.QueryServiceQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.QueryServiceRow;
import io.mateu.modux.modeldrivengenerator.application.usecases.queryservice.delete.DeleteQueryServiceCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.queryservice.delete.DeleteQueryServiceUseCase;
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
public class QueryServiceCrudAdapter implements CrudAdapter<

        QueryServiceViewModel,
        QueryServiceViewModel,
        NoFilters,
        QueryServiceRow,
        String
        > {

    final QueryServiceViewModel viewModel;
    final DeleteQueryServiceUseCase deleteUseCase;
    final QueryServiceQueryService queryService;

    @Override
    public ListingData<QueryServiceRow> search(String searchText,
                                          NoFilters filters,
                                          Pageable pageable,
                                          HttpRequest httpRequest) {
        return queryService.findAll(searchText, filters, pageable);
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        deleteUseCase.handle(new DeleteQueryServiceCommand(selectedIds));
    }

    @Override
    public QueryServiceViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public QueryServiceViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public QueryServiceViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
