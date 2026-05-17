package io.mateu.modux.specdrivengenerator.domain.aggregates.uishell;

import io.mateu.modux.specdrivengenerator.domain.aggregates.uishell.vo.UiShellId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.uishell.vo.UiShellName;
import lombok.Getter;

import java.util.List;

@Getter
public class UiShell {

    private UiShellId id;
    private UiShellName name;
    private String title;
    private String appVariant;
    private List<String> serviceIds;

    public static UiShell of(UiShellId id, UiShellName name,
                             String title, String appVariant,
                             List<String> serviceIds) {
        var uiShell = new UiShell();
        uiShell.id = id;
        uiShell.name = name;
        uiShell.title = title;
        uiShell.appVariant = appVariant;
        uiShell.serviceIds = serviceIds != null ? serviceIds : List.of();
        return uiShell;
    }

    public static UiShell load(String id, String name,
                               String title, String appVariant,
                               List<String> serviceIds) {
        var uiShell = new UiShell();
        uiShell.id = new UiShellId(id);
        uiShell.name = new UiShellName(name);
        uiShell.title = title;
        uiShell.appVariant = appVariant;
        uiShell.serviceIds = serviceIds != null ? serviceIds : List.of();
        return uiShell;
    }

    public void update(UiShellName name, String title, String appVariant, List<String> serviceIds) {
        this.name = name;
        this.title = title;
        this.appVariant = appVariant;
        this.serviceIds = serviceIds != null ? serviceIds : List.of();
    }
}
