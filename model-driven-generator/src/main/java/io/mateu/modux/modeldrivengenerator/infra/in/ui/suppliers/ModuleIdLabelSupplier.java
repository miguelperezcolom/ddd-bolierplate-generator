package io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.LookupLabelSupplier;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ModuleIdLabelSupplier implements LookupLabelSupplier {

    final ModelStore repository;

    @Override
    public String label(String fieldName, Object id, HttpRequest httpRequest) {
        return repository.findById((String) id, ModuleEntity.class)
                .map(ModuleEntity::name)
                .orElse((String) id);
    }
}
