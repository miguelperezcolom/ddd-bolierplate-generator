package io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers;

import io.mateu.modux.specdrivengenerator.application.out.query.EntityQueryService;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.LabelSupplier;
import io.mateu.uidl.interfaces.LookupLabelSupplier;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EntityIdLabelSupplier implements LookupLabelSupplier {

    final EntityQueryService queryService;

    @Override
    public String label(String fieldName, Object id, HttpRequest httpRequest) {
        return queryService.getLabel((String) id);
    }
}
