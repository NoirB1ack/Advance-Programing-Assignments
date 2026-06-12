# Assignment 18: Score Processing Utility with Exception Handling and Testing

## Question

Generally, handling external files is a common source of runtime errors. Files might be missing, or they might contain corrupted data. For this assignment, create a simple data utility class that reads an integer value from a text file, performs a calculation, and ensures all system resources are properly closed afterward—even if something goes wrong.

### Requirements

The program must:

- Read a numeric score from a text file.
- Multiply the score by 10.
- Return the calculated result.
- Handle missing files gracefully.
- Handle invalid file contents gracefully when the file contains non-numeric data.
- Ensure proper cleanup of resources regardless of success or failure.
- Include automated tests to verify both successful and failure scenarios.

### Implementation Rules

#### ScoreProcessor Class

Create a class:

```python
class ScoreProcessor
```

containing the method:

```python
def process_score_file(self, file_path: str) -> int
```

Requirements:

- Use a `try-except-else-finally` structure.
- Open and read data from a text file.
- Convert the file content to an integer.
- Multiply the value by 10 and return the result.

#### Exception Handling

Handle the following exceptions specifically:

```python
FileNotFoundError
ValueError
```

Requirements:

- Print a helpful error message when a file is missing.
- Print a helpful error message when the file contains invalid data.
- Use the `else` block to print:

```text
Data processed successfully
```

- Use the `finally` block to print:

```text
File cleanup completed
```

#### Unit Testing

Create a pytest test suite that includes:

- A test for successful score processing using a valid file.
- A test that verifies handling of a missing file using `pytest.raises`.
- Appropriate assertions for validating program behavior.

### Required Concepts

#### Exception Handling and Structure

- Multi-exception handling
- Proper use of `try`, `except`, `else`, and `finally`
- Guaranteed execution of cleanup code

#### Core Logic and Input Validation

- File handling
- Integer parsing
- Validation of file contents
- Score calculation

#### Unit Testing

- Automated testing using pytest
- Validation of successful execution paths
- Validation of error scenarios
- Exception testing using `pytest.raises`

## Notes

- The implementation uses Python file handling mechanisms to read data from external files.
- Exception handling is implemented using `try-except-else-finally`.
- Missing files and invalid data formats are handled gracefully through specific exception types.
- Cleanup code is guaranteed to execute through the `finally` block.
- Automated testing is implemented using the pytest framework.
- Test cases validate both successful processing and error handling behavior.
- Sample outputs are included for verification and demonstration purposes.
