package io.mateu.mdd.specdrivengenerator.application.usecases.service.save;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.ServiceRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.module.vo.ModuleId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.vo.ServiceId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.vo.ServiceName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaveServiceUseCase {

    final ServiceRepository repository;

    public void handle(SaveServiceCommand command) {
        var service = repository.findById(new ServiceId(command.id())).orElseThrow();
        service.update(new ServiceName(command.name()),
                command.moduleIds().stream().map(ModuleId::new).toList());
        repository.save(service);
    }

}
