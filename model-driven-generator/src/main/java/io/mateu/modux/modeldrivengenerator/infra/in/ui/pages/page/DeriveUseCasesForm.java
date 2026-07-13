package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.page;

import io.mateu.modux.modeldrivengenerator.application.usecases.page.derive.DerivePageUseCasesUseCase;
import io.mateu.uidl.annotations.Button;
import io.mateu.uidl.annotations.Help;
import io.mateu.uidl.annotations.PlainText;
import io.mateu.uidl.annotations.Style;
import io.mateu.uidl.annotations.Title;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

/**
 * Screen-first design: sketch the pages (buttons, CRUD over an aggregate, listing) and derive the
 * use-case stubs that serve them — the UI twin of the inbound OpenAPI import. Idempotent.
 */
@Service
@Scope("prototype")
@RequiredArgsConstructor
@Style("max-width:900px;margin: auto;")
@Title("Derive use cases from pages")
public class DeriveUseCasesForm {

    final DerivePageUseCasesUseCase useCase;
    final io.mateu.modux.modeldrivengenerator.application.usecases.usecase.consume.DeriveConsumptionApisUseCase consumptionApis;

    @PlainText
    @Help("Botones sin use case → stub cableado; página CRUD → create/update/delete; listado sin query service → query service con operación list. Derive APIs: consumos entre bounded contexts de servicios distintos → proveedor expuesto como gRPC.")
    String resultado = "Pulsa Derive para generar los stubs desde las pantallas declaradas.";

    @Button
    void derive() {
        resultado = useCase.handle();
    }

    @Button
    void deriveApis() {
        resultado = consumptionApis.handle();
    }
}
