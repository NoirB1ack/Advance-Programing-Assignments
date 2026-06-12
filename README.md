# Assignment 13: Dynamic String Buffer Implementation

## Question

In C, managing strings is a common source of buffer overflows and memory leaks. Implement a Dynamic String Buffer that automatically grows as needed.

### Requirements

#### 1. Create a StringBuffer Structure

Create a `StringBuffer` structure containing:

- `char *data`
- `size_t length`
- `size_t capacity`

#### 2. Implement Initialization Function

Write a function:

```c
sb_init(size_t initial_capacity)
```

Requirements:

- Allocate both the structure and the internal data buffer on the heap.
- Handle `NULL` returns from `malloc()` appropriately.

#### 3. Implement Append Function

Write a function:

```c
sb_append(StringBuffer *sb, const char *str)
```

#### 4. Dynamic Buffer Growth

If the appended string exceeds the current capacity:

- Use `realloc()` to increase the buffer size.
- Double the current capacity when resizing.
- Handle `realloc()` safely by ensuring the original pointer is not overwritten if `realloc()` returns `NULL`.

#### 5. Implement Destructor Function

Write a function:

```c
sb_free(StringBuffer *sb)
```

Requirements:

- Free the internal data buffer.
- Free the `StringBuffer` structure itself.
- Prevent memory leaks by releasing all allocated memory.

### Demonstration

- Demonstrate the buffer growing at least twice during execution.
- Properly free all allocated memory before program termination.

## Notes

- The implementation demonstrates dynamic memory allocation using `malloc()` and `realloc()`.
- Buffer resizing is performed automatically when additional capacity is required.
- Safe handling of allocation failures is implemented to prevent data loss and undefined behavior.
- Memory cleanup is performed using a dedicated destructor function to avoid memory leaks.
- The program demonstrates dynamic buffer growth multiple times during execution.
- Sample outputs are included for verification and demonstration purposes.
