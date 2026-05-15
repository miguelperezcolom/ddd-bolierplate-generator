package io.mateu.mdd.specdrivengenerator.application.usecases.domainevent.save;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.DomainEventRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.domainevent.vo.DomainEventId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.domainevent.vo.DomainEventName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaveDomainEventUseCase {

    final DomainEventRepository repository;

    public void handle(SaveDomainEventCommand command) {
        var domainEvent = repository.findById(new DomainEventId(command.id())).orElseThrow();
        domainEvent.update(new DomainEventName(command.name()));
        repository.save(domainEvent);
    }

}
