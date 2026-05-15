package io.mateu.mdd.specdrivengenerator.application.usecases.domainevent.create;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.DomainEventRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.domainevent.DomainEvent;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.domainevent.vo.DomainEventId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.domainevent.vo.DomainEventModelId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.domainevent.vo.DomainEventName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateDomainEventUseCase {

    final DomainEventRepository repository;

    public void handle(CreateDomainEventCommand command) {
        var domainEvent = DomainEvent.of(
                new DomainEventId(command.id()),
                new DomainEventName(command.name()),
                command.modelId() != null ? new DomainEventModelId(command.modelId()) : null);
        repository.save(domainEvent);
    }

}
