package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.workspace;

import io.mateu.modux.modeldrivengenerator.application.out.query.AggregateQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.DomainEventQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.EntityQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.ModuleQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.ProjectQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.ServiceQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.ValueObjectQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ModuleDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ProjectDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ProjectRow;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ServiceDto;
import io.mateu.modux.modeldrivengenerator.application.out.shared.QueryService;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.aggregate.AggregateCrudAdapter;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.domainevent.DomainEventCrudAdapter;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.entity.EntityCrudAdapter;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.module.ModuleCrudAdapter;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.project.ProjectCrudAdapter;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.service.ServiceCrudAdapter;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.valueobject.ValueObjectCrudAdapter;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.NoFilters;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import io.mateu.uidl.interfaces.CrudAdapter;
import io.mateu.uidl.interfaces.CrudCreationForm;
import io.mateu.uidl.interfaces.CrudEditorForm;
import io.mateu.uidl.interfaces.HttpRequest;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

/**
 * Data adapter for the workspace tree-CRUD: builds the nested {@link WorkspaceRow} tree from the model
 * and, on selection, resolves which component owns the (globally unique) id and delegates to that
 * concept's own CRUD adapter. Because ids are unique and unprefixed, the opened editor reports the same
 * id the route carries, so view/edit/save behave exactly like any CRUD. Read/edit only (creation and
 * deletion are suppressed at the orchestrator).
 */
@Service
@Scope("prototype")
@RequiredArgsConstructor
public class WorkspaceCrudAdapter
    implements CrudAdapter<CrudEditorForm<String>, CrudCreationForm<String>, NoFilters, WorkspaceRow, String> {

  private final ProjectQueryService projectQueryService;
  private final ServiceQueryService serviceQueryService;
  private final ModuleQueryService moduleQueryService;
  private final AggregateQueryService aggregateQueryService;
  private final EntityQueryService entityQueryService;
  private final ValueObjectQueryService valueObjectQueryService;
  private final DomainEventQueryService domainEventQueryService;

  private final ProjectCrudAdapter projectAdapter;
  private final ServiceCrudAdapter serviceAdapter;
  private final ModuleCrudAdapter moduleAdapter;
  private final AggregateCrudAdapter aggregateAdapter;
  private final EntityCrudAdapter entityAdapter;
  private final ValueObjectCrudAdapter valueObjectAdapter;
  private final DomainEventCrudAdapter domainEventAdapter;

  // --- list data (the tree) ------------------------------------------------

  @Override
  public ListingData<WorkspaceRow> search(
      String searchText, NoFilters filters, Pageable pageable, HttpRequest httpRequest) {
    List<WorkspaceRow> roots = new ArrayList<>();
    for (ProjectRow project : allProjects()) {
      ProjectDto projectDto = projectQueryService.getById(project.id()).orElse(null);
      List<WorkspaceRow> serviceNodes = new ArrayList<>();
      if (projectDto != null) {
        for (String serviceId : projectDto.serviceIds()) {
          ServiceDto service = serviceQueryService.getById(serviceId).orElse(null);
          if (service == null) continue;
          List<WorkspaceRow> moduleNodes = new ArrayList<>();
          for (String moduleId : service.moduleIds()) {
            ModuleDto module = moduleQueryService.getById(moduleId).orElse(null);
            if (module == null) continue;
            moduleNodes.add(
                WorkspaceRow.of(module.id(), "Module: " + module.name(), moduleChildren(module)));
          }
          serviceNodes.add(WorkspaceRow.of(service.id(), "Service: " + service.name(), moduleNodes));
        }
      }
      roots.add(WorkspaceRow.of(project.id(), "Project: " + project.name(), serviceNodes));
    }
    if (searchText != null && !searchText.isBlank()) {
      roots = filter(roots, searchText.toLowerCase());
    }
    return new ListingData<>(new Page<>("", roots.size(), 0, roots.size(), roots));
  }

  /** Keeps nodes whose label matches (with all their children) or that have a matching descendant. */
  private List<WorkspaceRow> filter(List<WorkspaceRow> nodes, String q) {
    List<WorkspaceRow> out = new ArrayList<>();
    if (nodes == null) return out;
    for (WorkspaceRow node : nodes) {
      boolean selfMatch = node.label().toLowerCase().contains(q);
      List<WorkspaceRow> filteredChildren = filter(node.children(), q);
      if (selfMatch) {
        out.add(node);
      } else if (!filteredChildren.isEmpty()) {
        out.add(new WorkspaceRow(node.label(), node.id(), node.viewable(), filteredChildren));
      }
    }
    return out;
  }

  private List<WorkspaceRow> moduleChildren(ModuleDto module) {
    String base = module.id() + "#";
    List<WorkspaceRow> categories = new ArrayList<>();
    addGroup(categories, base + "agg", "Aggregates", aggregateNodes(module.aggregateIds()));
    addGroup(categories, base + "ent", "Entities", leafNodes(module.entityIds(), entityQueryService));
    addGroup(
        categories, base + "vo", "Value Objects",
        leafNodes(module.valueObjectIds(), valueObjectQueryService));
    addGroup(
        categories, base + "de", "Domain Events",
        leafNodes(module.domainEventIds(), domainEventQueryService));
    return categories;
  }

  private List<WorkspaceRow> aggregateNodes(List<String> ids) {
    // Operations and invariants are not first-class components (no standalone id/editor); they are
    // edited inline within their aggregate, so they are not shown as tree nodes. Aggregates are leaves.
    return leafNodes(ids, aggregateQueryService);
  }

  private List<WorkspaceRow> leafNodes(List<String> ids, QueryService<?, ?, String> queryService) {
    return ids.stream()
        .map(id -> WorkspaceRow.of(id, queryService.getLabel(id), List.of()))
        .toList();
  }

  private List<ProjectRow> allProjects() {
    return projectQueryService
        .findAll(null, new NoFilters(), new Pageable(0, 100_000, List.of()))
        .page()
        .content();
  }

  private void addGroup(
      List<WorkspaceRow> target, String syntheticId, String label, List<WorkspaceRow> children) {
    if (!children.isEmpty()) {
      target.add(WorkspaceRow.group(syntheticId, label, children));
    }
  }

  // --- open editor (resolve owning component by unique id) -----------------

  @Override
  public Object getEditor(String id, HttpRequest httpRequest) {
    return open(id, httpRequest, true);
  }

  @Override
  public Object getView(String id, HttpRequest httpRequest) {
    return open(id, httpRequest, false);
  }

  private Object open(String id, HttpRequest req, boolean forEdit) {
    if (id == null || id.isBlank()) {
      return new WorkspacePlaceholder();
    }
    if (projectQueryService.getById(id).isPresent()) {
      return forEdit ? projectAdapter.getEditor(id, req) : projectAdapter.getView(id, req);
    }
    if (serviceQueryService.getById(id).isPresent()) {
      return forEdit ? serviceAdapter.getEditor(id, req) : serviceAdapter.getView(id, req);
    }
    if (moduleQueryService.getById(id).isPresent()) {
      return forEdit ? moduleAdapter.getEditor(id, req) : moduleAdapter.getView(id, req);
    }
    if (aggregateQueryService.getById(id).isPresent()) {
      return forEdit ? aggregateAdapter.getEditor(id, req) : aggregateAdapter.getView(id, req);
    }
    if (entityQueryService.getById(id).isPresent()) {
      return forEdit ? entityAdapter.getEditor(id, req) : entityAdapter.getView(id, req);
    }
    if (valueObjectQueryService.getById(id).isPresent()) {
      return forEdit ? valueObjectAdapter.getEditor(id, req) : valueObjectAdapter.getView(id, req);
    }
    if (domainEventQueryService.getById(id).isPresent()) {
      return forEdit ? domainEventAdapter.getEditor(id, req) : domainEventAdapter.getView(id, req);
    }
    return new WorkspacePlaceholder();
  }

  // --- unsupported (creation/deletion suppressed at the orchestrator) -------

  @Override
  public Object getCreationForm(HttpRequest httpRequest) {
    // The split detail loads the "new" route when nothing is selected — show a friendly placeholder
    // instead (creation is otherwise suppressed with @NotCreatable).
    return new WorkspacePlaceholder();
  }

  @Override
  public void deleteAllById(List<String> ids, HttpRequest httpRequest) {
    // no-op: deletion is suppressed at the orchestrator with @NotDeletable
  }
}
