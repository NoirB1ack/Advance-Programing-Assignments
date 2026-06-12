# Assignment 16: Thread Synchronization using Condition Variables

## Question

Develop a multithreaded C program using POSIX threads where multiple threads coordinate access to a shared resource using either semaphores or condition variables.

You may implement:

- A simple producer-consumer system
- A limited resource access system
- A thread scheduling simulation

### Requirements

The program should:

- Ensure that threads wait correctly when the resource is unavailable.
- Allow threads to continue execution only when signaled.
- Demonstrate proper synchronization.
- Demonstrate safe shared-memory access.
- Demonstrate thread communication.

Use synchronization functions such as:

- `sem_wait()`
- `sem_post()`
- `pthread_cond_wait()`
- `pthread_cond_signal()`

## Notes

- The implementation uses POSIX threads (`pthread`) for concurrent execution.
- A Producer-Consumer model is implemented to demonstrate synchronization between threads.
- Shared access to the buffer is protected using a mutex to ensure data consistency.
- Condition variables (`pthread_cond_wait()` and `pthread_cond_signal()`) are used for thread communication and coordination.
- The producer waits when the buffer becomes full and resumes when space becomes available.
- The consumer waits when the buffer becomes empty and resumes when new items are produced.
- The implementation demonstrates safe shared-memory access and efficient thread synchronization without busy waiting.
- The accompanying documentation explains the working of condition variables and how synchronization prevents inconsistent behavior.
- Sample outputs are included for verification and demonstration purposes.
