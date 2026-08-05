package io.mateu.modux.modeldrivengenerator.domain.shared;

/**
 * The kind of data a field holds — as MATEU understands it.
 *
 * <p>This vocabulary is not modux's: it belongs to the framework the generated code runs on, and
 * modux only records which of its values a field was modelled with so the templates can emit it.
 * The constants therefore mirror {@code io.mateu.uidl.data.FieldDataType} exactly, and mirroring is
 * the whole contract — adding a value here that mateu does not know would generate code that does
 * not compile.
 *
 * <p>Same arrangement as EventConductor's step vocabulary (see
 * {@code resources/eventconductor/}): the owner of the meaning is somebody else, so what modux
 * keeps is a copy that says so. The copy is what keeps modux buildable without mateu on the
 * classpath, which is the point.
 */
public enum FieldDataType {
    integer,
    string,
    number,
    date,
    time,
    dateTime,
    bool,
    array,
    file,
    status,
    money,
    component,
    menu,
    range,
    action,
    actionGroup,
    dateRange
}
