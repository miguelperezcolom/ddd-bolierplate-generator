package ${project.packageName}.${module.slug}.infra.in.async;

import ${project.packageName}.${module.slug}.application.usecases.${usecase.name?lower_case?replace("[^a-z0-9]","",'r')}.${usecase.name?cap_first}Command;
import ${project.packageName}.${module.slug}.application.usecases.${usecase.name?lower_case?replace("[^a-z0-9]","",'r')}.${usecase.name?cap_first}UseCase;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import java.util.function.Consumer;

@Configuration
@RequiredArgsConstructor
public class ${usecase.name?cap_first}Consumer {

    final ${usecase.name?cap_first}UseCase useCase;
    final ObjectMapper objectMapper;

    @Bean
    public Consumer<Message<String>> ${usecase.name?uncap_first?replace("[^a-zA-Z0-9]","",'r')}() {
        return message -> {
            var command = deserialize(message.getPayload());
            useCase.handle(command);
        };
    }

    @SneakyThrows
    private ${usecase.name?cap_first}Command deserialize(String payload) {
        return objectMapper.readValue(payload, ${usecase.name?cap_first}Command.class);
    }

}
