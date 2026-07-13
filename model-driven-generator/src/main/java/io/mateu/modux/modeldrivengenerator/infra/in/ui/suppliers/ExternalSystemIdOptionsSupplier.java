package io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers;

import io.mateu.modux.modeldrivengenerator.infra.in.rest.EditorProjectSupport;
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
public class ExternalSystemIdOptionsSupplier implements LookupOptionsSupplier {

    final EditorProjectSupport projects;

    @Override
    public ListingData<Option> search(String fieldName, String searchText, Pageable pageable, HttpRequest httpRequest) {
        var all = projects.owningProject().externalSystems().stream()
                .filter(x -> searchText == null || searchText.isBlank()
                        || x.name().toLowerCase().contains(searchText.toLowerCase())
                        || x.id().toLowerCase().contains(searchText.toLowerCase()))
                .toList();
        return new ListingData<>(new Page<>(
                searchText,
                pageable.size(),
                pageable.page(),
                all.size(),
                all.stream().map(x -> new Option(x.id(), x.name())).toList()));
    }
}
