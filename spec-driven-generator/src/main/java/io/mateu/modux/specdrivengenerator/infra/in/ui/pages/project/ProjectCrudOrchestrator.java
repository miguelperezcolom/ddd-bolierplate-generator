package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.project;

import io.mateu.core.infra.declarative.orchestrators.crud.CrudOrchestrator;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ProjectRow;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.annotations.ViewToolbarButton;
import io.mateu.uidl.data.NoFilters;
import io.mateu.uidl.data.Pageable;
import io.mateu.uidl.interfaces.CrudAdapter;
import io.mateu.uidl.interfaces.HttpRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Scope("prototype")
@Title("Projects")
@Slf4j
public class ProjectCrudOrchestrator extends CrudOrchestrator<
        ProjectViewModel,
        ProjectViewModel,
        ProjectViewModel,
        NoFilters,
        ProjectRow,
        String
        > {

    final ProjectCrudAdapter adapter;
    final GenerateBoilerplateCodeForm form;

    @Override
    public CrudAdapter<
            ProjectViewModel, ProjectViewModel,
            NoFilters, ProjectRow, String> adapter() {
        return adapter;
    }

    @Override
    public String toId(String s) {
        return s;
    }

    @ViewToolbarButton
    public GenerateBoilerplateCodeForm generateCode(ProjectViewModel project, HttpRequest httpRequest) {
        form.projectId = project.id;
        form.outputPath = project.outputPath;
        form.packageName = project.packageName;
        return form;
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
        return adapter().getCreationForm(httpRequest).create(httpRequest);
    }

    @Override
    public Object save(HttpRequest httpRequest) {
        var id = httpRequest.getString(getIdFieldForRow());
        adapter().getEditor(toId(id), httpRequest).save(httpRequest);
        return id;
    }

    @Override
    @SuppressWarnings({"rawtypes", "unchecked"})
    public Class editorClass() {
        return io.mateu.uidl.reflection.GenericClassProvider.getGenericClass(
            this.getClass(), io.mateu.core.infra.declarative.orchestrators.crud.CrudOrchestrator.class, "Editor");
    }

    @Override
    @SuppressWarnings({"rawtypes", "unchecked"})
    public Class creationFormClass() {
        return io.mateu.uidl.reflection.GenericClassProvider.getGenericClass(
            this.getClass(), io.mateu.core.infra.declarative.orchestrators.crud.CrudOrchestrator.class, "CreationForm");
    }

}
