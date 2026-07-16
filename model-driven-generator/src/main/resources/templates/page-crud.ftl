<#assign pageSlug = pageSlug!(page.name?lower_case?replace("[^a-z0-9]","",'r'))>
<#assign aggregateSlug = aggregate.name?lower_case>
<#assign moduleSlugVal = module.name?lower_case?replace("[^a-z0-9]","",'r')>
package ${project.packageName}.${moduleSlugVal}.infra.in.ui.pages.${pageSlug};

import io.mateu.core.infra.declarative.orchestrators.crud.Crud;
<#if ui??>
import io.mateu.uidl.annotations.UI;
</#if>
import io.mateu.uidl.annotations.Title;
<#if page.favicon?has_content>
import io.mateu.uidl.annotations.FavIcon;
</#if>
<#if page.style?has_content>
import io.mateu.uidl.StyleConstants;
import io.mateu.uidl.annotations.Style;
</#if>
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
<#if ui??>
<#assign uiPath = (ui.path?has_content)?then(ui.path, '')>
@UI(<#if ui.indexHtmlPath?has_content || ui.frontendComponentPath?has_content>value = "${uiPath}"<#if ui.indexHtmlPath?has_content>, indexHtmlPath = "${ui.indexHtmlPath}"</#if><#if ui.frontendComponentPath?has_content>, frontendComponentPath = "${ui.frontendComponentPath}"</#if><#else>"${uiPath}"</#if>)
</#if>
@Title("${page.title!page.name}")
<#if page.favicon?has_content>
@FavIcon("${page.favicon}")
</#if>
<#if page.style?has_content>
@Style(StyleConstants.${page.style})
</#if>
public class ${pageClassName!(page.name?cap_first?replace("[^a-zA-Z0-9]","",'r') + "Page")} extends Crud<
        ${aggregate.name}ViewModel,
        ${aggregate.name}ViewModel,
        ${aggregate.name}ViewModel,
        NoFilters,
        ${aggregate.name}Row,
        String> {

    final ${aggregate.name}CrudPageAdapter adapter;

    @Override
    public CrudAdapter<${aggregate.name}ViewModel,
            ${aggregate.name}ViewModel,
            NoFilters, ${aggregate.name}Row, String> adapter() {
        return adapter;
    }

    @Override
    public String toId(String s) {
        return s;
    }

    @Override
    @SuppressWarnings("unchecked")
    public Object search(String searchText, Object filters, Pageable pageable, HttpRequest httpRequest) {
        return ((CrudAdapter) adapter()).search(searchText, filters, pageable, httpRequest);
    }

    @Override
    public String getIdFieldForRow() {
        return "id";
    }

    @Override
    public Object saveNew(HttpRequest httpRequest) {
        return adapter.getCreationForm(httpRequest).create(httpRequest);
    }

    @Override
    public Object save(HttpRequest httpRequest) {
        var id = httpRequest.getString(getIdFieldForRow());
        adapter.getEditor(toId(id), httpRequest).save(httpRequest);
        return id;
    }

    @Override
    @SuppressWarnings({"rawtypes", "unchecked"})
    public Class editorClass() {
        return io.mateu.uidl.reflection.GenericClassProvider.getGenericClass(
            this.getClass(), io.mateu.core.infra.declarative.orchestrators.crud.Crud.class, "Editor");
    }

    @Override
    @SuppressWarnings({"rawtypes", "unchecked"})
    public Class creationFormClass() {
        return io.mateu.uidl.reflection.GenericClassProvider.getGenericClass(
            this.getClass(), io.mateu.core.infra.declarative.orchestrators.crud.Crud.class, "CreationForm");
    }

    @Service
    @Scope("prototype")
    @RequiredArgsConstructor
    public static class ${aggregate.name}CrudPageAdapter implements CrudAdapter<
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
