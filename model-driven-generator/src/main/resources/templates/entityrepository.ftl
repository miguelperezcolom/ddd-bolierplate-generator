package ${project.packageName}.${module.name?lower_case?replace("[^a-z0-9]","",'r')}.infra.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ${aggregate.name}EntityRepository extends JpaRepository<${aggregate.name}Entity, Long> {
}
