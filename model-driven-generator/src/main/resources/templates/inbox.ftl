package ${project.packageName}.${module.slug}.infra.out.inbox;

import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.LocalDateTime;

/**
 * Idempotent-consumer support (inbox pattern). Kafka delivery is at-least-once: retries,
 * rebalances and DLQ replays redeliver the SAME payload, so the dedup key is the hash of the
 * message itself — identical redeliveries are skipped, distinct events always pass.
 */
@Service("${module.slug}Inbox")
@RequiredArgsConstructor
public class Inbox {

    private final InboxEntityRepository repository;

    public boolean alreadyProcessed(String subscription, String messageHash) {
        return repository.existsBySubscriptionNameAndMessageHash(subscription, messageHash);
    }

    /** Record AFTER the side effects succeed; a crash before this lets the message reprocess. */
    public void markProcessed(String subscription, String messageHash) {
        try {
            repository.save(new InboxEntity(null, subscription, messageHash, LocalDateTime.now()));
        } catch (DataIntegrityViolationException e) {
            // a concurrent consumer recorded it first — same outcome
        }
    }

    public static String hashOf(String payload) {
        try {
            var digest = MessageDigest.getInstance("SHA-256")
                    .digest(payload.getBytes(StandardCharsets.UTF_8));
            var hex = new StringBuilder();
            for (var b : digest) {
                hex.append(String.format("%02x", b));
            }
            return hex.toString();
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
    }
}
