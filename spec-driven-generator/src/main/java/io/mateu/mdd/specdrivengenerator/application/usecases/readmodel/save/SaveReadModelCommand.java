package io.mateu.mdd.specdrivengenerator.application.usecases.readmodel.save;

import java.util.List;

public record SaveReadModelCommand(String id, String name,
                                   String modelId,
                                   String storageType,
                                   List<String> filterFields,
                                   List<String> sortFields,
                                   boolean cacheable,
                                   Integer cacheTtlSeconds,
                                   String consistencyLevel) {
}
