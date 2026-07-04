package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.process;

import io.mateu.modux.modeldrivengenerator.application.out.query.ProcessQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ProcessRow;
import io.mateu.modux.modeldrivengenerator.application.usecases.process.delete.DeleteProcessCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.process.delete.DeleteProcessUseCase;
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
public class ProcessCrudAdapter implements CrudAdapter<

        ProcessViewModel,
        ProcessViewModel,
        NoFilters,
        ProcessRow,
        String
        > {

    final ProcessViewModel viewModel;
    final DeleteProcessUseCase deleteUseCase;
    final ProcessQueryService queryService;

    @Override
    public ListingData<ProcessRow> search(String searchText,
                                          NoFilters filters,
                                          Pageable pageable,
                                          HttpRequest httpRequest) {
        return queryService.findAll(searchText, filters, pageable);
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        deleteUseCase.handle(new DeleteProcessCommand(selectedIds));
    }

    @Override
    public ProcessViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public ProcessViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public ProcessViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
