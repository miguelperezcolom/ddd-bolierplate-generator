package io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CustomCodeEntity;
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
public class CustomCodeIdOptionsSupplier implements LookupOptionsSupplier {

    final ModelStore repository;

    @Override
    public ListingData<Option> search(String fieldName, String searchText, Pageable pageable, HttpRequest httpRequest) {
        var all = repository.findAllOfType(CustomCodeEntity.class).stream()
                .filter(x -> searchText == null || searchText.isBlank()
                        || x.name().toLowerCase().contains(searchText.toLowerCase()))
                .toList();
        return new ListingData<>(new Page<>(
                searchText, all.size(), 0, all.size(),
                all.stream().map(x -> new Option(x.id(), x.name())).toList()));
    }
}
