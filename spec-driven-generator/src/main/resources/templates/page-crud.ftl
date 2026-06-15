<#assign pageSlug = page.name?lower_case?replace("[^a-z0-9]","",'r')>
<#assign aggregateSlug = aggregate.name?lower_case>
<#assign moduleSlugVal = module.name?lower_case?replace("[^a-z0-9]","",'r')>
package ${project.packageName}.${moduleSlugVal}.infra.in.ui.pages.${pageSlug};

import io.mateu.core.infra.declarative.orchestrators.crud.CrudOrchestrator;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.NoFilters;
import io.mateu.uidl.data.Pageable;
import io.mateu.uidl.interfaces.CrudAdapter;
import io.mateu.uidl.interfaces.HttpRequest;
import ${project.packageName}.${moduleSlugVal}.application.query.${aggregate.name}QueryService;
import ${project.packageName}.${moduleSlugVal}.application.query.dto.${aggregate.name}Row;
import ${project.packageName}.${moduleSlugVal}.application.usecases.${aggregateSlug}.delete.Delete${aggregate.name}Command;
import ${project.packageName}.${moduleSlugVal}.application.usecases.${aggregateSlug}.delete.Delete${aggregate.name}UseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * CRUD page: ${page.name}
 * Route: ${page.route!''}
 * Generated from PageEntity id=${page.id}
 */
@Service
@Scope("prototype")
@RequiredArgsConstructor
@Title("${page.name}")
public class ${page.name?cap_first?replace("[^a-zA-Z0-9]","",'r')}Page extends CrudOrchestrator<
        ${aggregate.name}ViewModel,
        ${aggregate.name}ViewModel,
        ${aggregate.name}ViewModel,
        NoFilters,
        ${aggregate.name}Row,
        String> {

    final ${aggregate.name}CrudPageAdapter adapter;

    @Override
    public CrudAdapter<${aggregate.name}ViewModel,
            ${aggregate.name}ViewModel, ${aggregate.name}ViewModel,
            NoFilters, ${aggregate.name}Row, String> adapter() {
        return adapter;
    }

    @Override
    public String toId(String s) {
        return s;
    }

    @Service
    @Scope("prototype")
    @RequiredArgsConstructor
    public static class ${aggregate.name}CrudPageAdapter implements CrudAdapter<
            ${aggregate.name}ViewModel,
            ${aggregate.name}ViewModel,
            ${aggregate.name}ViewModel,
            NoFilters,
            ${aggregate.name}Row,
            String> {

        final ${aggregate.name}ViewModel viewModel;
        final Delete${aggregate.name}UseCase delete${aggregate.name}UseCase;
        final ${aggregate.name}QueryService queryService;

        @Override
        public ListingData<${aggregate.name}Row> search(String searchText, NoFilters filters, Pageable pageable, HttpRequest httpRequest) {
            return queryService.findAll(searchText, filters, pageable);
        }

        @Override
        public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
            delete${aggregate.name}UseCase.handle(new Delete${aggregate.name}Command(selectedIds));
        }

        @Override
        public ${aggregate.name}ViewModel getView(String id, HttpRequest httpRequest) {
            return viewModel.load(queryService.getById(id).orElseThrow());
        }

        @Override
        public ${aggregate.name}ViewModel getEditor(String id, HttpRequest httpRequest) {
            return viewModel.load(queryService.getById(id).orElseThrow());
        }

        @Override
        public ${aggregate.name}ViewModel getCreationForm(HttpRequest httpRequest) {
            return viewModel;
        }
    }

}
