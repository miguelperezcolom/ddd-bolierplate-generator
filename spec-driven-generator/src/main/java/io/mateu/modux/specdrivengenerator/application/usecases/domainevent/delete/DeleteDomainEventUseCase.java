package io.mateu.modux.specdrivengenerator.application.usecases.domainevent.delete;

import io.mateu.modux.specdrivengenerator.application.out.repositories.DomainEventRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.domainevent.vo.DomainEventId;
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
