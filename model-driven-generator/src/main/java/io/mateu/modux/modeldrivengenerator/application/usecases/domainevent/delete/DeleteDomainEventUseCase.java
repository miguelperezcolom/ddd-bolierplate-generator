package io.mateu.modux.modeldrivengenerator.application.usecases.domainevent.delete;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.DomainEventRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.domainevent.vo.DomainEventId;
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
