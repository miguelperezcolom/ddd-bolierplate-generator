package io.mateu.modux.modeldrivengenerator.infra.out.db;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AllData;
import io.mateu.uidl.interfaces.Identifiable;
import lombok.Getter;
import lombok.SneakyThrows;

import java.sql.Connection;
import java.sql.DriverManager;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * A model store in a relational database (docs/design/storage-ports.md): ONE ROW PER
 * ELEMENT — the granular format's philosophy in SQL. Workspaces are rows too: the
 * system is workspace {@code main}, each solution a {@code solution/<slug>} workspace
 * with a frozen {@code element_base} (the three-way merge base) and a history line
 * per landing. Plain portable SQL: H2 (embedded, zero-infra) and PostgreSQL.
 */
public class JdbcModelDatabase {

    public static final String SYSTEM = "main";

    private final String url;
    private final String user;
    private final String password;
    private final ObjectMapper json = new ObjectMapper();
    /** AllData component name ↔ element class, derived once by reflection. */
    private final Map<String, Class<?>> typeByName = new LinkedHashMap<>();
    private final Map<Class<?>, String> nameByType = new HashMap<>();

    @Getter
    private String currentWorkspace = SYSTEM;

    public JdbcModelDatabase(String url, String user, String password) {
        this.url = url;
        this.user = user;
        this.password = password;
        for (var component : AllData.class.getRecordComponents()) {
            var elementType = (Class<?>) ((java.lang.reflect.ParameterizedType) component.getGenericType())
                    .getActualTypeArguments()[0];
            typeByName.put(component.getName(), elementType);
            nameByType.put(elementType, component.getName());
        }
        ensureSchema();
    }

    @SneakyThrows
    private Connection connect() {
        return DriverManager.getConnection(url, user, password);
    }

    @SneakyThrows
    private void ensureSchema() {
        try (var c = connect(); var st = c.createStatement()) {
            st.execute("CREATE TABLE IF NOT EXISTS workspace ("
                    + "id VARCHAR(200) PRIMARY KEY, name VARCHAR(400), created_at TIMESTAMP)");
            st.execute("CREATE TABLE IF NOT EXISTS element ("
                    + "workspace VARCHAR(200), type VARCHAR(120), id VARCHAR(400), "
                    + "payload VARCHAR(1000000), PRIMARY KEY (workspace, type, id))");
            st.execute("CREATE TABLE IF NOT EXISTS element_base ("
                    + "workspace VARCHAR(200), type VARCHAR(120), id VARCHAR(400), "
                    + "payload VARCHAR(1000000), PRIMARY KEY (workspace, type, id))");
            st.execute("CREATE TABLE IF NOT EXISTS history ("
                    + "workspace VARCHAR(200), at TIMESTAMP, summary VARCHAR(2000))");
            try (var ps = c.prepareStatement("MERGE INTO workspace (id, name, created_at) KEY(id) VALUES (?, ?, CURRENT_TIMESTAMP)")) {
                ps.setString(1, SYSTEM);
                ps.setString(2, "Sistema (as-is)");
                ps.executeUpdate();
            } catch (Exception postgres) {
                try (var ps = c.prepareStatement("INSERT INTO workspace (id, name, created_at) "
                        + "VALUES (?, ?, CURRENT_TIMESTAMP) ON CONFLICT (id) DO NOTHING")) {
                    ps.setString(1, SYSTEM);
                    ps.setString(2, "Sistema (as-is)");
                    ps.executeUpdate();
                }
            }
        }
    }

    public void switchTo(String workspace) {
        this.currentWorkspace = workspace;
    }

    // ---- element catalog ----------------------------------------------------

    /** The whole model of a workspace, rebuilt from its rows. */
    @SneakyThrows
    public AllData load(String workspace, String table) {
        var byComponent = new HashMap<String, List<Object>>();
        try (var c = connect();
             var ps = c.prepareStatement("SELECT type, payload FROM " + table + " WHERE workspace = ?")) {
            ps.setString(1, workspace);
            try (var rs = ps.executeQuery()) {
                while (rs.next()) {
                    var type = rs.getString(1);
                    var elementClass = typeByName.get(type);
                    if (elementClass == null) continue; // element of a future meta-model version
                    byComponent.computeIfAbsent(type, k -> new ArrayList<>())
                            .add(json.readValue(rs.getString(2), elementClass));
                }
            }
        }
        var components = AllData.class.getRecordComponents();
        var args = new Object[components.length];
        for (var i = 0; i < components.length; i++) {
            args[i] = byComponent.getOrDefault(components[i].getName(), List.of());
        }
        var constructor = AllData.class.getDeclaredConstructors()[0];
        constructor.setAccessible(true);
        return (AllData) constructor.newInstance(args);
    }

    public AllData load(String workspace) {
        return load(workspace, "element");
    }

    public AllData loadBase(String workspace) {
        return load(workspace, "element_base");
    }

    /** Replace a workspace's whole model, transactionally (the persist of a save). */
    @SneakyThrows
    public void replaceAll(String workspace, AllData data, String table) {
        try (var c = connect()) {
            c.setAutoCommit(false);
            try (var del = c.prepareStatement("DELETE FROM " + table + " WHERE workspace = ?")) {
                del.setString(1, workspace);
                del.executeUpdate();
            }
            try (var ins = c.prepareStatement(
                    "INSERT INTO " + table + " (workspace, type, id, payload) VALUES (?, ?, ?, ?)")) {
                for (var component : AllData.class.getRecordComponents()) {
                    var list = (List<?>) component.getAccessor().invoke(data);
                    if (list == null) continue;
                    for (var element : list) {
                        if (!(element instanceof Identifiable identifiable)) continue;
                        ins.setString(1, workspace);
                        ins.setString(2, component.getName());
                        ins.setString(3, identifiable.id());
                        ins.setString(4, json.writeValueAsString(element));
                        ins.addBatch();
                    }
                }
                ins.executeBatch();
            }
            c.commit();
        }
    }

    public void replaceAll(String workspace, AllData data) {
        replaceAll(workspace, data, "element");
    }

    public void replaceBase(String workspace, AllData data) {
        replaceAll(workspace, data, "element_base");
    }

    // ---- workspaces ----------------------------------------------------------

    @SneakyThrows
    public List<String> solutionWorkspaces() {
        var ids = new ArrayList<String>();
        try (var c = connect();
             var ps = c.prepareStatement("SELECT id FROM workspace WHERE id LIKE 'solution/%' ORDER BY id")) {
            try (var rs = ps.executeQuery()) {
                while (rs.next()) ids.add(rs.getString(1));
            }
        }
        return ids;
    }

    @SneakyThrows
    public void createWorkspace(String id, String name) {
        try (var c = connect();
             var ps = c.prepareStatement("INSERT INTO workspace (id, name, created_at) VALUES (?, ?, CURRENT_TIMESTAMP)")) {
            ps.setString(1, id);
            ps.setString(2, name);
            ps.executeUpdate();
        }
    }

    @SneakyThrows
    public void dropWorkspace(String id) {
        try (var c = connect()) {
            for (var sql : List.of("DELETE FROM element WHERE workspace = ?",
                    "DELETE FROM element_base WHERE workspace = ?",
                    "DELETE FROM workspace WHERE id = ?")) {
                try (var ps = c.prepareStatement(sql)) {
                    ps.setString(1, id);
                    ps.executeUpdate();
                }
            }
        }
    }

    @SneakyThrows
    public void appendHistory(String workspace, String summary) {
        try (var c = connect();
             var ps = c.prepareStatement("INSERT INTO history (workspace, at, summary) VALUES (?, CURRENT_TIMESTAMP, ?)")) {
            ps.setString(1, workspace);
            ps.setString(2, summary);
            ps.executeUpdate();
        }
    }
}
