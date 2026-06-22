package ${project.packageName}.${module.slug}.application.usecases.${aggregate.name?lower_case}.create;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import ${project.packageName}.${module.slug}.application.out.${aggregate.name}Repository;
import ${project.packageName}.${module.slug}.domain.aggregates.${aggregate.name?lower_case}.${aggregate.name};
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class Create${aggregate.name}UseCaseTest {

    @Mock
    ${aggregate.name}Repository repository;

    @InjectMocks
    Create${aggregate.name}UseCase useCase;

    @Test
    void should_create_and_persist() {
        var command = new Create${aggregate.name}Command(/* TODO: fill constructor args */);
        useCase.handle(command);
        verify(repository).save(any(${aggregate.name}.class));
    }
}
