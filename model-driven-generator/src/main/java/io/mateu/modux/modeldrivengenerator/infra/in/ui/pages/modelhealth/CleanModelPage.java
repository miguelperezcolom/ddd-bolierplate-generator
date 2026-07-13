package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.modelhealth;

import io.mateu.modux.modeldrivengenerator.application.usecases.model.clean.CleanModelUseCase;
import io.mateu.uidl.annotations.Button;
import io.mateu.uidl.annotations.Help;
import io.mateu.uidl.annotations.PlainText;
import io.mateu.uidl.annotations.Style;
import io.mateu.uidl.annotations.Title;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

/**
 * Model cleanup: list the orphans (elements with no relation in either direction) and, on an
 * explicit second click, delete them. Lives in the menu — NOT in the graphical editor — because
 * it sweeps the whole model, not whatever diagram happens to be open.
 */
@Service
@Scope("prototype")
@RequiredArgsConstructor
@Style("max-width:900px;margin: auto;")
@Title("Limpiar modelo")
public class CleanModelPage {

    final CleanModelUseCase useCase;

    @PlainText
    @Help("Un huérfano no referencia a ningún otro elemento y ningún elemento lo referencia. "
            + "Los proyectos nunca son candidatos, y un bounded context cuenta como unidad con su "
            + "módulo principal: si el módulo está desplegado en un servicio, la pareja se conserva.")
    String resultado = "Pulsa «Buscar huérfanos» para listar los elementos no relacionados con nada.";

    @Button
    void buscarHuerfanos() {
        var informe = useCase.report();
        resultado = informe.startsWith("✅")
                ? informe
                : informe + "\n\nPulsa «Eliminar huérfanos» para quitarlos del modelo.";
    }

    @Button
    void eliminarHuerfanos() {
        resultado = useCase.deleteOrphans();
    }
}
