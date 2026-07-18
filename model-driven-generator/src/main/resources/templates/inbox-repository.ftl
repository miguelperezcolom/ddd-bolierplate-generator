package ${project.packageName}.${module.slug}.infra.out.inbox;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("${module.slug}InboxEntityRepository")
public interface InboxEntityRepository extends JpaRepository<InboxEntity, Long> {

    boolean existsBySubscriptionNameAndMessageHash(String subscriptionName, String messageHash);
}
