package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.buttongroup;

import io.mateu.core.infra.declarative.orchestrators.crud.Crud;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.data.NoFilters;
import io.mateu.uidl.data.Pageable;
import io.mateu.uidl.interfaces.CrudAdapter;
import io.mateu.uidl.interfaces.HttpRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Scope("prototype")
@Title("Grupos de botones")
public class ButtonGroupCrudOrchestrator extends Crud<
        ButtonGroupViewModel,
        ButtonGroupViewModel,
        ButtonGroupViewModel,
        NoFilters,
        ButtonGroupRow,
        String
        > {

    final ButtonGroupCrudAdapter adapter;

    @Override
    public CrudAdapter<ButtonGroupViewModel, ButtonGroupViewModel, NoFilters, ButtonGroupRow, String> adapter() {
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
    @SuppressWarnings("unchecked")
    public Object saveNew(HttpRequest httpRequest) {
        // The creation form's values travel as initiatorState too — a fresh bean
        // from the adapter would persist an EMPTY element.
        var form = (io.mateu.uidl.interfaces.CrudCreationForm<Object>)
                httpRequest.getInitiatorState(creationFormClass());
        return form.create(httpRequest);
    }

    @Override
    @SuppressWarnings("unchecked")
    public Object save(HttpRequest httpRequest) {
        // The EDITED state travels as initiatorState — the store still holds the old
        // values, so reloading the editor here would silently discard the edit.
        var edited = (io.mateu.uidl.interfaces.CrudEditorForm<Object>)
                httpRequest.getInitiatorState(editorClass());
        edited.save(httpRequest);
        return edited.id();
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
}
