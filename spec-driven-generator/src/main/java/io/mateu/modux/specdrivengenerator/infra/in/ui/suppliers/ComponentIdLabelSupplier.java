package io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers;

import io.mateu.modux.specdrivengenerator.application.out.query.ComponentQueryService;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.LabelSupplier;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ComponentIdLabelSupplier implements LabelSupplier {

    final ComponentQueryService queryService;

    @Override
    public String label(String fieldName, Object id, HttpRequest httpRequest) {
        return queryService.getLabel((String) id);
    }
}
