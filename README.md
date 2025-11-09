This is a maven plugin (or other thing) for creating bolierplate code.

The idea is to use a set of yaml/json/xml files (we need an schema to enable ide's autocompletion)
to describe our aggregates and, from those files, generate:

- The root aggregate
- Entities
- Value objects
- Domain events
- Repositories
- Repository implementation
- Use cases
- UI (crud, creation form, view and editor)

We can later add our own logic to those classes by:

- Copy/paste and modify
- Extend
- Fill abstract methods (defined in the source yaml?)
- Provide beans implementing interfaces

We will also create here a dependency with some abstract classes, interfaces and default implementations 
for the aggregate root, event bus, exceptions and things like that. 

# Usage

We will usually create a maven module in our project where we will define our aggregates using 
yaml files like *.ddd.yaml, in a directory tree which we will use to determine the packages,
and later add this module as a dependency from another modules where we will create our beans
implementing the created interfaces.

# Notes

- Generate springboot / micronaut / jakarta CDI annotations

# References

- https://developers.redhat.com/blog/2020/11/25/how-to-configure-yaml-schema-to-make-editing-files-easier
- https://www.baeldung.com/maven-plugin