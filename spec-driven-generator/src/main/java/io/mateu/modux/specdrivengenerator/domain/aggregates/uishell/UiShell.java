package io.mateu.modux.specdrivengenerator.domain.aggregates.uishell;

import io.mateu.modux.specdrivengenerator.domain.aggregates.uishell.vo.UiShellDeploymentType;
import io.mateu.modux.specdrivengenerator.domain.aggregates.uishell.vo.UiShellDesignSystem;
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
    private String url;
    private UiShellDeploymentType deploymentType;
    private String cdnProvider;
    private String cdnSiteId;
    private String bucketProvider;
    private String bucketName;
    private String bucketRegion;
    private String deploymentServiceId;
    private UiShellDesignSystem designSystem;

    public static UiShell of(UiShellId id, UiShellName name,
                             String title, String appVariant,
                             List<String> serviceIds,
                             String url, UiShellDeploymentType deploymentType,
                             String cdnProvider, String cdnSiteId,
                             String bucketProvider, String bucketName, String bucketRegion,
                             String deploymentServiceId,
                             UiShellDesignSystem designSystem) {
        var s = new UiShell();
        s.id = id;
        s.name = name;
        s.title = title;
        s.appVariant = appVariant;
        s.serviceIds = serviceIds != null ? serviceIds : List.of();
        s.url = url;
        s.deploymentType = deploymentType;
        s.cdnProvider = cdnProvider;
        s.cdnSiteId = cdnSiteId;
        s.bucketProvider = bucketProvider;
        s.bucketName = bucketName;
        s.bucketRegion = bucketRegion;
        s.deploymentServiceId = deploymentServiceId;
        s.designSystem = designSystem;
        return s;
    }

    public static UiShell load(String id, String name,
                               String title, String appVariant,
                               List<String> serviceIds,
                               String url, String deploymentType,
                               String cdnProvider, String cdnSiteId,
                               String bucketProvider, String bucketName, String bucketRegion,
                               String deploymentServiceId,
                               String designSystem) {
        var s = new UiShell();
        s.id = new UiShellId(id);
        s.name = new UiShellName(name);
        s.title = title;
        s.appVariant = appVariant;
        s.serviceIds = serviceIds != null ? serviceIds : List.of();
        s.url = url;
        s.deploymentType = deploymentType != null ? UiShellDeploymentType.valueOf(deploymentType) : null;
        s.cdnProvider = cdnProvider;
        s.cdnSiteId = cdnSiteId;
        s.bucketProvider = bucketProvider;
        s.bucketName = bucketName;
        s.bucketRegion = bucketRegion;
        s.deploymentServiceId = deploymentServiceId;
        s.designSystem = designSystem != null ? UiShellDesignSystem.valueOf(designSystem) : null;
        return s;
    }

    public void update(UiShellName name, String title, String appVariant,
                       List<String> serviceIds,
                       String url, UiShellDeploymentType deploymentType,
                       String cdnProvider, String cdnSiteId,
                       String bucketProvider, String bucketName, String bucketRegion,
                       String deploymentServiceId,
                       UiShellDesignSystem designSystem) {
        this.name = name;
        this.title = title;
        this.appVariant = appVariant;
        this.serviceIds = serviceIds != null ? serviceIds : List.of();
        this.url = url;
        this.deploymentType = deploymentType;
        this.cdnProvider = cdnProvider;
        this.cdnSiteId = cdnSiteId;
        this.bucketProvider = bucketProvider;
        this.bucketName = bucketName;
        this.bucketRegion = bucketRegion;
        this.deploymentServiceId = deploymentServiceId;
        this.designSystem = designSystem;
    }
}
