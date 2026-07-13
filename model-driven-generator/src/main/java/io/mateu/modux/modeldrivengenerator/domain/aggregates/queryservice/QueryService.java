package io.mateu.modux.modeldrivengenerator.domain.aggregates.queryservice;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.queryservice.vo.QueryOperation;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.queryservice.vo.QueryServiceId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.queryservice.vo.QueryServiceName;
import lombok.Getter;

import java.util.List;

@Getter
public class QueryService {

    private QueryServiceId id;
    private QueryServiceName name;
    private String boundedContextId;
    private String description;
    private List<QueryOperation> operations;

    public static QueryService of(QueryServiceId id, QueryServiceName name, String boundedContextId, String description,
                                  List<QueryOperation> operations) {
        var queryService = new QueryService();
        queryService.id = id;
        queryService.name = name;
        queryService.boundedContextId = boundedContextId;
        queryService.description = description;
        queryService.operations = operations != null ? operations : List.of();
        return queryService;
    }

    public static QueryService load(String id, String name, String boundedContextId, String description,
                                    List<QueryOperation> operations) {
        var queryService = new QueryService();
        queryService.id = new QueryServiceId(id);
        queryService.name = new QueryServiceName(name);
        queryService.boundedContextId = boundedContextId;
        queryService.description = description;
        queryService.operations = operations != null ? operations : List.of();
        return queryService;
    }

    public void update(QueryServiceName name, String boundedContextId, String description,
                       List<QueryOperation> operations) {
        this.name = name;
        this.boundedContextId = boundedContextId;
        this.description = description;
        this.operations = operations != null ? operations : List.of();
    }
}
