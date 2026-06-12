# Assignment 11: Library Management System using Abstraction and Polymorphism

## Question

Design a library system in Python with:

### Base/Abstract Class

Create a base/abstract class `LibraryItem` containing:

- Common fields such as:
  - `title`
  - `year`
- An abstract/common method:
  - `displayInfo()`

### Subclasses

#### Book

Extend `LibraryItem` by adding:

- `author`

#### DVD

Extend `LibraryItem` by adding:

- `duration`
- `genre`

### Requirements

Your implementation should clearly demonstrate:

- Use of abstraction through a common structure in the base class
- Method overriding in subclasses
- Polymorphism using a collection of `LibraryItem` objects
- One additional feature:
  - Constructor overloading OR
  - Class/static counter
 
## Notes

- The implementation uses an abstract base class `LibraryItem` to define common properties and behavior.
- The `Book` and `DVD` classes extend the base class and provide their own implementations of `displayInfo()`.
- Polymorphism is demonstrated through the use of a collection of `LibraryItem` references containing different item types.
- Constructor overloading is used to provide flexible object initialization.
- The program demonstrates key object-oriented programming concepts including abstraction, inheritance, method overriding, and polymorphism.
- Sample outputs are included for verification and demonstration purposes.
