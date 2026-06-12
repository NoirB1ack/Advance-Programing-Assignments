# Assignment 07: Activity Log Analyzer

## Question

Develop an Activity Log Analyzer in Python.

You are given a list of activity records:

```python
{
    "user": str,      # Roll number of a student
    "action": str,    # Online activities such as apps used, websites visited, etc.
    "duration": float # Screen time for each activity
}
```

### Tasks

1. Store data efficiently using Python built-in containers.

2. Implement the following functions:

```python
def total_time_per_user(logs: list[dict]) -> dict[str, float]

def most_active_users(logs: list[dict], k: int) -> list[str]

def unique_actions(logs: list[dict]) -> set[str]
```

### Requirements

Use the following:

a. `dict`, `set`, and `list`  
b. Comprehensions where appropriate  
c. `sorted()` with a key function  
d. Avoid explicit loops where possible  
e. Type annotations  
f. `defaultdict` (optional)  
g. `reduce()` to compute total activity time

### Complexity Analysis

Perform complexity analysis for:

a. Time complexity of computing the top K users  
b. Space complexity of storing intermediate results

## Notes

- The implementation uses Python built-in data structures such as lists, dictionaries, and sets.
- Type annotations are used to improve code readability and maintainability.
- Data aggregation and filtering are performed using Python's built-in functions and comprehensions.
- The `sorted()` function is used with an appropriate key for ranking users by activity time.
- `reduce()` is utilized to compute total activity duration.
- Complexity analysis for the required operations is included in the documentation.
- Sample outputs are included for verification and demonstration purposes.
