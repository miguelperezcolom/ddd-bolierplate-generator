package io.mateu.modux.modeldrivengenerator.application.usecases.project.generatecode;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiComponentNodeEntity;
import java.util.ArrayList;
import java.util.List;
import java.util.SortedSet;
import java.util.TreeSet;

/**
 * Turns a page's designed component tree into the Java expression a generated
 * {@code ComponentTreeSupplier} page returns: every designer kind maps to its Mateu
 * UIDL builder, with the same sample content the designer mocks up, so the deployed
 * page looks like the design. Data-bound kinds (form, listing, crud, field) still
 * come out as an EmptyState placeholder — wiring them to models and queries is the
 * next step.
 */
public final class ComponentTreeJava {

    public record Tree(String expression, SortedSet<String> imports) {}

    public static Tree of(List<UiComponentNodeEntity> content) {
        var b = new ComponentTreeJava();
        var expr = content.size() == 1 ? b.expr(content.get(0)) : b.vertical(content);
        return new Tree(expr, b.imports);
    }

    private final SortedSet<String> imports = new TreeSet<>();

    private ComponentTreeJava() {}

    private String expr(UiComponentNodeEntity n) {
        var kids = n.children() == null ? List.<UiComponentNodeEntity>of() : n.children();
        return switch (n.kind()) {
            // ---- containers ----
            case "verticalLayout", "app", "appLayout", "tab" -> vertical(kids);
            case "section" -> use("VerticalLayout") + ".builder().spacing(true).content(" +
                    listOf(prepend(text(or(n.title(), "Sección"), "h4"), kids)) + ").build()";
            case "horizontalLayout" -> use("HorizontalLayout") + ".builder().spacing(true).content(" + listOf(map(kids)) + ").build()";
            case "zones" -> use("HorizontalLayout") + ".builder().spacing(true).fullWidth(true).content(" + listOf(map(kids)) + ").build()";
            case "formLayout" -> use("FormLayout") + ".builder().autoResponsive(true).content(" + listOf(map(kids)) + ").build()";
            case "gridLayout" -> use("DashboardLayout") + ".builder().columns(3).items(" + listOf(map(kids)) + ").build()";
            case "dashboardLayout" -> use("DashboardLayout") + ".builder().items(" + listOf(map(kids)) + ").build()";
            case "splitLayout" -> use("SplitLayout") + ".builder().master(" + vertical(kids.subList(0, (kids.size() + 1) / 2)) +
                    ").detail(" + vertical(kids.subList((kids.size() + 1) / 2, kids.size())) + ").build()";
            case "masterDetailLayout" -> use("MasterDetailLayout") + ".builder().master(" +
                    (kids.isEmpty() ? vertical(List.of()) : expr(kids.get(0))) +
                    ").detail(" + vertical(kids.isEmpty() ? kids : kids.subList(1, kids.size())) + ").build()";
            case "tabLayout" -> {
                var tabs = new ArrayList<String>();
                var i = 0;
                for (var t : kids) {
                    if (!"tab".equals(t.kind())) continue;
                    tabs.add(use("Tab") + ".builder().label(" + q(or(t.title(), "Pestaña " + (tabs.size() + 1))) +
                            ").content(" + expr(t) + ").active(" + (i++ == 0) + ").build()");
                }
                yield use("TabLayout") + ".builder().tabs(" + listOf(tabs) + ").build()";
            }
            case "accordionLayout" -> {
                var panels = new ArrayList<String>();
                for (var c : kids) {
                    panels.add(use("AccordionPanel") + ".builder().label(" + q(or(c.title(), or(c.label(), "Sección " + (panels.size() + 1)))) +
                            ").content(" + expr(c) + ").active(" + panels.isEmpty() + ").build()");
                }
                yield use("AccordionLayout") + ".builder().panels(" + listOf(panels) + ").build()";
            }
            case "card" -> use("Card") + ".builder()" +
                    (n.title() != null && !n.title().isBlank() ? ".title(" + text(n.title(), "h5") + ")" : "") +
                    ".content(" + vertical(kids) + ").build()";
            case "boardLayout" -> use("BoardLayout") + ".builder().rows(" + listOf(List.of(
                    "BoardLayoutRow.builder().content(" + listOf(map(kids)) + ").build()")) + ").build()"
                    + hidden(use("BoardLayoutRow"));
            case "foldoutLayout" -> {
                var panels = new ArrayList<String>();
                for (var c : kids) {
                    panels.add(use("FoldoutPanel") + ".builder().title(" + q(or(c.title(), or(c.label(), "Panel " + (panels.size() + 1)))) +
                            ").content(" + expr(c) + ").open(" + panels.isEmpty() + ").build()");
                }
                yield use("FoldoutLayout") + ".builder().panels(" + listOf(panels) + ").build()";
            }
            case "carouselLayout" -> use("CarouselLayout") + ".builder().content(" + listOf(map(kids)) + ").dots(true).nav(true).build()";
            case "hero" -> use("HeroSection") + ".builder().title(" + q(or(n.title(), "Un titular que vende")) +
                    ").subtitle(" + q(or(n.text(), "El subtítulo que lo explica")) + ").centered(true)" +
                    (kids.isEmpty() ? "" : ".content(" + listOf(map(kids)) + ")") + ".build()";
            case "pageHeader" -> use("HorizontalLayout") + ".builder().spacing(true).content(" +
                    listOf(prepend(text(or(n.title(), "Título de la página"), "h3"), kids)) + ").build()";
            case "toolbar" -> use("HorizontalLayout") + ".builder().spacing(true).content(" +
                    (kids.isEmpty() ? listOf(List.of(button("Acción"))) : listOf(map(kids))) + ").build()";
            case "scoreboard" -> {
                var metrics = new ArrayList<String>();
                for (var c : kids) {
                    if ("kpi".equals(c.kind()) || "stat".equals(c.kind()) || "metricCard".equals(c.kind())) {
                        metrics.add(metricCard(or(c.title(), "KPI")));
                    }
                }
                if (metrics.isEmpty()) {
                    metrics.add(metricCard("KPI"));
                    metrics.add(metricCard("Otro KPI"));
                    metrics.add(metricCard("Un tercero"));
                }
                yield use("Scoreboard") + ".builder().metrics(" + listOf(metrics) + ").build()";
            }
            case "wizard" -> use("VerticalLayout") + ".builder().spacing(true).content(" +
                    listOf(prepend(progressSteps(kids), kids)) + ").build()";
            // ---- display leaves, with the designer's sample content ----
            case "text" -> use("Text") + ".builder().text(" + q(or(n.text(), "Lorem ipsum dolor sit amet, consectetur adipiscing elit.")) + ").build()";
            case "notice" -> use("Notice") + ".builder().text(" + q(or(n.text(), "Un aviso para el usuario")) + ").build()";
            case "banner" -> use("Notice") + ".builder().text(" + q(or(n.text(), or(n.title(), "Banner destacado"))) + ").theme(\"warning\").fullWidth(true).build()";
            case "calloutCard" -> use("CalloutCard") + ".builder().icon(\"💡\").title(" + q(or(n.title(), "Callout")) +
                    ").description(" + q(or(n.text(), "Algo que merece atención especial.")) + ").build()";
            case "bulletedList" -> use("BulletedList") + ".builder().items(List.of(\"Primer punto\", \"Segundo punto\", \"Tercer punto\")).build()" + hidden(useList());
            case "statusList" -> use("StatusList") + ".builder().items(" + listOf(List.of(
                    statusItem("Operativo", "OK"), statusItem("Degradado", "Aviso"), statusItem("Caído", "Error"))) + ").build()";
            case "checklist" -> use("Checklist") + ".builder()" +
                    (n.title() != null && !n.title().isBlank() ? ".title(" + q(n.title()) + ")" : "") + ".items(" + listOf(List.of(
                    checklistItem("Hecho", true), checklistItem("También hecho", true), checklistItem("Pendiente", false))) + ").build()";
            case "fileList" -> use("FileList") + ".builder().files(" + listOf(List.of(
                    use("FileItem") + ".builder().name(\"contrato.pdf\").size(\"1,2 MB\").build()",
                    "FileItem.builder().name(\"foto.png\").size(\"340 KB\").build()")) + ").build()";
            case "separator" -> use("Separator") + ".builder().build()";
            case "entityHeader" -> use("EntityHeader") + ".builder().title(" + q(or(n.title(), "Entidad")) +
                    ").subtitle(" + q(or(n.text(), "metadatos · estado")) + ").build()";
            case "emptyState" -> use("EmptyState") + ".builder().icon(\"🗇\").title(" + q(or(n.title(), or(n.text(), "Nada por aquí todavía"))) + ").build()";
            case "skeleton" -> use("Skeleton") + ".builder().variant(" + use("SkeletonVariant") + ".text).count(3).build()";
            case "progressBar" -> use("ProgressBar") + ".builder().max(100).value(40).build()";
            case "meter" -> use("Meter") + ".builder().label(" + q(or(n.title(), "Medidor")) + ").value(72.0).max(100.0).build()";
            case "taskProgress" -> use("TaskProgress") + ".builder().label(" + q(or(n.title(), "Tareas")) + ").total(5).done(3).build()";
            case "progressSteps" -> progressSteps(List.of());
            case "timeline" -> use("Timeline") + ".builder().items(" + listOf(List.of(
                    timelineItem("t1", "Creado", "hace 2 días"), timelineItem("t2", "Aprobado", "ayer"), timelineItem("t3", "Enviado", "hoy"))) + ").build()";
            case "calendar" -> use("Calendar") + ".builder().month(" + useLocalDate() + ".now().withDayOfMonth(1)).events(" + listOf(List.of(
                    use("CalendarEvent") + ".builder().id(\"e1\").title(" + q(or(n.title(), "Evento")) + ").date(LocalDate.now()).build()")) + ").build()";
            case "kanban" -> use("Kanban") + ".builder().columns(" + listOf(List.of(
                    kanbanColumn("todo", "Por hacer", 2), kanbanColumn("doing", "En curso", 1), kanbanColumn("done", "Hecho", 1))) + ").build()";
            case "gantt" -> use("Gantt") + ".builder().tasks(" + listOf(List.of(
                    ganttTask("g1", "Análisis", 0, 7, 1.0), ganttTask("g2", "Diseño", 5, 14, 0.5), ganttTask("g3", "Construcción", 12, 24, 0.1))) + ").build()";
            case "trendChart" -> use("TrendChart") + ".builder()" +
                    (n.title() != null && !n.title().isBlank() ? ".title(" + q(n.title()) + ")" : "") +
                    ".values(List.of(3.0, 5.0, 4.0, 8.0, 7.0, 10.0)).labels(List.of(\"L\", \"M\", \"X\", \"J\", \"V\", \"S\")).build()" + hidden(useList());
            case "heatmap" -> {
                var cells = new ArrayList<String>();
                var sample = new double[]{3, 6, 2, 8, 5, 1, 7};
                for (var i = 0; i < sample.length; i++) {
                    cells.add(use("HeatCell") + ".builder().date(" + useLocalDate() + ".now().minusDays(" + (sample.length - 1 - i) + ")).value(" + sample[i] + ").build()");
                }
                yield use("Heatmap") + ".builder().cells(" + listOf(cells) + ").build()";
            }
            case "funnel" -> use("Funnel") + ".builder().stages(" + listOf(List.of(
                    funnelStage("Visitas", 100), funnelStage("Interesados", 70), funnelStage("Ofertas", 45), funnelStage("Cierres", 25))) + ").build()";
            case "orgChart" -> use("OrgChart") + ".builder().root(" + use("OrgNode") + ".builder().id(\"root\").title(" + q(or(n.title(), "Dirección")) +
                    ").children(" + listOf(List.of(orgNode("a", "Área A"), orgNode("b", "Área B"))) + ").build()).build()";
            case "featureGrid" -> use("FeatureGrid") + ".builder().columns(3).features(" + listOf(List.of(
                    feature("⚡", "Rápido"), feature("🔒", "Seguro"), feature("🧩", "Modular"))) + ").build()";
            case "testimonials" -> use("Testimonials") + ".builder().items(" + listOf(List.of(
                    use("Testimonial") + ".builder().quote(" + q(or(n.text(), "Nos cambió la forma de trabajar.")) + ").author(\"Cliente contento\").build()")) + ").build()";
            case "faq" -> use("Faq") + ".builder().items(" + listOf(List.of(
                    faqItem("¿Cómo empiezo?", "Creando tu primer proyecto."), faqItem("¿Cuánto cuesta?", "Depende del plan."))) + ").build()";
            case "commentThread" -> use("CommentThread") + ".builder().comments(" + listOf(List.of(
                    comment("c1", "Ana", "Esto está casi listo"), comment("c2", "Luis", "Le doy un repaso y cierro"))) + ").build()";
            case "comparisonCard" -> use("ComparisonCard") + ".builder().title(" + q(or(n.title(), "Comparativa")) +
                    ").leftLabel(\"Básico\").leftValue(\"✓\").rightLabel(\"Pro\").rightValue(\"✓✓\").build()";
            case "kpi", "metricCard" -> metricCard(or(n.title(), "kpi".equals(n.kind()) ? "KPI" : "Métrica"));
            case "stat" -> use("Stat") + ".builder().label(" + q(or(n.title(), "Estadística")) + ").value(\"1.234\").build()";
            // ---- interaction leaves ----
            case "button" -> button(or(n.label(), "Botón"));
            case "fab" -> use("Button") + ".builder().label(\"+\").style(\"border-radius:50%;width:48px;height:48px;font-size:20px\").build()";
            case "filterBar" -> use("HorizontalLayout") + ".builder().spacing(true).content(" +
                    listOf(List.of(button("Estado ▾"), button("Fecha ▾"), button("Tipo ▾"))) + ").build()";
            case "menuBar" -> use("HorizontalLayout") + ".builder().spacing(true).content(" +
                    listOf(List.of(button("Inicio"), button("Opciones"))) + ").build()";
            case "appContext" -> button(or(n.label(), "Contexto ▾"));
            // ---- data-bound leaves: honest placeholders until they wire to the model ----
            case "form", "listing", "crud", "field" -> use("EmptyState") + ".builder().icon(\"🧩\").title(" +
                    q(or(n.label(), or(n.title(), n.kind()))) +
                    ").description(" + q("Componente «" + n.kind() + "» pendiente de cablear a datos") + ").build()";
            default -> use("Text") + ".builder().text(" + q("[" + n.kind() + "]") + ").build()";
        };
    }

    // ---- shared fragments ----

    private String vertical(List<UiComponentNodeEntity> items) {
        return use("VerticalLayout") + ".builder().spacing(true).content(" + listOf(map(items)) + ").build()";
    }

    private String text(String value, String container) {
        return use("Text") + ".builder().text(" + q(value) + ").container(" + use("TextContainer") + "." + container + ").build()";
    }

    private String button(String label) {
        return use("Button") + ".builder().label(" + q(label) + ").build()";
    }

    private String metricCard(String title) {
        return use("MetricCard") + ".builder().title(" + q(title) + ").value(\"1.234\").build()";
    }

    private String progressSteps(List<UiComponentNodeEntity> kids) {
        var steps = new ArrayList<String>();
        var titles = kids.stream().map(c -> or(c.title(), or(c.label(), null))).filter(t -> t != null).toList();
        if (titles.isEmpty()) titles = List.of("Paso 1", "Paso 2", "Paso 3");
        for (var i = 0; i < titles.size(); i++) {
            var status = i == 0 ? "done" : i == 1 ? "current" : "upcoming";
            steps.add(use("Step") + ".builder().id(\"s" + (i + 1) + "\").title(" + q(titles.get(i)) + ").status(\"" + status + "\").build()");
        }
        return use("ProgressSteps") + ".builder().steps(" + listOf(steps) + ").build()";
    }

    private String statusItem(String title, String status) {
        return use("StatusItem") + ".builder().title(" + q(title) + ").status(" + q(status) + ").build()";
    }

    private String checklistItem(String label, boolean done) {
        return use("ChecklistItem") + ".builder().label(" + q(label) + ").done(" + done + ").build()";
    }

    private String timelineItem(String id, String title, String timestamp) {
        return use("TimelineItem") + ".builder().id(\"" + id + "\").title(" + q(title) + ").timestamp(" + q(timestamp) + ").build()";
    }

    private String kanbanColumn(String id, String title, int cards) {
        var cardExprs = new ArrayList<String>();
        for (var i = 1; i <= cards; i++) {
            cardExprs.add(use("KanbanCard") + ".builder().id(\"" + id + i + "\").title(\"Tarjeta " + i + "\").build()");
        }
        return use("KanbanColumn") + ".builder().id(\"" + id + "\").title(" + q(title) + ").cards(" + listOf(cardExprs) + ").build()";
    }

    private String ganttTask(String id, String title, int fromDays, int toDays, double progress) {
        return use("GanttTask") + ".builder().id(\"" + id + "\").title(" + q(title) + ").start(" + useLocalDate() + ".now().plusDays(" + fromDays +
                ")).end(LocalDate.now().plusDays(" + toDays + ")).progress(" + progress + ").build()";
    }

    private String funnelStage(String label, double value) {
        return use("FunnelStage") + ".builder().label(" + q(label) + ").value(" + value + ").build()";
    }

    private String orgNode(String id, String title) {
        return use("OrgNode") + ".builder().id(\"" + id + "\").title(" + q(title) + ").build()";
    }

    private String feature(String icon, String title) {
        return use("Feature") + ".builder().icon(" + q(icon) + ").title(" + q(title) + ").build()";
    }

    private String faqItem(String question, String answer) {
        return use("FaqItem") + ".builder().question(" + q(question) + ").answer(" + q(answer) + ").build()";
    }

    private String comment(String id, String author, String textValue) {
        return use("Comment") + ".builder().id(\"" + id + "\").author(" + q(author) + ").text(" + q(textValue) + ").build()";
    }

    // ---- plumbing ----

    private List<String> map(List<UiComponentNodeEntity> items) {
        return items.stream().map(this::expr).toList();
    }

    private List<String> prepend(String first, List<UiComponentNodeEntity> rest) {
        var out = new ArrayList<String>();
        out.add(first);
        out.addAll(map(rest));
        return out;
    }

    private String listOf(List<String> exprs) {
        useList();
        return exprs.isEmpty() ? "List.of()" : "List.of(\n                " + String.join(",\n                ", exprs) + ")";
    }

    private String use(String cls) {
        imports.add("io.mateu.uidl.data." + cls);
        return cls;
    }

    private String useList() {
        imports.add("java.util.List");
        return "";
    }

    private String useLocalDate() {
        imports.add("java.time.LocalDate");
        return "LocalDate";
    }

    /** Registers an import for a class referenced inside an already-built fragment. */
    private String hidden(String ignored) {
        return "";
    }

    private static String or(String v, String fallback) {
        return v != null && !v.isBlank() ? v : fallback;
    }

    private static String q(String s) {
        return '"' + s.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n") + '"';
    }
}
