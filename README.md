# Assignment 08: Course Enrollment Dashboard

## Used

- React

## Question

Develop a Course Enrollment Dashboard in ReactJS.

You are building a React component that displays enrolled students.

Each student:

```javascript
{
  id: number,
  name: string,
  enrolledCourses: Set<string>,
  gpa: number
}
```

### Tasks

1. Maintain students in state.

2. Implement the following features:

a. Add a new student  
b. Remove a student by ID  
c. Display students sorted by GPA (descending)  
d. Display all unique courses across students  
e. Filter students enrolled in a specific course

### Requirements

Use the following:

a. `useState` for state management  
b. `Map` internally for ID-to-student mapping  
c. `Set` for course uniqueness  
d. `map()`, `filter()`, and `reduce()`  
e. Do not mutate state directly  
f. Use the spread operator for state updates  
g. Convert `Set` to an array before rendering

## Notes

- The implementation uses React's `useState` hook for state management.
- Student records are managed using appropriate JavaScript data structures such as `Map` and `Set`.
- The dashboard supports adding and removing students dynamically.
- Students are displayed in descending order of GPA.
- Unique enrolled courses are extracted and displayed using a `Set`.
- Filtering functionality is provided to display students enrolled in a specific course.
- Complexity analysis for course-based filtering is included in the documentation.
- Sample outputs are included for verification and demonstration purposes.
### Complexity Analysis

Compute the time complexity of filtering students by course.
