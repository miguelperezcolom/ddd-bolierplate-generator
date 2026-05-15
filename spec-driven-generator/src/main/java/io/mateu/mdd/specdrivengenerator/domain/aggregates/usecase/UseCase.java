package io.mateu.mdd.specdrivengenerator.domain.aggregates.usecase;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.usecase.vo.UseCaseId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.usecase.vo.UseCaseName;
import lombok.Getter;

@Getter
public class UseCase {

    private UseCaseId id;
    private UseCaseName name;

    public static UseCase of(UseCaseId id, UseCaseName name) {
        var useCase = new UseCase();
        useCase.id = id;
        useCase.name = name;
        return useCase;
    }

    public static UseCase load(String id, String name) {
        var useCase = new UseCase();
        useCase.id = new UseCaseId(id);
        useCase.name = new UseCaseName(name);
        return useCase;
    }

    public void update(UseCaseName name) {
        this.name = name;
    }
}
