package io.mateu.modux.modeldrivengenerator.application.usecases.service.delete;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.ServiceRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.service.vo.ServiceId;
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
