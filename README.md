# Assignment 17: User Onboarding Validation Module with Testing

## Technology Used

- Python

## Question

Build a user onboarding validation module for a platform. Your objective is to create a core validation class that processes incoming application data—specifically a user's email address and age—and enforces strict business constraints before allowing a registration to complete.

### Requirements

The system must ensure that:

- The email string is neither null nor empty.
- The email conforms to a valid email format using regular expressions.
- The email contains a valid identifier, an `@` symbol, and a domain name.
- Applicants must be at least 18 years old to create an account.

### Implementation Rules

#### Custom Exceptions

Implement the following custom exceptions:

```python
class InvalidEmailError(...)
class UnderageError(...)
```

Requirements:

- `InvalidEmailError` should inherit from an appropriate built-in exception class.
- `UnderageError` should inherit from an appropriate built-in exception class.
- Exceptions should provide descriptive and dynamic error messages.

#### Registration Service

Create a class:

```python
class RegistrationService
```

containing the method:

```python
def register_user(self, email: str, age: int) -> bool
```

Requirements:

- Validate email format using regular expressions.
- Validate the minimum age requirement.
- Use an internal `assert` statement to verify basic state invariants.
- Raise the appropriate custom exception when validation fails.

#### Unit Testing

Write a pytest test suite that:

- Uses a shared `@pytest.fixture`
- Validates successful registration workflows
- Uses `pytest.raises` to verify exception handling
- Tests invalid email scenarios
- Tests underage registration scenarios

### Required Concepts

#### Custom Exception Design

- Appropriate exception inheritance
- Descriptive exception messages

#### Core Service Validation

- Regex-based email validation
- Age boundary checks
- Assertion-based invariant validation
- Proper exception triggering

#### Unit Testing Suite

- Shared fixtures
- Automated validation tests
- Exception testing using `pytest.raises`
- Comprehensive test coverage

## Notes

- The implementation uses custom exceptions to handle invalid email and underage registration scenarios.
- Email validation is performed using regular expressions.
- Age restrictions are enforced through business rule validation.
- Assertions are used to verify internal state invariants.
- Automated testing is implemented using the pytest framework.
- Test cases cover both successful and failure scenarios.
- Exception handling is verified using `pytest.raises`.
- Sample outputs are included for verification and demonstration purposes.
