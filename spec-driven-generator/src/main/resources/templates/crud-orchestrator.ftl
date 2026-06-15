package ${project.packageName}.${module.name?lower_case?replace("[^a-z0-9]","",'r')}.infra.in.ui.pages.${aggregate.name?lower_case};

import io.mateu.core.infra.declarative.orchestrators.crud.CrudOrchestrator;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.data.NoFilters;
import io.mateu.uidl.interfaces.CrudAdapter;
import ${project.packageName}.${module.name?lower_case?replace("[^a-z0-9]","",'r')}.application.query.dto.${aggregate.name}Row;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Scope("prototype")
@Title("${aggregate.name}s")
public class ${aggregate.name}CrudOrchestrator extends CrudOrchestrator<
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
${aggregate.name}ViewModel, ${aggregate.name}ViewModel,
NoFilters, ${aggregate.name}Row, String> adapter() {
return adapter;
}

@Override
public String toId(String s) {
return s;
}
}
