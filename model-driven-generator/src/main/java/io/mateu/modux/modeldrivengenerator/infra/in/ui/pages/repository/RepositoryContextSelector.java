package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.repository;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.home.ModuxHomeStore;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Option;
import io.mateu.uidl.data.Pageable;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.LookupOptionsSupplier;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Options for the app-level repository selector (see mateu's app-context pattern):
 * modux works on ONE repository at a time, so the active one is application context,
 * not a per-screen filter.
 */
@Service
@RequiredArgsConstructor
public class RepositoryContextSelector implements LookupOptionsSupplier {

    final ModuxHomeStore home;

    @Override
    public ListingData<Option> search(String fieldName, String searchText,
                                      Pageable pageable, HttpRequest httpRequest) {
        var needle = searchText == null ? "" : searchText.trim().toLowerCase();
        return ListingData.of(home.loadRepositories().stream()
                .filter(r -> needle.isEmpty()
                        || (r.name() != null && r.name().toLowerCase().contains(needle)))
                .map(r -> new Option(r.id(), r.name()))
                .toArray(Option[]::new));
    }
}
