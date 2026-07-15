package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.editor;

import io.mateu.core.infra.declarative.orchestrators.OrchestrationResult;
import io.mateu.core.infra.declarative.orchestrators.editableview.EditableView;
import io.mateu.uidl.annotations.Route;
import io.mateu.uidl.interfaces.CrudAdapter;
import io.mateu.uidl.interfaces.HttpRequest;
import java.util.regex.Pattern;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

/**
 * The element's ficha as an {@link EditableView}: the graphical editor's double click opens it
 * inside the drawer — the read-only DETAIL first, with mateu's own Edit/Save/Cancel toggle
 * happening in place (embedded mediator). It is generic over every element type the editor
 * draws: the concrete view/editor come from the type's {@link CrudAdapter} (the same map the
 * drawer used), and save invokes the editor viewmodel's own {@code save(HttpRequest)} — the
 * same method the concept CRUDs route to.
 *
 * <p>The element reference travels in the initial route ({@code /element-ficha/&lt;type&gt;/&lt;id&gt;})
 * and survives the view↔edit navigation as orchestrator state.
 */
@Service
@Scope("prototype")
@Route("/element-ficha")
@RequiredArgsConstructor
public class ElementFichaView extends EditableView<Object, Object> {

    private static final Pattern REF = Pattern.compile("^/([^/?]+)/([^/?]+)");

    private final ApplicationContext context;

    /** The element on stage — public so mateu's State keeps them across edit/save/cancel. */
    public String elementType;
    public String elementId;

    /** The request in flight: readOnly() has no parameter, but probing the editor needs one. */
    private transient HttpRequest currentRequest;

    @Override
    protected OrchestrationResult resolveInternalRoute(String route, HttpRequest httpRequest) {
        // The first entry carries /<type>/<id>; later hops (/edit, /view) rely on State.
        // Depending on who dispatched, the route may still wear the component's own
        // prefix and the mediator markers — strip both before reading the reference.
        var clean = route == null ? "" : route;
        var q = clean.indexOf('?');
        if (q >= 0) clean = clean.substring(0, q);
        if (clean.startsWith("/element-ficha")) clean = clean.substring("/element-ficha".length());
        var m = REF.matcher(clean);
        if (m.find() && !"edit".equals(m.group(1)) && !"view".equals(m.group(1))) {
            elementType = m.group(1);
            elementId = m.group(2);
        }
        return super.resolveInternalRoute(clean, httpRequest);
    }

    /**
     * A bubbled action (save arrives from the edit form, wearing the FORM's state)
     * lands on a fresh prototype whose fields never rehydrated. The reference always
     * travels in the mediator's component route — recover it from there.
     */
    private void ensureRef(HttpRequest httpRequest) {
        if (elementType != null && elementId != null) return;
        var rq = httpRequest == null ? null : httpRequest.runActionRq();
        if (rq == null) return;
        // The mediator's component state ALWAYS carries the reference (it travels in
        // its initialData, like the _embeddedMediator marker) — routes may be empty
        // on bubbled actions such as save.
        var state = rq.componentState();
        if (state != null && state.get("elementType") != null && state.get("elementId") != null) {
            elementType = String.valueOf(state.get("elementType"));
            elementId = String.valueOf(state.get("elementId"));
            return;
        }
        for (var raw : new String[] {rq.serverSideComponentRoute(), rq.route(), rq.consumedRoute()}) {
            if (raw == null) continue;
            var i = raw.indexOf("/element-ficha/");
            if (i < 0) continue;
            var m = REF.matcher(raw.substring(i + "/element-ficha".length()));
            if (m.find()) {
                elementType = m.group(1);
                elementId = m.group(2);
                return;
            }
        }
    }

    @SuppressWarnings("rawtypes")
    private CrudAdapter adapter() {
        var adapterClass = elementType == null ? null : GraphicalEditorPage.ADAPTERS.get(elementType);
        if (adapterClass == null) {
            throw new IllegalArgumentException("Sin ficha para el tipo " + elementType);
        }
        return (CrudAdapter) context.getBean(adapterClass);
    }

    @Override
    @SuppressWarnings("unchecked")
    public Object view(HttpRequest httpRequest) {
        currentRequest = httpRequest;
        ensureRef(httpRequest);
        return adapter().getView(elementId, httpRequest);
    }

    @Override
    @SuppressWarnings("unchecked")
    public Object editor(HttpRequest httpRequest) {
        ensureRef(httpRequest);
        return adapter().getEditor(elementId, httpRequest);
    }

    /** No Edit button for types whose editor does not expose the standard save. */
    @Override
    public boolean readOnly() {
        try {
            var editorClass = adapter().getEditor(elementId, currentRequest).getClass();
            editorClass.getMethod("save", HttpRequest.class);
            return false;
        } catch (Exception e) {
            return true;
        }
    }

    @Override
    public void save(HttpRequest httpRequest) {
        ensureRef(httpRequest);
        try {
            // The edit form bubbles its state up as initiatorState, typed as the editor viewmodel;
            // its own save(HttpRequest) persists through the concept's use case, like in its CRUD.
            var editorClass = adapter().getEditor(elementId, httpRequest).getClass();
            var edited = httpRequest.getInitiatorState(editorClass);
            editorClass.getMethod("save", HttpRequest.class).invoke(edited, httpRequest);
        } catch (ReflectiveOperationException e) {
            throw new RuntimeException("No se pudo guardar " + elementType + " " + elementId, e);
        }
    }
}
