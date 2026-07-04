package io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo;

/**
 * How the system isolates tenants. Declared at project level so the generator can thread the
 * tenant dimension through everything it emits — schema (tenant column / schema / database),
 * topics, consumer groups, projections, caches and query filters. Retrofitting tenancy by hand
 * is one of the most painful enterprise migrations; declaring it up-front makes it a generation
 * concern.
 */
public enum TenancyStrategy {
    /** Single-tenant system — no tenant dimension. */
    NONE,
    /** All tenants share schema and tables; every table carries a tenant id column and every query filters by it. */
    SHARED_SCHEMA,
    /** One database schema per tenant, shared database server. */
    SCHEMA_PER_TENANT,
    /** Full database per tenant — strongest isolation, heaviest operations. */
    DATABASE_PER_TENANT
}
