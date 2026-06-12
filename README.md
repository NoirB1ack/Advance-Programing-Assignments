# Advanced Programming — Assignments

Each assignment lives on its own branch named `assignmentN`. A branch contains that assignment's source file(s) plus a `README.md` with the exact question. To view one:

```bash
git checkout assignment6    # then read its README.md and source

| # | Branch | Language | What it does |
|---|--------|----------|--------------|
| 1 | `assignment1` | C | Time-complexity analysis — times O(1), O(n), O(n²) operations as input size grows. |
| 2 | `assignment2` | C | Auxiliary-space analysis — measures the extra memory of O(1), O(n), O(n²) operations as input grows. |
| 3 | `assignment3` | Java | `ArrayList` of book titles; adds ≥5 books and searches titles containing a given word. |
| 4 | `assignment4` | Python | List + dictionary of products (name, stock); lists products with stock < 10. |
| 5 | `assignment5` | React | Todo-list component using `useState` to add and display todos. |
| 6 | `assignment6` | Java | Student performance analyzer — top-N students, average per course, unique courses (Streams, Comparator, `getOrDefault`). |
| 7 | `assignment7` | Python | Activity log analyzer — total time per user, most-active users, unique actions (dict/set/list, `reduce`). |
| 8 | `assignment8` | React | Course enrollment dashboard — add/remove students, sort by GPA, list/filter courses (`useState`, `Map`, `Set`). |
| 9 | `assignment9` | Java | Banking system — `Account` base with `Savings`/`Current`; encapsulation, constructor chaining, inheritance, polymorphism. |
| 10 | `assignment10` | Python | Student system — `Address` + `Student` (age via `@property`) + `ScholarshipStudent`; composition, validation, overriding. |
| 11 | `assignment11` | Python | Library system — abstract `LibraryItem` with `Book`/`DVD`; abstraction, overriding, polymorphism, class counter. |
| 12 | `assignment12` | Python | E-commerce order system demonstrating all five SOLID principles via injected payment/notification/storage abstractions. |
| 13 | `assignment13` | C | Dynamic string buffer that grows with `realloc` (`sb_init`/`sb_append`/`sb_free`); safe realloc, no leaks. |
| 14 | `assignment14` | Python | Reference-cycle demo — two `Node`s reference each other, survive `del`, then `gc.collect()` reclaims them. |
| 15 | `assignment15` | C | POSIX threads — shared counter is wrong without sync (race condition) and correct with a `pthread_mutex`. |
| 16 | `assignment16` | C | Producer–consumer over a bounded buffer using a mutex + condition variables. |
| 17 | `assignment17` | Python | User-onboarding validation — `RegistrationService` (email regex + 18+ age), custom exceptions, pytest suite. |
| 18 | `assignment18` | Python | File score processor — read int, ×10, `try/except/else/finally` for missing file & bad data, pytest suite. |
| 19 | `assignment19` | React Native (Expo) | Single-screen counter (increment / decrement clamped at 0 / reset) with a light↔dark theme toggle. |
