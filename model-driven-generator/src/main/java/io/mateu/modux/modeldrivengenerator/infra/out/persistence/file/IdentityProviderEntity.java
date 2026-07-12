package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.Set;

/**
 * An identity provider: WHO issues the identities the system trusts. Ours
 * (corporate, B2C) or federated — published by an external system (a partner's
 * IdP, social login). Apps declare which IdP they authenticate against, bounded
 * contexts which issuer's tokens they validate, and non-human subjects (ETL
 * flows, and later agents and triggers) which service identity they run as.
 */
@lombok.Builder(toBuilder = true)
public record IdentityProviderEntity(
        String id,
        String name,
        /** CORPORATE (employees), B2C (customers), SOCIAL, PARTNER. */
        String type,
        /** The issuer URI tokens carry (OIDC iss). */
        String issuer,
        /** Federation: the external system publishing this IdP; null = ours. */
        String publishedByExternalSystemId,
        String description
) implements Identifiable {

    public static final Set<String> TYPES = Set.of("CORPORATE", "B2C", "SOCIAL", "PARTNER");
}
