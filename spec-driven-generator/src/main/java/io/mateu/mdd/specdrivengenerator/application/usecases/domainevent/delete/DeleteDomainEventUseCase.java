package io.mateu.mdd.specdrivengenerator.application.usecases.domainevent.delete;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.DomainEventRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.domainevent.vo.DomainEventId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteDomainEventUseCase {

    final DomainEventRepository repository;

    public void handle(DeleteDomainEventCommand command) {
        repository.deleteAllById(command.ids().stream().map(DomainEventId::new).toList());
    }

}
