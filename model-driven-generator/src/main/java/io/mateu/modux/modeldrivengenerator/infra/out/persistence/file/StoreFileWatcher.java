package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardWatchEventKinds;
import java.nio.file.WatchKey;
import java.nio.file.WatchService;

/**
 * The store belongs to more than one process: the web app, the MCP server an AI
 * agent spawns, a git pull on the checkout, an editor over the YAML. This watcher
 * closes the loop — an EXTERNAL change to the store reloads the catalog, the
 * version fingerprint moves, and the existing SSE channel pushes the refresh to
 * every open UI. Our own writes (persist, the schema artifact) are recognised by
 * timestamp and filename and never trigger a reload.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class StoreFileWatcher {

    /** Quiet time after the last event before reloading (granular saves burst). */
    private static final long DEBOUNCE_MS = 400;
    /** Events this close to our own persist are our own writes echoing back. */
    private static final long SELF_WRITE_WINDOW_MS = 1500;

    private final CommonFileRepository repository;

    private WatchService watchService;
    private Thread thread;
    private volatile boolean running;
    private volatile long lastEventAt;
    private volatile boolean dirty;
    /** The root currently under watch — the store MOVES when a repository opens after boot. */
    private Path currentRoot;

    @PostConstruct
    void start() {
        running = true;
        thread = new Thread(this::loop, "modux-store-watcher");
        thread.setDaemon(true);
        thread.start();
    }

    /** (Re)aims the watch at the store's current location; a no-op while it hasn't moved. */
    private void reRootIfMoved() {
        var root = watchRoot();
        if (root == null || root.equals(currentRoot)) return;
        try {
            if (watchService != null) watchService.close();
            watchService = FileSystems.getDefault().newWatchService();
            registerTree(root);
            currentRoot = root;
            log.info("watching the store for external changes: {}", root.toAbsolutePath());
        } catch (IOException e) {
            log.warn("Store watcher could not start on {}: {}", root, e.getMessage());
        }
    }

    @PreDestroy
    void stop() {
        running = false;
        if (thread != null) thread.interrupt();
        try {
            if (watchService != null) watchService.close();
        } catch (IOException ignored) {
            // shutting down anyway
        }
    }

    /** The directory to watch: the granular store itself, or the monolithic file's parent. */
    private Path watchRoot() {
        var store = repository.storePath();
        if (store == null) return null;
        if (Files.isDirectory(store)) return store;
        var parent = store.toAbsolutePath().getParent();
        return parent != null && Files.isDirectory(parent) ? parent : null;
    }

    private void registerTree(Path root) throws IOException {
        try (var dirs = Files.walk(root)) {
            for (var dir : dirs.filter(Files::isDirectory).toList()) {
                if (ignored(dir)) continue;
                dir.register(watchService,
                        StandardWatchEventKinds.ENTRY_CREATE,
                        StandardWatchEventKinds.ENTRY_MODIFY,
                        StandardWatchEventKinds.ENTRY_DELETE);
            }
        }
    }

    private boolean ignored(Path path) {
        var s = path.toString();
        return s.contains("/.git") || s.endsWith("model-driven-store-schema.json")
                || s.endsWith("modux-editor-layout.json");
    }

    private void loop() {
        while (running) {
            reRootIfMoved();
            if (watchService == null) {
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    return;
                }
                continue;
            }
            WatchKey key;
            try {
                key = watchService.poll(200, java.util.concurrent.TimeUnit.MILLISECONDS);
            } catch (InterruptedException e) {
                return;
            } catch (java.nio.file.ClosedWatchServiceException e) {
                continue; // re-rooting closed it under us; the next lap reopens
            }
            if (key != null) {
                var dir = (Path) key.watchable();
                for (var event : key.pollEvents()) {
                    var context = event.context();
                    var child = context instanceof Path p ? dir.resolve(p) : dir;
                    if (ignored(child)) continue;
                    // a new directory joins the watch (granular stores grow sections)
                    if (Files.isDirectory(child)) {
                        try {
                            registerTree(child);
                        } catch (IOException ignoredEx) {
                            // it may be gone already
                        }
                    }
                    dirty = true;
                    lastEventAt = System.currentTimeMillis();
                }
                key.reset();
            }
            // debounced reload, skipping the echo of our own writes
            if (dirty && System.currentTimeMillis() - lastEventAt > DEBOUNCE_MS) {
                dirty = false;
                if (System.currentTimeMillis() - repository.lastPersistAt() < SELF_WRITE_WINDOW_MS) continue;
                try {
                    log.info("external change on the store — reloading the catalog");
                    repository.reload();
                } catch (Exception e) {
                    log.warn("reload after external change failed: {}", e.getMessage());
                }
            }
        }
    }
}
