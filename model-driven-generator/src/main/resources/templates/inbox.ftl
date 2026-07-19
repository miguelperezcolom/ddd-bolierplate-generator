package ${project.packageName}.${module.slug}.infra.out.inbox;

import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.LocalDateTime;

/**
 * Idempotent-consumer support (inbox pattern). Kafka delivery is at-least-once: retries,
 * rebalances and DLQ replays redeliver the SAME broker record, so the dedup key is its
 * topic+partition+offset — identical redeliveries share it and are skipped, while distinct
 * events (even with byte-identical payloads, like a state returning to a previous value)
 * always pass.
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

    /**
     * The dedup key: the broker coordinates (topic:partition:offset) when the kafka headers
     * are present, falling back to the payload hash otherwise (unit tests, other binders).
     */
    public static String dedupKey(org.springframework.messaging.Message<?> message) {
        var headers = message.getHeaders();
        var topic = headers.get("kafka_receivedTopic");
        var partition = headers.get("kafka_receivedPartitionId") != null
                ? headers.get("kafka_receivedPartitionId")
                : headers.get("kafka_receivedPartition");
        var offset = headers.get("kafka_offset");
        if (topic != null && partition != null && offset != null) {
            return hashOf(topic + ":" + partition + ":" + offset);
        }
        return hashOf(message.getPayload() == null ? "" : message.getPayload().toString());
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
