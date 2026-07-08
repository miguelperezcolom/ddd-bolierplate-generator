package io.mateu.modux.modeldrivengenerator.infra.in.ui;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.mateu.modux.modeldrivengenerator.application.out.ProjectStorePort;
import io.mateu.modux.modeldrivengenerator.application.usecases.repository.open.OpenRepositoryUseCase;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.ByteArrayInputStream;
import java.io.IOException;

/**
 * Bridges the app-context repository selector to the working store: the selection
 * travels in appState with every mateu request, so whenever it differs from the
 * repository that is open, the store switches BEFORE the request is handled — the
 * screen that reloads after a context change already sees the new project.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class RepositoryContextSwitchFilter extends OncePerRequestFilter {

    final OpenRepositoryUseCase openUseCase;
    final ProjectStorePort projectStore;
    private final ObjectMapper json = new ObjectMapper();

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return !(request.getRequestURI().startsWith("/mateu/") && "POST".equals(request.getMethod()));
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {
        var body = request.getInputStream().readAllBytes();
        try {
            var appState = json.readTree(body).path("appState");
            var selected = appState.path("repository").asText(null);
            if (selected != null && !selected.isBlank()
                    && !selected.equals(projectStore.currentRepositoryId().orElse(null))) {
                openUseCase.handle(selected);
            }
        } catch (RuntimeException | IOException e) {
            log.debug("app-context no procesable en {}: {}", request.getRequestURI(), e.getMessage());
        }
        chain.doFilter(new HttpServletRequestWrapper(request) {
            @Override
            public jakarta.servlet.ServletInputStream getInputStream() {
                var buffer = new ByteArrayInputStream(body);
                return new jakarta.servlet.ServletInputStream() {
                    @Override public int read() { return buffer.read(); }
                    @Override public boolean isFinished() { return buffer.available() == 0; }
                    @Override public boolean isReady() { return true; }
                    @Override public void setReadListener(jakarta.servlet.ReadListener listener) {}
                };
            }
        }, response);
    }
}
