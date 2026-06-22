package io.mateu.modux.modeldrivengenerator.application.usecases.component.create;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.ComponentRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.component.Component;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.component.vo.ComponentId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.component.vo.ComponentName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateComponentUseCase {

    final ComponentRepository repository;

    public void handle(CreateComponentCommand command) {
        var component = Component.of(
                new ComponentId(command.id()),
                new ComponentName(command.name()),
                command.dataSourceType(),
                command.gatewayId(),
                command.presentationType(),
                command.queryServiceId());
        repository.save(component);
    }
}
