package ${project.packageName}.domain.aggregates.${aggregate.name?lower_case}.vo;

public record ${aggregate.name}Name(String value) {

    public ${aggregate.name}Name {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("name is required");
        }
    }

}
