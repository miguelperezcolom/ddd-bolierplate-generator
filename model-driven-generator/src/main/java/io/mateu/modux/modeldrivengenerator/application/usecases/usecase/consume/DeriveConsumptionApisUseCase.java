package io.mateu.modux.modeldrivengenerator.application.usecases.usecase.consume;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.QueryServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * Applies {@link ConsumptionApiDerivation} to the loaded model: every cross-service consumption
 * gets its provider exposed as a gRPC API (in-process consumptions are left alone). Idempotent.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class DeriveConsumptionApisUseCase {

    final CommonFileRepository repository;

    public String handle() {
        var result = ConsumptionApiDerivation.derive(
                repository.findAllOfType(UseCaseEntity.class),
                repository.findAllOfType(QueryServiceEntity.class),
                repository.findAllOfType(ModuleEntity.class),
                repository.findAllOfType(ServiceEntity.class));

        result.useCasesToExpose().forEach(repository::save);
        result.queryServicesToExpose().forEach(repository::save);

        var summary = result.crossServiceCalls() + " consumos cruzan servicio ("
                + result.useCasesToExpose().size() + " use cases y "
                + result.queryServicesToExpose().size() + " query services expuestos como gRPC); "
                + result.inProcessCalls() + " consumos quedan in-process (interfaz).";
        log.info("Consumption→API derivation: {}", summary);
        return summary;
    }
}
