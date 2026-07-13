package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.boundedcontext;

import io.mateu.modux.modeldrivengenerator.application.out.query.BoundedContextQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.BoundedContextRow;
import io.mateu.modux.modeldrivengenerator.application.usecases.boundedcontext.delete.DeleteBoundedContextCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.boundedcontext.delete.DeleteBoundedContextUseCase;
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
public class BoundedContextCrudAdapter implements CrudAdapter<

        BoundedContextViewModel,
        BoundedContextViewModel,
        NoFilters,
        BoundedContextRow,
        String
        > {

    final BoundedContextViewModel viewModel;
    final DeleteBoundedContextUseCase deleteUseCase;
    final BoundedContextQueryService queryService;

    @Override
    public ListingData<BoundedContextRow> search(String searchText,
                                         NoFilters filters,
                                         Pageable pageable,
                                         HttpRequest httpRequest) {
        return queryService.findAll(searchText, filters, pageable);
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        deleteUseCase.handle(new DeleteBoundedContextCommand(selectedIds));
    }

    @Override
    public BoundedContextViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService
                .getById(id)
                .orElseThrow(() -> new RuntimeException("Not found: " + id)));
    }

    @Override
    public BoundedContextViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService
                .getById(id)
                .orElseThrow(() -> new RuntimeException("Not found: " + id)));
    }

    @Override
    public BoundedContextViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
