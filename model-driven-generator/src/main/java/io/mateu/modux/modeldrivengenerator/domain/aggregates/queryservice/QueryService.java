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
    private String serviceId;
    private String description;
    private List<QueryOperation> operations;

    public static QueryService of(QueryServiceId id, QueryServiceName name, String serviceId, String description,
                                  List<QueryOperation> operations) {
        var queryService = new QueryService();
        queryService.id = id;
        queryService.name = name;
        queryService.serviceId = serviceId;
        queryService.description = description;
        queryService.operations = operations != null ? operations : List.of();
        return queryService;
    }

    public static QueryService load(String id, String name, String serviceId, String description,
                                    List<QueryOperation> operations) {
        var queryService = new QueryService();
        queryService.id = new QueryServiceId(id);
        queryService.name = new QueryServiceName(name);
        queryService.serviceId = serviceId;
        queryService.description = description;
        queryService.operations = operations != null ? operations : List.of();
        return queryService;
    }

    public void update(QueryServiceName name, String serviceId, String description,
                       List<QueryOperation> operations) {
        this.name = name;
        this.serviceId = serviceId;
        this.description = description;
        this.operations = operations != null ? operations : List.of();
    }
}
