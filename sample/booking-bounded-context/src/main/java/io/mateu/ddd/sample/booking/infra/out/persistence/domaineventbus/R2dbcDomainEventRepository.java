package io.mateu.ddd.sample.booking.infra.out.persistence.domaineventbus;

import io.mateu.ddd.domain.DomainEvent;
import io.mateu.ddd.sample.booking.application.ports.DomainEventBus;
import io.mateu.ddd.sample.booking.domain.services.SerializationService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.Comparator;
import java.util.List;

import static io.mateu.ddd.sample.booking.domain.services.SerializationService.toJson;

@Service
@RequiredArgsConstructor
public class R2dbcDomainEventRepository implements DomainEventBus {

    private final DomainEventEntityRepository repo;

    //@Override
    public Mono<DomainEvent> save(DomainEvent domainEvent) {
        return  repo.findById(domainEvent.id())
                        .map(entity -> entity
                                .withJson(toJson(domainEvent)))
                .defaultIfEmpty(new DomainEventEntity(
                        domainEvent.id(),
                        toJson(domainEvent)
                ))
                .flatMap(repo::save)
                .map(this::mapToProject)
                ;
    }

    //@Override
    public Mono<Page<DomainEvent>> findAll(String searchText, Pageable pageable) {
        return  repo.findAll().filter(artifact -> matches(searchText, artifact))
                .distinct()
                .collectList()
                .map(artifacts -> {
                    var filtered = artifacts.stream().sorted(Comparator.comparing(DomainEventEntity::getJson))
                            .skip(pageable.getOffset())
                            .limit(pageable.getPageSize())
                            .map(this::mapToProject)
                            .toList();
                    return new PageImpl<>(filtered, pageable, artifacts.size());
                });
    }

    //@Override
    public Mono<DomainEvent> findById(String id) {
        return  repo.findById(id)
                .map(this::mapToProject);
    }

    //@Override
    public Mono<Void> deleteAllById(List<String> ids) {
        return repo.deleteAllById(ids);
    }

    @SneakyThrows
    private DomainEvent mapToProject(DomainEventEntity entity) {
        return SerializationService.fromJson(entity.json, DomainEvent.class);
    }

    private boolean matches(String searchText, DomainEventEntity p) {
        if (searchText == null || searchText.isEmpty()) {
            return true;
        }
        if (searchText == null || searchText.isEmpty()) {
            return true;
        }
        boolean globalMatches = true;
        for (String token : searchText.split(" ")) {
            var pattern = token.toLowerCase();
            boolean matches = false;
            matches |= matches(pattern, p.json);
            globalMatches &= matches;
        }
        return globalMatches;
    }

    private boolean matches(String pattern, String value) {
        if (pattern == null || pattern.isEmpty()) {
            return true;
        }
        if (value == null || value.isEmpty()) {
            return false;
        }
        return value.toLowerCase().contains(pattern);
    }

    @Override
    public void sendAll(List<DomainEvent> events) {

    }
}
