package io.mateu.modux.modeldrivengenerator.domain.aggregates.model.vo;

public enum ModelFieldValidationType {
    NotNull,
    NotEmpty,
    NotBlank,
    Size,
    Min,
    Max,
    DecimalMin,
    DecimalMax,
    Pattern,
    Email,
    Positive,
    PositiveOrZero,
    Negative,
    NegativeOrZero,
    Future,
    Past,
    FutureOrPresent,
    PastOrPresent,
    Digits
}
