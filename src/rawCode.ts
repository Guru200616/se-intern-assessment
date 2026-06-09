export const lruCachePythonCode = `class Node:
    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {} # maps key -> Node
        
        # Dummy head and tail to avoid edge cases
        self.head = Node(0, 0)
        self.tail = Node(0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head

    def _add_node(self, node):
        # Insert node right after head (MRU position)
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node

    def _remove_node(self, node):
        # Remove an existing node from the linked list
        prev_node = node.prev
        next_node = node.next
        prev_node.next = next_node
        next_node.prev = prev_node

    def _move_to_front(self, node):
        # Move node to front (MRU)
        self._remove_node(node)
        self._add_node(node)

    def _remove_lru(self):
        # Remove and return the LRU node from tail.prev
        lru_node = self.tail.prev
        self._remove_node(lru_node)
        return lru_node

    def get(self, key: int) -> int:
        if key in self.cache:
            node = self.cache[key]
            self._move_to_front(node)
            return node.value
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            node = self.cache[key]
            node.value = value
            self._move_to_front(node)
        else:
            if len(self.cache) >= self.capacity:
                lru_node = self._remove_lru()
                del self.cache[lru_node.key]
            
            new_node = Node(key, value)
            self.cache[key] = new_node
            self._add_node(new_node)

# Example Usage & Output
if __name__ == "__main__":
    cache = LRUCache(2)
    cache.put(1, 1) # cache is {1: 1}
    cache.put(2, 2) # cache is {1: 1, 2: 2}
    print("get(1):", cache.get(1)) # returns 1, cache is {2: 2, 1: 1}
    cache.put(3, 3) # evicts key 2, cache is {1: 1, 3: 3}
    print("get(2):", cache.get(2)) # returns -1 (not found)
    cache.put(4, 4) # evicts key 1, cache is {3: 3, 4: 4}
    print("get(1):", cache.get(1)) # returns -1 (not found)
    print("get(3):", cache.get(3)) # returns 3
    print("get(4):", cache.get(4)) # returns 4
`;

export const eventSchedulerPythonCode = `class EventScheduler:
    @staticmethod
    def can_attend_all(events) -> bool:
        # Sort events by starting times
        sorted_events = sorted(events, key=lambda x: x[0])
        
        for i in range(1, len(sorted_events)):
            current_start = sorted_events[i][0]
            previous_end = sorted_events[i-1][1]
            if current_start < previous_end:
                return False
        return True

    @staticmethod
    def min_rooms_required(events) -> int:
        if not events:
            return 0
            
        starts = sorted([e[0] for e in events])
        ends = sorted([e[1] for e in events])
        
        start_ptr = 0
        end_ptr = 0
        rooms = 0
        max_rooms = 0
        
        while start_ptr < len(events):
            if starts[start_ptr] < ends[end_ptr]:
                rooms += 1
                start_ptr += 1
            else:
                rooms -= 1
                end_ptr += 1
            max_rooms = max(max_rooms, rooms)
            
        return max_rooms

# Example Usage
if __name__ == "__main__":
    # Test case 1
    events1 = [(9, 10), (10, 11), (11, 12)]
    can_attend1 = EventScheduler.can_attend_all(events1)
    rooms1 = EventScheduler.min_rooms_required(events1)
    print(f"events1 = {events1} -> can_attend_all: {can_attend1}, min_rooms_required: {rooms1}")
    # Output: True, 1

    # Test case 2
    events2 = [(9, 11), (10, 12), (11, 13)]
    can_attend2 = EventScheduler.can_attend_all(events2)
    rooms2 = EventScheduler.min_rooms_required(events2)
    print(f"events2 = {events2} -> can_attend_all: {can_attend2}, min_rooms_required: {rooms2}")
    # Output: False, 2
`;
