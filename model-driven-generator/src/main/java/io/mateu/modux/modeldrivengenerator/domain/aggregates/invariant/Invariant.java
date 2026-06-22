package io.mateu.modux.modeldrivengenerator.domain.aggregates.invariant;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.invariant.vo.InvariantCondition;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.invariant.vo.InvariantId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.invariant.vo.InvariantName;
import lombok.Getter;

import java.util.List;

@Getter
public class Invariant {

    private InvariantId id;
    private InvariantName name;
    private List<InvariantCondition> conditions;

    public static Invariant of(InvariantId id, InvariantName name,
                               List<InvariantCondition> conditions) {
        var invariant = new Invariant();
        invariant.id = id;
        invariant.name = name;
        invariant.conditions = conditions != null ? conditions : List.of();
        return invariant;
    }

    public static Invariant load(String id, String name,
                                 List<InvariantCondition> conditions) {
        var invariant = new Invariant();
        invariant.id = new InvariantId(id);
        invariant.name = new InvariantName(name);
        invariant.conditions = conditions != null ? conditions : List.of();
        return invariant;
    }

    public void update(InvariantName name, List<InvariantCondition> conditions) {
        this.name = name;
        this.conditions = conditions != null ? conditions : List.of();
    }
}
