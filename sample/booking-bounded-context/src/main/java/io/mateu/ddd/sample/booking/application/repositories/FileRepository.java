package io.mateu.ddd.sample.booking.application.repositories;

import io.mateu.ddd.sample.booking.domain.aggregates.file.File;
import io.mateu.ddd.sample.booking.domain.aggregates.file.valueobjects.FileId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Mono;

import java.util.List;

public interface FileRepository {

    Mono<File> findById(FileId id);

    Mono<File> save(File user);

    Mono<Page<File>> findAll(String searchText, Pageable pageable);

    Mono<Void> deleteAllById(List<FileId> ids);

}
