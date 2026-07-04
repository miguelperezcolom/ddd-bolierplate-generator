package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.designdoc;

import io.mateu.modux.modeldrivengenerator.application.usecases.project.generatehla.GenerateHlaUseCase;
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
 * The living design document (HLA), rendered from the model on every visit: prose + ADR table +
 * derived diagrams (mermaid) + transversals + contracts + open points. Copy it or export it as the
 * deliverable — it cannot drift from the spec.
 */
@Service
@Scope("prototype")
@Title("Design document")
@RequiredArgsConstructor
public class DesignDocPage implements ComponentTreeSupplier {

    final GenerateHlaUseCase generateHla;

    @Override
    public Component component(HttpRequest httpRequest) {
        return PageView.builder()
                .title("Design document (HLA)")
                .subtitle("Generado desde el modelo — prosa, decisiones y diagramas derivados. Los bloques mermaid se renderizan en GitHub/GitLab.")
                .content(List.of(new Markdown(generateHla.render(), null, null)))
                .build();
    }
}
