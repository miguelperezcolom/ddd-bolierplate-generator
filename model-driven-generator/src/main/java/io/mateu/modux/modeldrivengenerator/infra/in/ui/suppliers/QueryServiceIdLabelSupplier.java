package io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers;

import io.mateu.modux.modeldrivengenerator.application.out.query.QueryServiceQueryService;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.LookupLabelSupplier;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QueryServiceIdLabelSupplier implements LookupLabelSupplier {

    final QueryServiceQueryService queryService;

    @Override
    public String label(String fieldName, Object id, HttpRequest httpRequest) {
        return queryService.getLabel((String) id);
    }
}
