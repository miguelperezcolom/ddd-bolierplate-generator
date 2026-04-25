package ${project.packageName}.infra.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ${aggregate.name}EntityRepository extends JpaRepository<${aggregate.name}Entity, Long> {
}
