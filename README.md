# Assignment 06: Student Performance Analyzer

## Technology Used

- Java

## Question

Develop a student performance analyzer in Java. You are given a list of students of your batch. Each student has:

- `id (int)` *(do not include the CSB string)*
- `name (String)`
- `courses (List<String>)`
- `scores (Map<String, Integer>)` where the key represents the course name and the value represents the marks obtained.

### Tasks

1. Store students using appropriate collections.

2. Implement the following methods:

```java
List<Student> getTopNStudents(List<Student> students, int n);
Map<String, Double> getAverageScorePerCourse(List<Student> students);
Set<String> getAllUniqueCourses(List<Student> students);
```

### Requirements

Must use:

1. `ArrayList`, `HashMap`, and `HashSet`
2. Streams for aggregation and filtering
3. Sorting of students by average score in descending order
4. `Comparator`
5. `getOrDefault()` to handle missing course scores
6. Generics to ensure type safety

### Complexity Analysis

Perform complexity analysis for:

1. Time complexity of computing course averages
2. Complexity of sorting the top N students

## Notes

- The implementation uses Java Collections Framework classes such as `ArrayList`, `HashMap`, and `HashSet`.
- Java Streams are used for aggregation, filtering, and data processing.
- Students are sorted based on their average scores using a custom `Comparator`.
- Missing course scores are handled safely using `getOrDefault()`.
- Generics are used throughout the implementation to ensure type safety.
- Complexity analysis for the required operations is included in the documentation.
- Sample outputs are included for verification and demonstration purposes.
