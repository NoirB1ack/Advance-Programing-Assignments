# Assignment 09: Banking System using OOP Concepts

## Question

Design a banking system in Java with:

### Base Class: Account

Create a base class `Account` containing the following private fields:

- `accountNumber`
- `ownerName`
- `balance`

The class should:

- Provide getters and setters
- Include at least two constructors using constructor chaining
- Implement `deposit()` and `withdraw()` methods with proper validation
- Include a `display()` method

### Derived Classes

#### SavingsAccount

Extend the `Account` class by:

- Adding an `interestRate` field
- Overriding the `display()` method
- Displaying interest-related information

#### CurrentAccount

Extend the `Account` class by:

- Adding an `overdraftLimit` field
- Restricting withdrawals according to the overdraft limit

### Requirements

Your implementation should clearly demonstrate:

- Proper encapsulation (no direct field access)
- Constructor overloading and constructor chaining using `this(...)`
- Inheritance and method overriding using `@Override` and `super`
- Polymorphism by storing objects in an `Account` reference list and calling `display()`
- Basic validation and debugging using assertions or exceptions for invalid operations

## Notes

- The implementation demonstrates the core OOP principles of encapsulation, inheritance, polymorphism, and method overriding.
- Constructor overloading and chaining are implemented using `this(...)`.
- The `SavingsAccount` and `CurrentAccount` classes extend the base `Account` class with specialized functionality.
- Validation is performed to ensure safe deposit and withdrawal operations.
- Polymorphism is demonstrated through the use of `Account` references to handle different account types.
- Sample outputs are included for verification and demonstration purposes.
