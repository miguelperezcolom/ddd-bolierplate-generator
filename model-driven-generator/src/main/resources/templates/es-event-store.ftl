package ${project.packageName}.${module.name?lower_case?replace("[^a-z0-9]","",'r')}.infra.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/** Spring Data access to the ${aggregate.name} event log, ordered by sequence. */
public interface ${aggregate.name}EventStore extends JpaRepository<${aggregate.name}EventEntity, Long> {

    List<${aggregate.name}EventEntity> findByAggregateIdOrderBySequenceNumberAsc(String aggregateId);
}
