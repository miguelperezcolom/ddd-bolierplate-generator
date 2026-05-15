package io.mateu.mdd.specdrivengenerator.application.usecases.service.create;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.ServiceRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.Service;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.vo.ServiceId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.vo.ServiceName;
import lombok.RequiredArgsConstructor;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class CreateServiceUseCase {

    final ServiceRepository repository;

    public void handle(CreateServiceCommand command) {
        var service = io.mateu.mdd.specdrivengenerator.domain.aggregates.service.Service.of(
                new ServiceId(command.id()),
                new ServiceName(command.name()));
        repository.save(service);
    }

}
