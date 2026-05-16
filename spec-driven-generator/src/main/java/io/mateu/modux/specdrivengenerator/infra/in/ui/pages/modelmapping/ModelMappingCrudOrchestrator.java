package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.modelmapping;

import io.mateu.core.infra.declarative.CrudOrchestrator;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ModelMappingRow;
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
@Title("Model Mappings")
@Slf4j
public class ModelMappingCrudOrchestrator extends CrudOrchestrator<
        ModelMappingViewModel,
        ModelMappingViewModel,
        ModelMappingViewModel,
        NoFilters,
        ModelMappingRow,
        String
        > {

    final ModelMappingCrudAdapter adapter;

    @Override
    public CrudAdapter<ModelMappingViewModel, ModelMappingViewModel, ModelMappingViewModel,
            NoFilters, ModelMappingRow, String> adapter() {
        return adapter;
    }

    @Override
    public String toId(String s) {
        return s;
    }
}
