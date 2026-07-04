package io.mateu.modux.modeldrivengenerator.application.out.repositories;

import io.mateu.modux.modeldrivengenerator.application.out.shared.Repository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.process.Process;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.process.vo.ProcessId;

public interface ProcessRepository extends Repository<Process, ProcessId> {
}
