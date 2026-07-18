-- Aggregate retrieval stored procedures (GENERATED — reapplied on change).
-- One function per aggregate with dataAccess=STORED_PROCEDURE: returns the aggregate's
-- row as a jsonb document keyed by entity field names (the DBRepository falls back to a
-- plain select when the function is absent, e.g. local H2). Tune at will (indexes,
-- security definer): CREATE OR REPLACE survives every re-application.
<#list procs as p>
<#assign safeFields = p.fields?filter(f -> f.name != "id")>
CREATE OR REPLACE FUNCTION ${p.name?lower_case}_get(p_id bigint) RETURNS jsonb
LANGUAGE sql STABLE AS $$
  SELECT to_jsonb(t) FROM (
    SELECT id AS "id"<#list safeFields as f>, ${f.columnName} AS "${f.name}"</#list>
    FROM ${p.tableName}
    WHERE id = p_id
  ) t;
$$;

</#list>
