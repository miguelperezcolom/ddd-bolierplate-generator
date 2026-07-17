package ${project.packageName}.${module.slug}.infra.out.inbox;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/** A consumed message (inbox pattern): the dedup record behind at-least-once delivery. */
@Entity
@Table(name = "modux_inbox")
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class InboxEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "modux_inbox_seq_gen")
    @SequenceGenerator(
            name = "modux_inbox_seq_gen",
            sequenceName = "modux_inbox_sequence",
            allocationSize = 1)
    private Long id;

    @Column(name = "subscription_name")
    private String subscriptionName;

    @Column(name = "message_hash")
    private String messageHash;

    @Column(name = "processed_at")
    private LocalDateTime processedAt;
}
