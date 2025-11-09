This is a maven plugin (or other thing) for creating bolierplate code.

The idea is to use a set of yaml/json/xml files (we need an schema to enable ide's autocompletion)
to describe our aggregates and, from those files, generate:

- the root aggregate
- entities
- value objects
- domain events
- repositories
- repository implementation
- use cases
- UI (crud, creation form, view and editor)

We can later add our own logic to those classes by:

- copy/paste and modify
- extend
- fill abstract methods (defined in the source yaml?)
- provide beans implementing interfaces

We will also create here a dependency with some default implementations for the event bus 
and things like that. 