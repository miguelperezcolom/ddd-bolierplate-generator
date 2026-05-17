package io.mateu.modux.specdrivengenerator.domain.aggregates.page;

import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageListingDataSourceType;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageName;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageType;
import lombok.Getter;

import java.util.List;

@Getter
public class Page {

    private PageId id;
    private PageName name;
    private String route;
    private PageType type;
    private String aggregateId;
    private String modelId;
    private List<String> componentIds;
    private PageListingDataSourceType listingDataSourceType;
    private String listingQueryServiceId;
    private String listingGatewayId;

    public static Page of(PageId id, PageName name, String route, PageType type,
                          String aggregateId, String modelId, List<String> componentIds,
                          PageListingDataSourceType listingDataSourceType,
                          String listingQueryServiceId, String listingGatewayId) {
        var page = new Page();
        page.id = id;
        page.name = name;
        page.route = route;
        page.type = type;
        page.aggregateId = aggregateId;
        page.modelId = modelId;
        page.componentIds = componentIds != null ? componentIds : List.of();
        page.listingDataSourceType = listingDataSourceType;
        page.listingQueryServiceId = listingQueryServiceId;
        page.listingGatewayId = listingGatewayId;
        return page;
    }

    public static Page load(String id, String name, String route, String type,
                            String aggregateId, String modelId, List<String> componentIds,
                            String listingDataSourceType,
                            String listingQueryServiceId, String listingGatewayId) {
        var page = new Page();
        page.id = new PageId(id);
        page.name = new PageName(name);
        page.route = route;
        page.type = type != null ? PageType.valueOf(type) : null;
        page.aggregateId = aggregateId;
        page.modelId = modelId;
        page.componentIds = componentIds != null ? componentIds : List.of();
        page.listingDataSourceType = listingDataSourceType != null
                ? PageListingDataSourceType.valueOf(listingDataSourceType) : null;
        page.listingQueryServiceId = listingQueryServiceId;
        page.listingGatewayId = listingGatewayId;
        return page;
    }

    public void update(PageName name, String route, PageType type,
                       String aggregateId, String modelId, List<String> componentIds,
                       PageListingDataSourceType listingDataSourceType,
                       String listingQueryServiceId, String listingGatewayId) {
        this.name = name;
        this.route = route;
        this.type = type;
        this.aggregateId = aggregateId;
        this.modelId = modelId;
        this.componentIds = componentIds != null ? componentIds : List.of();
        this.listingDataSourceType = listingDataSourceType;
        this.listingQueryServiceId = listingQueryServiceId;
        this.listingGatewayId = listingGatewayId;
    }
}
