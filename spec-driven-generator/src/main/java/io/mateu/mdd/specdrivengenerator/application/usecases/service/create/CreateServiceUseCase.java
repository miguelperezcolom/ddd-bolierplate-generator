package io.mateu.mdd.specdrivengenerator.application.usecases.service.create;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.ServiceRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.module.vo.ModuleId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.Service;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.vo.ServiceId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.vo.ServiceName;
import lombok.RequiredArgsConstructor;

import java.util.List;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class CreateServiceUseCase {

    final ServiceRepository repository;

    public void handle(CreateServiceCommand command) {
        var service = Service.of(
                new ServiceId(command.id()),
                new ServiceName(command.name()),
                command.moduleIds() != null ? command.moduleIds().stream().map(ModuleId::new).toList() : List.of());
        repository.save(service);
    }

}
