package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.businessrule;

import io.mateu.core.infra.declarative.CrudOrchestrator;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.BusinessRuleRow;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.data.NoFilters;
import io.mateu.uidl.interfaces.CrudAdapter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Scope("prototype")
@Title("Business Rules")
@Slf4j
public class BusinessRuleCrudOrchestrator extends CrudOrchestrator<
        BusinessRuleViewModel,
        BusinessRuleViewModel,
        BusinessRuleViewModel,
        NoFilters,
        BusinessRuleRow,
        String
        > {

    final BusinessRuleCrudAdapter adapter;

    @Override
    public CrudAdapter<BusinessRuleViewModel, BusinessRuleViewModel, BusinessRuleViewModel,
            NoFilters, BusinessRuleRow, String> adapter() {
        return adapter;
    }

    @Override
    public String toId(String s) {
        return s;
    }
}
