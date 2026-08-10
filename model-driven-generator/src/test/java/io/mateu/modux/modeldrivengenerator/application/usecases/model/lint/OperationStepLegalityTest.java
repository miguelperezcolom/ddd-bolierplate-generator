package io.mateu.modux.modeldrivengenerator.application.usecases.model.lint;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.mateu.modux.modeldrivengenerator.application.usecases.model.CatalogReflection;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import java.util.List;
import org.junit.jupiter.api.Test;

/**
 * Phase 2 of {@code docs/design/operation-body.md}: the {@code operation-step-illegal-for-carrier}
 * lint enforces the §3 purity table, and referential integrity of the (possibly nested) operation
 * steps is covered for free by the shared reflection walk.
 */
class OperationStepLegalityTest {

    final ObjectMapper json = new ObjectMapper();

    private static String aggregateJson(String stepsJson) {
        return "{\"id\":\"a1\",\"name\":\"Booking\",\"operations\":["
                + "{\"id\":\"op1\",\"name\":\"confirm\",\"steps\":" + stepsJson + "}]}";
    }

    private static String domainServiceJson(String stepsJson) {
        return "{\"id\":\"ds1\",\"name\":\"Pricing\",\"operations\":["
                + "{\"id\":\"op1\",\"name\":\"reprice\",\"steps\":" + stepsJson + "}]}";
    }

    /** Build a snapshot from partial JSON — absent sections stay null, so arity never bites. */
    private ModelSnapshot snapshot(String section, String elementJson) throws Exception {
        return json.readValue("{\"" + section + "\":[" + elementJson + "]}", ModelSnapshot.class);
    }

    private List<LintFinding> lintAggregate(String stepsJson) throws Exception {
        return new LintRules.OperationStepIllegalForCarrier()
                .apply(snapshot("aggregates", aggregateJson(stepsJson)));
    }

    private List<LintFinding> lintDomainService(String stepsJson) throws Exception {
        return new LintRules.OperationStepIllegalForCarrier()
                .apply(snapshot("domainServices", domainServiceJson(stepsJson)));
    }

    @Test
    void aggregate_may_not_call_a_gateway() throws Exception {
        var findings = lintAggregate("[{\"id\":\"s1\",\"name\":\"charge\",\"type\":\"CallGateway\"}]");

        assertEquals(1, findings.size(), findings.toString());
        assertEquals(LintSeverity.ERROR, findings.get(0).severity());
        assertEquals("s1", findings.get(0).elementId());
        assertTrue(findings.get(0).message().contains("CallGateway"));
    }

    @Test
    void aggregate_pure_body_is_clean() throws Exception {
        var findings = lintAggregate("["
                + "{\"id\":\"s1\",\"name\":\"guard\",\"type\":\"CheckPrecondition\"},"
                + "{\"id\":\"s2\",\"name\":\"set\",\"type\":\"SetField\"},"
                + "{\"id\":\"s3\",\"name\":\"emit\",\"type\":\"PublishDomainEvent\"}]");

        assertTrue(findings.isEmpty(), findings.toString());
    }

    @Test
    void domain_service_may_not_set_a_field() throws Exception {
        var findings = lintDomainService("[{\"id\":\"s1\",\"name\":\"mutate\",\"type\":\"SetField\"}]");

        assertEquals(1, findings.size(), findings.toString());
        assertTrue(findings.get(0).message().contains("SetField"));
        assertTrue(findings.get(0).message().contains("domain service"));
    }

    @Test
    void illegal_step_buried_in_an_if_else_is_caught() throws Exception {
        // control flow is legal everywhere, but an aggregate's else branch may not call a gateway
        var findings = lintAggregate("[{\"id\":\"if1\",\"name\":\"check\",\"type\":\"If\","
                + "\"then\":[{\"id\":\"s1\",\"name\":\"emit\",\"type\":\"PublishDomainEvent\"}],"
                + "\"else\":[{\"id\":\"s2\",\"name\":\"callGw\",\"type\":\"CallGateway\"}]}]");

        assertEquals(1, findings.size(), findings.toString());
        assertEquals("s2", findings.get(0).elementId());
    }

    @Test
    void step_references_are_reachable_by_the_integrity_walk() throws Exception {
        // a dangling domainEventId nested in a step must be visible to referential integrity
        var a = json.readValue(aggregateJson(
                "[{\"id\":\"s1\",\"name\":\"emit\",\"type\":\"PublishDomainEvent\","
                        + "\"domainEventId\":\"ev-ghost\"}]"), AggregateEntity.class);

        var refs = CatalogReflection.references(a);

        assertTrue(refs.stream().anyMatch(r -> r.id().equals("ev-ghost")),
                "nested operation-step reference must be reachable: " + refs);
    }
}
