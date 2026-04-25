# Templates actualizados — Soporte de campos y VOs estandarizados

## Cambios en los templates (.ftl)

### Nuevo: vo.ftl
Genera un Value Object por cada field de tipo `ValueObject` en un aggregate.
El accessor interno siempre se llama `value` (en vez de `id`, `name`, `username`, etc.).

Ejemplo generado para un field `email` de tipo `ValueObject` + primitiveType `string`:
```java
public record Email(String value) {
    public Email {
        if (value == null || value.isBlank()) throw new IllegalArgumentException("email is required");
    }
}
```

### Actualizado: vo-id.ftl / vo-name.ftl
Ahora también usan `value` como accessor interno:
```java
public record BookingId(Long value) {}
public record BookingName(String value) {}
```

### Resto de templates
Todos los templates usan `.value()` de forma consistente al acceder a VOs.

---

## Cambio necesario en GenerateCodeUseCase.java

`vo.ftl` debe invocarse **una vez por cada field de tipo `ValueObject`** de cada aggregate.
Añadir dentro del bucle de aggregates, junto a `vo-id.ftl` y `vo-name.ftl`:

```java
// Generar VO por cada field de tipo ValueObject
aggregate.fields().stream()
    .filter(f -> "ValueObject".equals(f.type()))
    .forEach(field -> {
        Map<String, Object> voModel = new HashMap<>();
        voModel.put("project", fromJson(toJson(project)));
        voModel.put("aggregate", fromJson(toJson(aggregate)));
        voModel.put("field", fromJson(toJson(field)));
        createFile(baseDir, voModel, "vo.ftl",
            "src/main/java/" + packageDir +
            "/domain/aggregates/" + aggregatePackageName + "/vo/" +
            capitalize(field.name()) + ".java");
    });
```

Donde `capitalize` es simplemente `s -> s.substring(0,1).toUpperCase() + s.substring(1)`.

> **Nota:** `AggregateEntity` ya tiene `List<Field> fields` y `Field` es un record con todos los atributos,
> así que la serialización `toJson(field)` ya funciona tal cual.
