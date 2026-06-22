package ${project.packageName}.${module.slug}.application.usecases.${aggregate.name?lower_case}.delete;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import ${project.packageName}.${module.slug}.application.out.${aggregate.name}Repository;
import ${project.packageName}.${module.slug}.domain.aggregates.${aggregate.name?lower_case}.vo.${aggregate.name}Id;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class Delete${aggregate.name}UseCaseTest {

    @Mock
    ${aggregate.name}Repository repository;

    @InjectMocks
    Delete${aggregate.name}UseCase useCase;

    @Test
    void should_delete_by_id() {
        var command = new Delete${aggregate.name}Command(java.util.List.of());
        useCase.handle(command);
        verify(repository).deleteAllById(any());
    }
}
