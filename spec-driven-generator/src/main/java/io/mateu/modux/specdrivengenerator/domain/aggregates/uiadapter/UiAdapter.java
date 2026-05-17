package io.mateu.modux.specdrivengenerator.domain.aggregates.uiadapter;

import io.mateu.modux.specdrivengenerator.domain.aggregates.uiadapter.vo.UiAdapterId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.uiadapter.vo.UiAdapterName;
import io.mateu.modux.specdrivengenerator.domain.aggregates.uiadapter.vo.UiAppVariant;
import lombok.Getter;

import java.util.List;

@Getter
public class UiAdapter {

    private UiAdapterId id;
    private UiAdapterName name;
    private String serviceId;
    private String title;
    private String path;
    private UiAppVariant appVariant;
    private List<UiMenuItem> menuItems;

    public static UiAdapter of(UiAdapterId id, UiAdapterName name, String serviceId,
                                String title, String path, UiAppVariant appVariant,
                                List<UiMenuItem> menuItems) {
        var uiAdapter = new UiAdapter();
        uiAdapter.id = id;
        uiAdapter.name = name;
        uiAdapter.serviceId = serviceId;
        uiAdapter.title = title;
        uiAdapter.path = path;
        uiAdapter.appVariant = appVariant;
        uiAdapter.menuItems = menuItems != null ? menuItems : List.of();
        return uiAdapter;
    }

    public static UiAdapter load(String id, String name, String serviceId,
                                  String title, String path, UiAppVariant appVariant,
                                  List<UiMenuItem> menuItems) {
        var uiAdapter = new UiAdapter();
        uiAdapter.id = new UiAdapterId(id);
        uiAdapter.name = new UiAdapterName(name);
        uiAdapter.serviceId = serviceId;
        uiAdapter.title = title;
        uiAdapter.path = path;
        uiAdapter.appVariant = appVariant;
        uiAdapter.menuItems = menuItems != null ? menuItems : List.of();
        return uiAdapter;
    }

    public void update(UiAdapterName name, String serviceId,
                       String title, String path, UiAppVariant appVariant,
                       List<UiMenuItem> menuItems) {
        this.name = name;
        this.serviceId = serviceId;
        this.title = title;
        this.path = path;
        this.appVariant = appVariant;
        this.menuItems = menuItems != null ? menuItems : List.of();
    }
}
