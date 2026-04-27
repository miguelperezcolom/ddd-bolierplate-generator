package io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers;

import io.mateu.mdd.specdrivengenerator.application.out.query.ProjectQueryService;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.LabelSupplier;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjectIdLabelSupplier implements LabelSupplier {

    final ProjectQueryService queryService;

    @Override
    public String label(String fieldName, Object id, HttpRequest httpRequest) {
        return queryService.getLabel((String) id);
    }
}
