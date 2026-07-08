package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.repository;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Option;
import io.mateu.uidl.data.Pageable;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.LookupOptionsSupplier;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/** Options for the app-level project selector: the projects of the OPEN repository's store. */
@Service
@RequiredArgsConstructor
public class ProjectContextSelector implements LookupOptionsSupplier {

    final CommonFileRepository repository;

    @Override
    public ListingData<Option> search(String fieldName, String searchText,
                                      Pageable pageable, HttpRequest httpRequest) {
        var needle = searchText == null ? "" : searchText.trim().toLowerCase();
        return ListingData.of(repository.findAllOfType(ProjectEntity.class).stream()
                .filter(p -> needle.isEmpty()
                        || (p.name() != null && p.name().toLowerCase().contains(needle)))
                .map(p -> new Option(p.id(), p.name() != null ? p.name() : p.id()))
                .toArray(Option[]::new));
    }
}
