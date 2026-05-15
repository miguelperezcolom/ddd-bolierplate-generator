package io.mateu.mdd.specdrivengenerator.domain.aggregates.usecase;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.usecase.vo.*;
import lombok.Getter;

@Getter
public class UseCase {

    private UseCaseId id;
    private UseCaseName name;
    private UseCaseExposedAsRest exposedAsRest;
    private UseCaseExposedAsGrpc exposedAsGrpc;
    private UseCaseExposedAsMcp exposedAsMcp;
    private UseCaseExposedAsAsync exposedAsAsync;
    private UseCaseExposedAsUi exposedAsUi;
    private UseCaseInputModelId inputModelId;
    private UseCaseOutputModelId outputModelId;

    public static UseCase of(UseCaseId id, UseCaseName name,
                             UseCaseExposedAsRest exposedAsRest,
                             UseCaseExposedAsGrpc exposedAsGrpc,
                             UseCaseExposedAsMcp exposedAsMcp,
                             UseCaseExposedAsAsync exposedAsAsync,
                             UseCaseExposedAsUi exposedAsUi,
                             UseCaseInputModelId inputModelId,
                             UseCaseOutputModelId outputModelId) {
        var useCase = new UseCase();
        useCase.id = id;
        useCase.name = name;
        useCase.exposedAsRest = exposedAsRest;
        useCase.exposedAsGrpc = exposedAsGrpc;
        useCase.exposedAsMcp = exposedAsMcp;
        useCase.exposedAsAsync = exposedAsAsync;
        useCase.exposedAsUi = exposedAsUi;
        useCase.inputModelId = inputModelId;
        useCase.outputModelId = outputModelId;
        return useCase;
    }

    public static UseCase load(String id, String name,
                               boolean exposedAsRest,
                               boolean exposedAsGrpc,
                               boolean exposedAsMcp,
                               boolean exposedAsAsync,
                               boolean exposedAsUi,
                               String inputModelId,
                               String outputModelId) {
        var useCase = new UseCase();
        useCase.id = new UseCaseId(id);
        useCase.name = new UseCaseName(name);
        useCase.exposedAsRest = new UseCaseExposedAsRest(exposedAsRest);
        useCase.exposedAsGrpc = new UseCaseExposedAsGrpc(exposedAsGrpc);
        useCase.exposedAsMcp = new UseCaseExposedAsMcp(exposedAsMcp);
        useCase.exposedAsAsync = new UseCaseExposedAsAsync(exposedAsAsync);
        useCase.exposedAsUi = new UseCaseExposedAsUi(exposedAsUi);
        useCase.inputModelId = inputModelId != null ? new UseCaseInputModelId(inputModelId) : null;
        useCase.outputModelId = outputModelId != null ? new UseCaseOutputModelId(outputModelId) : null;
        return useCase;
    }

    public void update(UseCaseName name,
                       UseCaseExposedAsRest exposedAsRest,
                       UseCaseExposedAsGrpc exposedAsGrpc,
                       UseCaseExposedAsMcp exposedAsMcp,
                       UseCaseExposedAsAsync exposedAsAsync,
                       UseCaseExposedAsUi exposedAsUi,
                       UseCaseInputModelId inputModelId,
                       UseCaseOutputModelId outputModelId) {
        this.name = name;
        this.exposedAsRest = exposedAsRest;
        this.exposedAsGrpc = exposedAsGrpc;
        this.exposedAsMcp = exposedAsMcp;
        this.exposedAsAsync = exposedAsAsync;
        this.exposedAsUi = exposedAsUi;
        this.inputModelId = inputModelId;
        this.outputModelId = outputModelId;
    }
}
