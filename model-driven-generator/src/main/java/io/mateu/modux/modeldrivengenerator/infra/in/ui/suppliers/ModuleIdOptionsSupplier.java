package io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Option;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.LookupOptionsSupplier;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ModuleIdOptionsSupplier implements LookupOptionsSupplier {

    final ModelStore repository;

    @Override
    public ListingData<Option> search(String fieldName, String searchText, Pageable pageable, HttpRequest httpRequest) {
        var all = repository.findAllOfType(ModuleEntity.class).stream()
                .filter(m -> searchText == null || searchText.isBlank()
                        || m.name().toLowerCase().contains(searchText.toLowerCase())
                        || m.id().toLowerCase().contains(searchText.toLowerCase()))
                .toList();
        return new ListingData<>(new Page<>(
                searchText,
                pageable.size(),
                pageable.page(),
                all.size(),
                all.stream().map(m -> new Option(m.id(), m.name())).toList()));
    }
}
