package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.gateway;

import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.GatewayDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.GatewayOperationDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.GatewayParameterDto;
import io.mateu.modux.modeldrivengenerator.application.usecases.gateway.create.CreateGatewayCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.gateway.create.CreateGatewayUseCase;
import io.mateu.modux.modeldrivengenerator.application.usecases.gateway.save.SaveGatewayUseCase;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.gateway.vo.GatewayAuthType;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

/** The UI round-trip (load a gateway, then save it) must keep operation parameters. */
class GatewayViewModelParametersTest {

    @Test
    void operation_parameters_survive_load_then_create() {
        var captured = new AtomicReference<CreateGatewayCommand>();
        var createUseCase = Mockito.mock(CreateGatewayUseCase.class);
        Mockito.doAnswer(inv -> {
            captured.set(inv.getArgument(0));
            return null;
        }).when(createUseCase).handle(Mockito.any());

        var viewModel = new GatewayViewModel(createUseCase, Mockito.mock(SaveGatewayUseCase.class));

        var opDto = new GatewayOperationDto("op1", "getPet", "GET", "/pets/{petId}", null, null,
                null, null, null, false, null, null,
                List.of(new GatewayParameterDto("petId", "path", "integer", true)));
        var dto = new GatewayDto("g1", "PetStore", null, "https://x", GatewayAuthType.None,
                null, null, null, null, null, null, null, null,
                List.of(opDto), false, null, null, false, null, null);

        viewModel.load(dto).create(null);

        var command = captured.get();
        assertNotNull(command, "create did not build a command");
        assertEquals(1, command.operations().size());
        var params = command.operations().get(0).parameters();
        assertEquals(1, params.size(), "operation parameter was lost across load -> save");
        assertEquals("petId", params.get(0).name());
        assertEquals("path", params.get(0).location());
    }
}
