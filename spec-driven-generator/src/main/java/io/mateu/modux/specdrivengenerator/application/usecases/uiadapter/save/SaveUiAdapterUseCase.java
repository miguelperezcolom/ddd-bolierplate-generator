package io.mateu.modux.specdrivengenerator.application.usecases.uiadapter.save;

import io.mateu.modux.specdrivengenerator.application.out.repositories.UiAdapterRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.uiadapter.UiMenuItem;
import io.mateu.modux.specdrivengenerator.domain.aggregates.uiadapter.vo.UiAdapterId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.uiadapter.vo.UiAdapterName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaveUiAdapterUseCase {

    final UiAdapterRepository repository;

    public void handle(SaveUiAdapterCommand command) {
        var uiAdapter = repository.findById(new UiAdapterId(command.id())).orElseThrow();
        uiAdapter.update(
                new UiAdapterName(command.name()),
                command.serviceId(),
                command.title(),
                command.path(),
                command.appVariant(),
                command.menuItems() == null ? java.util.List.of() :
                        command.menuItems().stream()
                                .map(m -> new UiMenuItem(m.label(), m.icon(), m.description(), m.route()))
                                .toList());
        repository.save(uiAdapter);
    }
}
