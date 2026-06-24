package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.gateway;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ModelIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ModelIdOptionsSupplier;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.annotations.Lookup;
import jakarta.validation.constraints.NotEmpty;

import java.util.ArrayList;
import java.util.List;

public class GatewayOperationViewModel {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    String httpMethod;
    String path;

    @Lookup(search = ModelIdOptionsSupplier.class, label = ModelIdLabelSupplier.class)
    String inputModelId;

    @Lookup(search = ModelIdOptionsSupplier.class, label = ModelIdLabelSupplier.class)
    String outputModelId;

    Integer timeoutMs;
    Integer retryMaxAttempts;
    Integer retryWaitDurationMs;
    boolean circuitBreakerEnabled;
    Integer circuitBreakerFailureRateThreshold;
    Integer circuitBreakerSlidingWindowSize;

    List<GatewayParameterViewModel> parameters = new ArrayList<>();

}
