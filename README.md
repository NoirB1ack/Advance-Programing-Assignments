# Assignment 12: E-Commerce Order Processing System (SOLID Principles)

## Question

Design a system in Java for processing customer orders in an e-commerce platform.

### System Requirements

An order system should support:

- Multiple payment methods (Credit Card, UPI, Wallet, etc.)
- Multiple notification channels (Email, SMS, Push Notifications)
- Different order types (Regular Order, Discounted Order, Priority Order)
- Ability to store order data using different storage mechanisms (Database, File, etc.)

### Design Constraints (Must Apply SOLID Principles)

Your design must satisfy the following SOLID principles:

#### 1. Single Responsibility Principle (SRP)

Each class should have a single responsibility.

Examples:

- Order logic
- Payment processing
- Notification handling
- Data storage

should be implemented in separate classes.

#### 2. Open/Closed Principle (OCP)

The system should allow extension without modification.

You should be able to add:

- New payment methods
- New notification channels

without modifying existing classes.

#### 3. Liskov Substitution Principle (LSP)

All subclasses should work correctly when used through their base type.

Examples:

- Payment method implementations
- Order type implementations

No subclass should break expected behavior.

#### 4. Interface Segregation Principle (ISP)

Avoid large interfaces.

Design small, role-specific interfaces so that classes are not forced to implement unused methods.

#### 5. Dependency Inversion Principle (DIP)

High-level modules should depend on abstractions rather than concrete implementations.

Examples:

- `OrderService` should depend on interfaces.
- Use dependency injection to provide implementations.

### Functional Requirements

Your system should:

1. Create an order
2. Process payment using a selected payment method
3. Send notification after successful order processing
4. Save order details using a storage mechanism

## Notes

- The implementation follows all five SOLID principles to ensure maintainability, scalability, and flexibility.
- Different payment methods are implemented through abstraction and polymorphism.
- Notification channels are designed to be easily extendable without modifying existing code.
- Dependency Injection is used to reduce coupling between high-level and low-level modules.
- The system supports multiple order types and storage mechanisms through interface-based design.
- Sample outputs are included for verification and demonstration purposes.
