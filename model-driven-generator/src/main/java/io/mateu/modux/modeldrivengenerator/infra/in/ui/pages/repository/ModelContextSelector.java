package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.repository;

import io.mateu.modux.modeldrivengenerator.infra.out.git.SolutionGitService;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Option;
import io.mateu.uidl.data.Pageable;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.LookupOptionsSupplier;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

/**
 * Options for the app-level MODEL selector: the system (as-is, branch main) plus every
 * solution (to-be, a solution/* branch) of the OPEN repository's store. Git underneath
 * is an implementation detail — the UI only ever speaks of system and solutions.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ModelContextSelector implements LookupOptionsSupplier {

    final SolutionGitService git;

    @Override
    public ListingData<Option> search(String fieldName, String searchText,
                                      Pageable pageable, HttpRequest httpRequest) {
        var needle = searchText == null ? "" : searchText.trim().toLowerCase();
        var options = new ArrayList<Option>();
        options.add(new Option(SolutionGitService.SYSTEM_BRANCH, "Sistema (as-is)"));
        try {
            for (var branch : git.solutionBranches()) {
                var name = branch.substring(SolutionGitService.SOLUTION_PREFIX.length());
                options.add(new Option(branch, "Solución: " + name));
            }
        } catch (RuntimeException e) {
            log.warn("soluciones no legibles: {}", e.getMessage());
        }
        return ListingData.of(options.stream()
                .filter(o -> needle.isEmpty() || o.label().toLowerCase().contains(needle))
                .toArray(Option[]::new));
    }
}
