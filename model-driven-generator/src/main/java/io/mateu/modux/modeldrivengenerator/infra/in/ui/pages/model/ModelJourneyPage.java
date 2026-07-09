package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.model;

import io.mateu.modux.modeldrivengenerator.application.usecases.model.journey.ModelJourneyRenderer;
import io.mateu.modux.modeldrivengenerator.application.usecases.model.lint.ModelSnapshot;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.data.Markdown;
import io.mateu.uidl.fluent.Component;
import io.mateu.uidl.fluent.PageView;
import io.mateu.uidl.interfaces.ComponentTreeSupplier;
import io.mateu.uidl.interfaces.HttpRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * The model-centric lens of the system: for every model, the stations it passes through — where it
 * persists, which commands/queries/screens/events carry it, and which mappings connect it to the
 * next model. The system IS models flowing; this page shows the flow.
 */
@Service
@Scope("prototype")
@Title("Model journeys")
@RequiredArgsConstructor
public class ModelJourneyPage implements ComponentTreeSupplier {

    final ModelStore repository;

    @Override
    public Component component(HttpRequest httpRequest) {
        return PageView.builder()
                .title("Model journeys")
                .subtitle("El eje central del sistema: cada modelo, sus roles en cada estación y los mapeos que lo llevan al siguiente.")
                .content(List.of(new Markdown(
                        ModelJourneyRenderer.render(ModelSnapshot.from(repository)), null, null)))
                .build();
    }
}
