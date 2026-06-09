# SE Intern Assessment

## Overview

This repository contains solutions for two common Software Engineering interview and assessment problems:

1. **LRU Cache**
2. **Event Scheduler**

The goal of this project is to demonstrate proficiency in data structures, algorithms, complexity analysis, system design, and scalable software engineering practices.

---

## Problem 1: LRU Cache

### Objective

Design and implement an **LRU (Least Recently Used) Cache** supporting:

* `get(key)`
* `put(key, value)`

Both operations must execute in **O(1)** time complexity.

### Approach

The implementation combines:

* **Hash Map (Dictionary)** for constant-time key lookup.
* **Doubly Linked List** for maintaining usage order.

The most recently used item is placed at the front of the list, while the least recently used item remains at the end and is removed when capacity is exceeded.

### Complexity

| Operation | Time Complexity |
| --------- | --------------- |
| get()     | O(1)            |
| put()     | O(1)            |

Space Complexity: **O(capacity)**

---

## Problem 2: Event Scheduler

### Objective

Given a list of events represented as:

```python
[(start_time, end_time)]
```

Implement:

* `can_attend_all(events)`
* `min_rooms_required(events)`

### Features

#### can_attend_all(events)

Determines whether a single person can attend every event without scheduling conflicts.

Example:

```python
[(9, 10), (10, 11), (11, 12)]
```

Output:

```python
True
```

#### min_rooms_required(events)

Calculates the minimum number of meeting rooms required to schedule all events.

Example:

```python
[(9, 11), (10, 12), (11, 13)]
```

Output:

```python
2
```

### Approach

The solution:

1. Sorts all start times.
2. Sorts all end times.
3. Uses a two-pointer sweep-line technique.
4. Tracks concurrent meetings and determines the maximum rooms required.

### Complexity

| Function           | Time Complexity | Space Complexity |
| ------------------ | --------------- | ---------------- |
| can_attend_all     | O(n log n)      | O(1) / O(n)      |
| min_rooms_required | O(n log n)      | O(n)             |

---

## Design Discussion

### Why Hash Map + Doubly Linked List for LRU?

A hash map provides:

* O(1) lookup
* O(1) insertion
* O(1) deletion

A doubly linked list provides:

* O(1) insertion
* O(1) removal
* O(1) movement of recently accessed nodes

Together they achieve constant-time cache operations.

---

## Future Improvements

### Room Assignment

The scheduler can be extended to assign actual room names:

```text
Room A
Room B
Room C
```

Using a priority queue (min-heap), rooms can be reused immediately after meetings end.

Example:

```text
09:00 - 11:00 → Room A
10:00 - 12:00 → Room B
12:00 - 13:00 → Room A
```

---

## Thread Safety

To make the LRU Cache safe for concurrent access:

### Option 1: Mutex Lock

Protect cache operations using a lock.

### Option 2: Read-Write Lock

Allow:

* Multiple readers
* Single writer

### Option 3: Fine-Grained Locking

Use separate locks for:

* Hash map
* Doubly linked list

This improves concurrency but increases implementation complexity.

---

## Technologies Used

* Python 3
* Hash Maps
* Doubly Linked Lists
* Sorting Algorithms
* Two-Pointer Technique
* Priority Queues (Future Enhancement)
* Thread Synchronization Concepts

---

## Author

**Guru**

Aspiring Software Engineer focused on Data Structures, Algorithms, System Design, and Backend Development.
