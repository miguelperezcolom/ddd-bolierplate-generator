package io.mateu.mdd.specdrivengenerator.application.out.repositories;

import io.mateu.mdd.specdrivengenerator.application.out.shared.Repository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.role.Role;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.role.vo.RoleId;

public interface RoleRepository extends Repository<Role, RoleId> {
}
