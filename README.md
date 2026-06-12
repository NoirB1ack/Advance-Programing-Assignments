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
