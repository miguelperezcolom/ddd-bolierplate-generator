package io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers;

import io.mateu.mdd.specdrivengenerator.application.out.query.ValueObjectQueryService;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.LabelSupplier;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ValueObjectIdLabelSupplier implements LabelSupplier {

    final ValueObjectQueryService queryService;

    @Override
    public String label(String fieldName, Object id, HttpRequest httpRequest) {
        return queryService.getLabel((String) id);
    }
}
