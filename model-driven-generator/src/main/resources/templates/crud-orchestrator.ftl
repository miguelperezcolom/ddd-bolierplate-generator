package ${project.packageName}.${module.name?lower_case?replace("[^a-z0-9]","",'r')}.infra.in.ui.pages.${aggregate.name?lower_case};

import io.mateu.core.infra.declarative.orchestrators.crud.Crud;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.data.NoFilters;
import io.mateu.uidl.data.Pageable;
import io.mateu.uidl.interfaces.CrudAdapter;
import io.mateu.uidl.interfaces.HttpRequest;
import ${project.packageName}.${module.name?lower_case?replace("[^a-z0-9]","",'r')}.application.query.dto.${aggregate.name}Row;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Scope("prototype")
@Title("${aggregate.name}s")
public class ${aggregate.name}CrudOrchestrator extends Crud<
${aggregate.name}ViewModel,
${aggregate.name}ViewModel,
${aggregate.name}ViewModel,
NoFilters,
${aggregate.name}Row,
String
> {

final ${aggregate.name}CrudAdapter adapter;

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
}
