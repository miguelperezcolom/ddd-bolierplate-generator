package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.uishell;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.UiShellDto;
import io.mateu.modux.modeldrivengenerator.application.usecases.uishell.create.CreateUiShellCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.uishell.create.CreateUiShellUseCase;
import io.mateu.modux.modeldrivengenerator.application.usecases.uishell.save.SaveUiShellCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.uishell.save.SaveUiShellUseCase;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.uishell.vo.UiShellDeploymentType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.uishell.vo.UiShellDesignSystem;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ServiceIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ServiceIdOptionsSupplier;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.annotations.Lookup;
import io.mateu.uidl.interfaces.CrudCreationForm;
import io.mateu.uidl.interfaces.CrudEditorForm;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.Identifiable;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Scope("prototype")
@RequiredArgsConstructor
public class UiShellViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    String title;

    String appVariant;

    @Lookup(search = ServiceIdOptionsSupplier.class, label = ServiceIdLabelSupplier.class)
    List<String> serviceIds;

    String url;

    UiShellDesignSystem designSystem;

    UiShellDeploymentType deploymentType;

    @Hidden("state['deploymentType'] != 'CDN'")
    String cdnProvider;

    @Hidden("state['deploymentType'] != 'CDN'")
    String cdnSiteId;

    @Hidden("state['deploymentType'] != 'BUCKET'")
    String bucketProvider;

    @Hidden("state['deploymentType'] != 'BUCKET'")
    String bucketName;

    @Hidden("state['deploymentType'] != 'BUCKET'")
    String bucketRegion;

    @Hidden("state['deploymentType'] != 'MICROSERVICE'")
    @Lookup(search = ServiceIdOptionsSupplier.class, label = ServiceIdLabelSupplier.class)
    String deploymentServiceId;

    final CreateUiShellUseCase createUseCase;
    final SaveUiShellUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateUiShellCommand(
                id, name, title, appVariant, serviceIds,
                url, deploymentType,
                cdnProvider, cdnSiteId,
                bucketProvider, bucketName, bucketRegion,
                deploymentServiceId, designSystem));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveUiShellCommand(
                id, name, title, appVariant, serviceIds,
                url, deploymentType,
                cdnProvider, cdnSiteId,
                bucketProvider, bucketName, bucketRegion,
                deploymentServiceId, designSystem));
    }

    @Override
    public String id() {
        return id;
    }

    public UiShellViewModel load(UiShellDto model) {
        id = model.id();
        name = model.name();
        title = model.title();
        appVariant = model.appVariant();
        serviceIds = model.serviceIds();
        url = model.url();
        designSystem = model.designSystem() != null
                ? UiShellDesignSystem.valueOf(model.designSystem()) : null;
        deploymentType = model.deploymentType() != null
                ? UiShellDeploymentType.valueOf(model.deploymentType()) : null;
        cdnProvider = model.cdnProvider();
        cdnSiteId = model.cdnSiteId();
        bucketProvider = model.bucketProvider();
        bucketName = model.bucketName();
        bucketRegion = model.bucketRegion();
        deploymentServiceId = model.deploymentServiceId();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "New UI shell";
    }
}
