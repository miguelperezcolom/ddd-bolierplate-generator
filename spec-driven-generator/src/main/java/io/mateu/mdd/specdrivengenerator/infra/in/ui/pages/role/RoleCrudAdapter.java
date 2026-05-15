package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.role;

import io.mateu.mdd.specdrivengenerator.application.out.query.RoleQueryService;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.RoleRow;
import io.mateu.mdd.specdrivengenerator.application.usecases.role.delete.DeleteRoleCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.role.delete.DeleteRoleUseCase;
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
public class RoleCrudAdapter implements CrudAdapter<
        RoleViewModel,
        RoleViewModel,
        RoleViewModel,
        NoFilters,
        RoleRow,
        String
        > {

    final RoleViewModel viewModel;
    final DeleteRoleUseCase deleteUseCase;
    final RoleQueryService queryService;

    @Override
    public ListingData<RoleRow> search(String searchText,
                                       NoFilters filters,
                                       Pageable pageable,
                                       HttpRequest httpRequest) {
        return queryService.findAll(searchText, filters, pageable);
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        deleteUseCase.handle(new DeleteRoleCommand(selectedIds));
    }

    @Override
    public RoleViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public RoleViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public RoleViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
