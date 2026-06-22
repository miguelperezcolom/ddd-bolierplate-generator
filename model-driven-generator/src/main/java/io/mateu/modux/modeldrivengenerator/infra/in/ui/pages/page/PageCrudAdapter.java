package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.page;

import io.mateu.modux.modeldrivengenerator.application.out.query.PageQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.PageRow;
import io.mateu.modux.modeldrivengenerator.application.usecases.page.delete.DeletePageCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.page.delete.DeletePageUseCase;
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
public class PageCrudAdapter implements CrudAdapter<

        PageViewModel,
        PageViewModel,
        NoFilters,
        PageRow,
        String
        > {

    final PageViewModel viewModel;
    final DeletePageUseCase deleteUseCase;
    final PageQueryService queryService;

    @Override
    public ListingData<PageRow> search(String searchText,
                                       NoFilters filters,
                                       Pageable pageable,
                                       HttpRequest httpRequest) {
        return queryService.findAll(searchText, filters, pageable);
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        deleteUseCase.handle(new DeletePageCommand(selectedIds));
    }

    @Override
    public PageViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public PageViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public PageViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
