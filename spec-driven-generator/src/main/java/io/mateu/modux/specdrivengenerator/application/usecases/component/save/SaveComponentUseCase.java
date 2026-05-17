package io.mateu.modux.specdrivengenerator.application.usecases.component.save;

import io.mateu.modux.specdrivengenerator.application.out.repositories.ComponentRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.component.vo.ComponentId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.component.vo.ComponentName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaveComponentUseCase {

    final ComponentRepository repository;

    public void handle(SaveComponentCommand command) {
        var component = repository.findById(new ComponentId(command.id())).orElseThrow();
        component.update(
                new ComponentName(command.name()),
                command.dataSourceType(),
                command.queryServiceId(),
                command.gatewayId(),
                command.presentationType());
        repository.save(component);
    }
}
