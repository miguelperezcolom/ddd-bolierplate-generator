package io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers;

import io.mateu.modux.modeldrivengenerator.infra.in.rest.EditorProjectSupport;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.LookupLabelSupplier;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ExternalSystemIdLabelSupplier implements LookupLabelSupplier {

    final EditorProjectSupport projects;

    @Override
    public String label(String fieldName, Object id, HttpRequest httpRequest) {
        return projects.externalSystems().stream()
                .filter(x -> x.id().equals(id))
                .map(io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ExternalSystemEntity::name)
                .findFirst()
                .orElse((String) id);
    }
}
