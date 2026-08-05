package io.mateu.modux.modeldrivengenerator.domain.shared;

/**
 * How a field is meant to be rendered — as MATEU understands it.
 *
 * <p>Like {@link FieldDataType}, this vocabulary belongs to the framework the generated code runs
 * on, not to modux. modux records the choice; mateu's renderer is what gives it meaning. The
 * constants mirror {@code io.mateu.uidl.data.FieldStereotype} exactly and must keep mirroring it:
 * a value modux invented would generate code that does not compile, and a value modux dropped
 * would make a perfectly good model unreadable.
 *
 * <p>The rendering prose that documents each constant lives in mateu, where the renderer is. Here
 * they are just the names, because a name is all modux stores.
 */
public enum FieldStereotype {
    regular,
    radio,
    checkbox,
    textarea,
    toggle,
    combobox,
    select,
    email,
    password,
    richText,
    listBox,
    html,
    markdown,
    image,
    uploadableImage,
    fileUpload,
    icon,
    link,
    money,
    grid,
    color,
    choice,
    popover,
    slider,
    button,
    stars,
    searchable,
    badge,
    plainText,
    bulletedList,
    dateRange,
    numberRange,
    treeSelect,
    signature,
    camera,
    multiSelect
}
