# Assignment 14: Garbage Collection and Circular References

## Question

Create a scenario where objects are "dead" but still have a reference count higher than zero, then force the Garbage Collector to clean them up.

### Implementation Steps

#### 1. Create a Node Class

Create a `Node` class containing:

- `name`
- `link`

#### 2. Create a Reference Cycle

Instantiate two objects:

- Node A
- Node B

Create a circular reference:

```python
A.link = B
B.link = A
```

#### 3. Check Reference Counts

Use:

```python
sys.getrefcount()
```

to demonstrate that both objects have multiple references.

#### 4. The Deletion

Delete the direct references:

```python
del A
del B
```

#### 5. The Investigation

Use the `gc` module to demonstrate that the objects still exist in memory because of the circular reference, even though they are no longer accessible directly from the program.

#### 6. The Cleanup

Force garbage collection using:

```python
gc.collect()
```

Print the number of unreachable objects collected by the garbage collector.

## Notes

- The implementation demonstrates how circular references can prevent immediate object cleanup despite the removal of direct references.
- Reference counts are inspected using `sys.getrefcount()`.
- The `gc` module is used to investigate and collect unreachable objects.
- The program illustrates the difference between reference counting and Python's cyclic garbage collection mechanism.
- Garbage collection is explicitly triggered using `gc.collect()`.
- Sample outputs are included for verification and demonstration purposes.
