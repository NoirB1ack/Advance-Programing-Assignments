# Assignment 15: Multithreading with Mutex Synchronization

## Question

Write a multithreaded C program using POSIX threads (`pthread`) where multiple threads increment a shared global counter variable many times.

### Tasks

#### Phase 1: Without Synchronization

Implement the program without any synchronization mechanism and observe the incorrect output caused by a race condition.

#### Phase 2: With Mutex Synchronization

Modify the program using a mutex (`pthread_mutex_t`) to protect the critical section and produce the correct final counter value.

### Requirements

Your program must demonstrate:

- Thread creation using `pthread_create()`
- Synchronization using:
  - `pthread_mutex_lock()`
  - `pthread_mutex_unlock()`
- Thread completion using `pthread_join()`

## Notes

- The implementation uses POSIX threads (`pthread`) to create and manage multiple threads.
- A shared global counter variable is accessed concurrently by multiple threads.
- The unsynchronized version demonstrates incorrect results caused by race conditions.
- The synchronized version uses a mutex to protect the critical section and ensure data consistency.
- Thread lifecycle management is performed using `pthread_create()` and `pthread_join()`.
- The accompanying documentation explains why race conditions occur and how mutex synchronization resolves them.
- Sample outputs are included for verification and demonstration purposes.
