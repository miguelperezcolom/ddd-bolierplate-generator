package io.mateu.modux.specdrivengenerator.application.usecases.uiadapter.create;

import io.mateu.modux.specdrivengenerator.application.out.repositories.UiAdapterRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.uiadapter.UiAdapter;
import io.mateu.modux.specdrivengenerator.domain.aggregates.uiadapter.UiMenuItem;
import io.mateu.modux.specdrivengenerator.domain.aggregates.uiadapter.vo.UiAdapterId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.uiadapter.vo.UiAdapterName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateUiAdapterUseCase {

    final UiAdapterRepository repository;

    public void handle(CreateUiAdapterCommand command) {
        var uiAdapter = UiAdapter.of(
                new UiAdapterId(command.id()),
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
