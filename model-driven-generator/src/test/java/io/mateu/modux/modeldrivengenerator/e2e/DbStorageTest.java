package io.mateu.modux.modeldrivengenerator.e2e;

import io.mateu.modux.modeldrivengenerator.infra.out.db.JdbcModelDatabase;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.BoundedContextEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * The DATABASE repository backend, end to end over embedded H2: the catalog persists as rows and
 * survives a reopen.
 *
 * <p>This used to also assert full parity with git for solutions — workspaces standing in for
 * branches, feeding the same semantic three-way merge. Solutions are branches now
 * ({@code docs/design/ide-plugin.md} §4.8), so there is no such thing to be at parity with.
 */
@SpringBootTest
class DbStorageTest {

    @Autowired CommonFileRepository repository;

    private static BoundedContextEntity boundedContext(String id, String name) {
        return new BoundedContextEntity(id, name, null,
                List.of(), List.of(), List.of(), List.of(), List.of(), List.of(), List.of(),
                List.of(), List.of(), List.of(), List.of(),
                null, null, false, null,
                List.of(), List.of(), List.of(), List.of(),
                null, List.of(), List.of(), List.of(), null, null, null, null);
    }

    @Test
    void theCatalogPersistsAsRowsAndSurvivesAReopen() {
        var db = new JdbcModelDatabase("jdbc:h2:mem:modux-db-test;DB_CLOSE_DELAY=-1", "", "");
        repository.openDatabase(db);

        repository.save(boundedContext("mod-uno", "Uno"));

        var reopened = new JdbcModelDatabase("jdbc:h2:mem:modux-db-test;DB_CLOSE_DELAY=-1", "", "");
        repository.openDatabase(reopened);
        assertThat(repository.findById("mod-uno", BoundedContextEntity.class)).isPresent();
    }
}
