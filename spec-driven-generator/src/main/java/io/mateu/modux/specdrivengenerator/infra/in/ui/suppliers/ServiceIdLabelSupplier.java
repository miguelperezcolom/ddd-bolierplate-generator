package io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers;

import io.mateu.modux.specdrivengenerator.application.out.query.ServiceQueryService;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.LabelSupplier;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ServiceIdLabelSupplier implements LabelSupplier {

    final ServiceQueryService queryService;

    @Override
    public String label(String fieldName, Object id, HttpRequest httpRequest) {
        return queryService.getLabel((String) id);
    }
}
