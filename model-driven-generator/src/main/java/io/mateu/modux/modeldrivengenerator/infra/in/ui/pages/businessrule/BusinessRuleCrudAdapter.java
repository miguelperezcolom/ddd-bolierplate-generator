package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.businessrule;

import io.mateu.modux.modeldrivengenerator.application.out.query.BusinessRuleQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.BusinessRuleRow;
import io.mateu.modux.modeldrivengenerator.application.usecases.businessrule.delete.DeleteBusinessRuleCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.businessrule.delete.DeleteBusinessRuleUseCase;
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
public class BusinessRuleCrudAdapter implements CrudAdapter<

        BusinessRuleViewModel,
        BusinessRuleViewModel,
        NoFilters,
        BusinessRuleRow,
        String
        > {

    final BusinessRuleViewModel viewModel;
    final DeleteBusinessRuleUseCase deleteUseCase;
    final BusinessRuleQueryService queryService;

    @Override
    public ListingData<BusinessRuleRow> search(String searchText,
                                               NoFilters filters,
                                               Pageable pageable,
                                               HttpRequest httpRequest) {
        return queryService.findAll(searchText, filters, pageable);
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        deleteUseCase.handle(new DeleteBusinessRuleCommand(selectedIds));
    }

    @Override
    public BusinessRuleViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public BusinessRuleViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public BusinessRuleViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
