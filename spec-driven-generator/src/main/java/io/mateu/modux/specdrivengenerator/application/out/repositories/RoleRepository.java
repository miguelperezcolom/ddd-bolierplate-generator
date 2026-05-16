package io.mateu.modux.specdrivengenerator.application.out.repositories;

import io.mateu.modux.specdrivengenerator.application.out.shared.Repository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.role.Role;
import io.mateu.modux.specdrivengenerator.domain.aggregates.role.vo.RoleId;

public interface RoleRepository extends Repository<Role, RoleId> {
}
