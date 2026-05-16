package io.mateu.modux.specdrivengenerator.application.usecases.service.delete;

import io.mateu.modux.specdrivengenerator.application.out.repositories.ServiceRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.service.vo.ServiceId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteServiceUseCase {

    final ServiceRepository repository;

    public void handle(DeleteServiceCommand command) {
        repository.deleteAllById(command.ids().stream().map(ServiceId::new).toList());
    }

}
