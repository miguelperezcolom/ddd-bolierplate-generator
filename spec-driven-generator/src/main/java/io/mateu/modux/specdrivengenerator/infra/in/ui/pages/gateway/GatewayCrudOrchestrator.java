package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.gateway;

import io.mateu.core.infra.declarative.CrudOrchestrator;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.GatewayRow;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.data.NoFilters;
import io.mateu.uidl.interfaces.CrudAdapter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Scope("prototype")
@Title("Gateways")
@Slf4j
public class GatewayCrudOrchestrator extends CrudOrchestrator<
        GatewayViewModel,
        GatewayViewModel,
        GatewayViewModel,
        NoFilters,
        GatewayRow,
        String
        > {

    final GatewayCrudAdapter adapter;

    @Override
    public CrudAdapter<GatewayViewModel, GatewayViewModel, GatewayViewModel,
            NoFilters, GatewayRow, String> adapter() {
        return adapter;
    }

    @Override
    public String toId(String s) {
        return s;
    }
}
