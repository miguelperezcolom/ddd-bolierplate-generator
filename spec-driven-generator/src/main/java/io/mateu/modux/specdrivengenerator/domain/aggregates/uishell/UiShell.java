package io.mateu.modux.specdrivengenerator.domain.aggregates.uishell;

import io.mateu.modux.specdrivengenerator.domain.aggregates.uishell.vo.UiShellId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.uishell.vo.UiShellName;
import lombok.Getter;

@Getter
public class UiShell {

    private UiShellId id;
    private UiShellName name;
    private String title;
    private String appVariant;

    public static UiShell of(UiShellId id, UiShellName name,
                             String title, String appVariant) {
        var uiShell = new UiShell();
        uiShell.id = id;
        uiShell.name = name;
        uiShell.title = title;
        uiShell.appVariant = appVariant;
        return uiShell;
    }

    public static UiShell load(String id, String name,
                               String title, String appVariant) {
        var uiShell = new UiShell();
        uiShell.id = new UiShellId(id);
        uiShell.name = new UiShellName(name);
        uiShell.title = title;
        uiShell.appVariant = appVariant;
        return uiShell;
    }

    public void update(UiShellName name, String title, String appVariant) {
        this.name = name;
        this.title = title;
        this.appVariant = appVariant;
    }
}
