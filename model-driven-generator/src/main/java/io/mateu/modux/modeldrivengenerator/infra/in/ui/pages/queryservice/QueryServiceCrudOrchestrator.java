package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.queryservice;

import io.mateu.core.infra.declarative.orchestrators.crud.Crud;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.QueryServiceRow;
import io.mateu.uidl.annotations.Title;
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
@Title("Query services")
@Slf4j
public class QueryServiceCrudOrchestrator extends Crud<
        QueryServiceViewModel,
        QueryServiceViewModel,
        QueryServiceViewModel,
        NoFilters,
        QueryServiceRow,
        String
        > {

    final QueryServiceCrudAdapter adapter;

    @Override
    public CrudAdapter< QueryServiceViewModel, QueryServiceViewModel,
            NoFilters, QueryServiceRow, String> adapter() {
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

}
