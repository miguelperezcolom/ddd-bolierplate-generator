package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.workspace;

import io.mateu.modux.modeldrivengenerator.application.out.query.ModuleQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.ProjectQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.ServiceQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ModuleDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ProjectDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ProjectRow;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ServiceDto;
import io.mateu.modux.modeldrivengenerator.application.usecases.workspace.DeleteWorkspaceElementsUseCase;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DecisionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ElementTypeRegistry;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.FlowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.GatewayEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.IntegrationEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.QueryServiceEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.NoFilters;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import io.mateu.uidl.interfaces.CrudAdapter;
import io.mateu.uidl.interfaces.CrudCreationForm;
import io.mateu.uidl.interfaces.CrudEditorForm;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.Identifiable;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.function.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

/**
 * Data adapter for the workspace tree-CRUD: builds the nested {@link WorkspaceRow} tree from the model
 * and, on selection, resolves which component owns the (globally unique) id and delegates to that
 * concept's own CRUD adapter. Because ids are unique and unprefixed, the opened editor reports the same
 * id the route carries, so view/edit/save behave exactly like any CRUD.
 *
 * <p>Tree shape: Project ▸ Service ▸ {Gateways} ▸ Module ▸ {Aggregates, Entities, Value Objects,
 * Domain Events, Use Cases, Flows, Processes, Sagas, Projections, Read Models, Subscriptions,
 * Query Services, Integration Events, Scheduled Triggers}, plus a global Decisions group. Creation
 * ({@link WorkspaceCreationForm}) and deletion are enabled; both keep parent reference lists in sync.
 */
@Service
@Scope("prototype")
@RequiredArgsConstructor
public class WorkspaceCrudAdapter
    implements CrudAdapter<CrudEditorForm<String>, CrudCreationForm<String>, NoFilters, WorkspaceRow, String> {

  private final ProjectQueryService projectQueryService;
  private final ServiceQueryService serviceQueryService;
  private final ModuleQueryService moduleQueryService;

  private final ModelStore repository;
  private final ElementTypeRegistry registry;
  private final DeleteWorkspaceElementsUseCase deleteElementsUseCase;
  private final WorkspaceCreationForm creationForm;

  private final io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.project.ProjectCrudAdapter projectAdapter;
  private final io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.service.ServiceCrudAdapter serviceAdapter;
  private final io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.module.ModuleCrudAdapter moduleAdapter;
  private final io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.aggregate.AggregateCrudAdapter aggregateAdapter;
  private final io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.entity.EntityCrudAdapter entityAdapter;
  private final io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.valueobject.ValueObjectCrudAdapter valueObjectAdapter;
  private final io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.domainevent.DomainEventCrudAdapter domainEventAdapter;
  private final io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.usecase.UseCaseCrudAdapter useCaseAdapter;
  private final io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.flow.FlowCrudAdapter flowAdapter;
  private final io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.process.ProcessCrudAdapter processAdapter;
  private final io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.saga.SagaCrudAdapter sagaAdapter;
  private final io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.projection.ProjectionCrudAdapter projectionAdapter;
  private final io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.readmodel.ReadModelCrudAdapter readModelAdapter;
  private final io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.subscription.SubscriptionCrudAdapter subscriptionAdapter;
  private final io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.scheduledtrigger.ScheduledTriggerCrudAdapter scheduledTriggerAdapter;
  private final io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.queryservice.QueryServiceCrudAdapter queryServiceAdapter;
  private final io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.integrationevent.IntegrationEventCrudAdapter integrationEventAdapter;
  private final io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.gateway.GatewayCrudAdapter gatewayAdapter;
  private final io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.decision.DecisionCrudAdapter decisionAdapter;

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
          List<WorkspaceRow> serviceChildren = new ArrayList<>();
          for (String moduleId : service.moduleIds()) {
            ModuleDto module = moduleQueryService.getById(moduleId).orElse(null);
            if (module == null) continue;
            serviceChildren.add(
                WorkspaceRow.of(module.id(), "Module: " + module.name(), moduleChildren(module)));
          }
          addGroup(serviceChildren, service.id() + "#gw", "Gateways",
              entityLeaves(GatewayEntity.class, g -> service.id().equals(g.serviceId())));
          serviceNodes.add(WorkspaceRow.of(service.id(), "Service: " + service.name(), serviceChildren));
        }
      }
      roots.add(WorkspaceRow.of(project.id(), "Project: " + project.name(), serviceNodes));
    }
    var decisions = entityLeaves(DecisionEntity.class, d -> true);
    addGroup(roots, "#decisions", "Decisions", decisions);
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
    // Operations and invariants are not first-class components (no standalone id/editor); they are
    // edited inline within their aggregate, so they are not shown as tree nodes. Aggregates are leaves.
    addGroup(categories, base + "agg", "Aggregates", idLeaves(module.aggregateIds()));
    addGroup(categories, base + "ent", "Entities", idLeaves(module.entityIds()));
    addGroup(categories, base + "vo", "Value Objects", idLeaves(module.valueObjectIds()));
    addGroup(categories, base + "de", "Domain Events", idLeaves(module.domainEventIds()));
    addGroup(categories, base + "uc", "Use Cases", idLeaves(module.useCaseIds()));
    addGroup(categories, base + "flow", "Flows",
        entityLeaves(FlowEntity.class, f -> module.id().equals(f.targetModuleId())));
    addGroup(categories, base + "proc", "Processes",
        entityLeaves(ProcessEntity.class, p -> module.id().equals(p.ownerModuleId())));
    addGroup(categories, base + "saga", "Sagas", idLeaves(module.sagaIds()));
    addGroup(categories, base + "proj", "Projections", idLeaves(module.projectionIds()));
    addGroup(categories, base + "rm", "Read Models", idLeaves(module.readModelIds()));
    addGroup(categories, base + "sub", "Subscriptions", idLeaves(module.subscriptionIds()));
    addGroup(categories, base + "qs", "Query Services",
        entityLeaves(QueryServiceEntity.class, q -> module.id().equals(q.moduleId())));
    addGroup(categories, base + "ie", "Integration Events",
        entityLeaves(IntegrationEventEntity.class, e -> module.id().equals(e.moduleId())));
    addGroup(categories, base + "st", "Scheduled Triggers", idLeaves(module.scheduledTriggerIds()));
    return categories;
  }

  /** Leaves for ids attached to a parent's reference list; label resolved from the catalog. */
  private List<WorkspaceRow> idLeaves(List<String> ids) {
    return ids.stream()
        .map(id -> WorkspaceRow.of(id, labelOf(id), List.<WorkspaceRow>of()))
        .toList();
  }

  /** Leaves for elements that anchor themselves via a reference field (reverse lookup). */
  private <T> List<WorkspaceRow> entityLeaves(Class<T> type, Predicate<T> owned) {
    return new LinkedHashSet<>(repository.findAllOfType(type)).stream()
        .filter(owned)
        .filter(e -> e instanceof Identifiable)
        .sorted(java.util.Comparator.comparing(e -> ((Identifiable) e).id()))
        .map(e -> WorkspaceRow.of(((Identifiable) e).id(), labelOf((Identifiable) e), List.<WorkspaceRow>of()))
        .toList();
  }

  private String labelOf(String id) {
    for (var type : registry.all().values()) {
      var found = repository.findById(id, type);
      if (found.isPresent() && found.get() instanceof Identifiable identifiable) {
        return labelOf(identifiable);
      }
    }
    return id;
  }

  private String labelOf(Identifiable element) {
    try {
      var name = element.getClass().getMethod("name").invoke(element);
      return name != null && !String.valueOf(name).isBlank() ? String.valueOf(name) : element.id();
    } catch (ReflectiveOperationException e) {
      return element.id();
    }
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

  @SuppressWarnings({"rawtypes", "unchecked"})
  private Object open(String id, HttpRequest req, boolean forEdit) {
    if (id == null || id.isBlank() || id.contains("#")) {
      return new WorkspacePlaceholder();
    }
    for (var entry : registry.all().entrySet()) {
      if (repository.findById(id, entry.getValue()).isPresent()) {
        CrudAdapter adapter = adapterFor(entry.getKey());
        if (adapter == null) {
          return new WorkspacePlaceholder();
        }
        return forEdit ? adapter.getEditor(id, req) : adapter.getView(id, req);
      }
    }
    return new WorkspacePlaceholder();
  }

  /** The concept editor for each openable type in the tree (null = no editor, show placeholder). */
  private CrudAdapter<?, ?, ?, ?, String> adapterFor(String typeName) {
    return switch (typeName) {
      case "projects" -> projectAdapter;
      case "services" -> serviceAdapter;
      case "modules" -> moduleAdapter;
      case "aggregates" -> aggregateAdapter;
      case "entities" -> entityAdapter;
      case "valueObjects" -> valueObjectAdapter;
      case "domainEvents" -> domainEventAdapter;
      case "useCases" -> useCaseAdapter;
      case "flows" -> flowAdapter;
      case "processes" -> processAdapter;
      case "sagas" -> sagaAdapter;
      case "projections" -> projectionAdapter;
      case "readModels" -> readModelAdapter;
      case "subscriptions" -> subscriptionAdapter;
      case "scheduledTriggers" -> scheduledTriggerAdapter;
      case "queryServices" -> queryServiceAdapter;
      case "integrationEvents" -> integrationEventAdapter;
      case "gateways" -> gatewayAdapter;
      case "decisions" -> decisionAdapter;
      default -> null;
    };
  }

  // --- create / delete ------------------------------------------------------

  @Override
  public Object getCreationForm(HttpRequest httpRequest) {
    return creationForm;
  }

  @Override
  public void deleteAllById(List<String> ids, HttpRequest httpRequest) {
    // group/category nodes carry synthetic ids ("module#agg") — never deletable
    deleteElementsUseCase.handle(ids.stream().filter(id -> !id.contains("#")).toList());
  }
}
