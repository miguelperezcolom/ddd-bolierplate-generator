package io.mateu.modux.modeldrivengenerator.domain.aggregates.role;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.role.vo.RoleId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.role.vo.RoleName;
import lombok.Getter;

import java.util.List;

@Getter
public class Role {

    private RoleId id;
    private RoleName name;
    private List<String> allowedUseCaseIds;

    public static Role of(RoleId id, RoleName name,
                          List<String> allowedUseCaseIds) {
        var role = new Role();
        role.id = id;
        role.name = name;
        role.allowedUseCaseIds = allowedUseCaseIds != null ? allowedUseCaseIds : List.of();
        return role;
    }

    public static Role load(String id, String name,
                            List<String> allowedUseCaseIds) {
        var role = new Role();
        role.id = new RoleId(id);
        role.name = new RoleName(name);
        role.allowedUseCaseIds = allowedUseCaseIds != null ? allowedUseCaseIds : List.of();
        return role;
    }

    public void update(RoleName name,
                       List<String> allowedUseCaseIds) {
        this.name = name;
        this.allowedUseCaseIds = allowedUseCaseIds != null ? allowedUseCaseIds : List.of();
    }
}
