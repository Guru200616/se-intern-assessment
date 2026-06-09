export const buildStandaloneHTML = (authorName: string): string => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Data Structures & Systems Design (SE Intern) - ${authorName}</title>
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace'],
          },
          colors: {
            'github-dark': '#0D1117',
            'github-text': '#E6EDF3',
            'accent-blue': '#58A6FF',
            'accent-green': '#3FB950',
            'accent-orange': '#FF7B4F',
            'github-muted': '#8B949E',
            'code-bg': '#161B22',
            'github-border': '#21262D',
          }
        }
      }
    }
  </script>
  
  <!-- Prism.js Syntax Highlighting CDN -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-dark.min.css">
  <style>
    html {
      scroll-behavior: smooth;
    }
    body {
      background-color: #0D1117;
      color: #E6EDF3;
    }
    /* Simple scrollbar styling */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #0D1117;
    }
    ::-webkit-scrollbar-thumb {
      background: #21262D;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #30363D;
    }
    /* Prism style overrides for github integration */
    pre[class*="language-"] {
      background: #161B22 !important;
      border: 1px solid #21262D;
      margin: 0 !important;
      border-radius: 0 0 0.5rem 0.5rem !important;
      font-size: 0.875rem !important;
    }
    code[class*="language-"] {
      font-family: 'JetBrains Mono', monospace !important;
      text-shadow: none !important;
    }
    /* Highlight table hover */
    .table-row-hover:hover {
      background-color: #21262D !important;
      transition: background-color 0.15s ease-in-out;
    }
    /* Scrollspy highlighting animation */
    .nav-link.active {
      color: #58A6FF !important;
      border-bottom: 2px solid #58A6FF;
    }
    .badge-card {
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
    }
    .badge-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px -10px rgba(88, 166, 255, 0.15);
    }
  </style>
</head>
<body class="font-sans antialiased text-github-text bg-github-dark selection:bg-accent-blue/20">

  <!-- Sticky Top Nav -->
  <nav class="sticky top-0 z-50 w-full bg-github-dark/95 backdrop-blur border-b border-github-border">
    <div class="max-w-[860px] mx-auto px-4 py-3 flex items-center justify-between">
      <div class="font-mono text-sm font-medium tracking-tight">
        <span class="text-accent-blue">${authorName}</span>
        <span class="text-github-muted"> · SE Intern Assignment</span>
      </div>
      <div class="flex items-center space-x-6 text-xs font-semibold">
        <a href="#lru-cache" class="nav-link text-github-muted hover:text-github-text pb-1 transition duration-150">LRU Cache</a>
        <a href="#event-scheduler" class="nav-link text-github-muted hover:text-github-text pb-1 transition duration-150">Event Scheduler</a>
        <a href="#analysis" class="nav-link text-github-muted hover:text-github-text pb-1 transition duration-150">Analysis</a>
      </div>
    </div>
  </nav>

  <main class="max-w-[860px] mx-auto px-4 py-12 space-y-16">
    
    <!-- Hero / Title -->
    <header class="pb-8 border-b border-github-border space-y-4">
      <div class="flex items-center space-x-2 text-xs font-mono font-medium tracking-wider text-accent-blue uppercase">
        <span>SOFTWARE ENGINEERING INTERN ASSIGNMENT</span>
        <span>•</span>
        <span>JUNE 2026</span>
      </div>
      <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Data Structures &<br class="hidden sm:inline"> Systems Design Write-up
      </h1>
      <p class="text-lg text-github-muted leading-relaxed max-w-2xl">
        A comprehensive submission featuring absolute complexity analyses, structural trade-offs, and optimized Python implementations for dual-system scenarios: an cache paging engine and room-allocating scheduler.
      </p>
      
      <!-- Submission Metadata -->
      <div class="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-github-border/40 text-xs font-mono">
        <div>
          <span class="text-github-muted">SUBMITTED BY:</span>
          <div class="font-semibold text-white mt-0.5">${authorName}</div>
        </div>
        <div>
          <span class="text-github-muted">EVALUATION TOPICS:</span>
          <div class="font-semibold text-white mt-0.5 mt-0.5">LRU Cache & Event Scheduler</div>
        </div>
        <div>
          <span class="text-github-muted">TARGET POSITION:</span>
          <div class="font-semibold text-white mt-0.5">Software Engineering Intern</div>
        </div>
      </div>
    </header>

    <!-- PROBLEM 01: LRU CACHE -->
    <section id="lru-cache" class="scroll-mt-20">
      <div class="bg-github-dark rounded-xl border border-github-border p-6 sm:p-8 border-l-4 border-l-accent-blue space-y-6">
        
        <div class="space-y-1">
          <span class="text-xs font-mono font-bold tracking-widest text-accent-blue uppercase">PROBLEM 01</span>
          <h2 class="text-2xl font-bold tracking-tight text-white font-sans">LRU Cache Implementation</h2>
        </div>

        <div class="space-y-4 leading-relaxed font-sans text-[15px]">
          <p>
            An <strong>LRU (Least Recently Used) Cache</strong> requires bounded memory limits by evicting items that haven't been accessed for the longest time when the cache stretches to capacity. 
          </p>
          <div class="bg-code-bg border border-github-border rounded-lg p-4 font-mono text-xs text-accent-blue space-y-1">
            <span class="font-semibold">Core Strategy:</span>
            <p class="text-github-text mt-1 text-xs font-sans leading-normal">
              Uses a <strong>Hash Map + Doubly Linked List</strong>. The hash map maps a key to its corresponding Node, enabling fast <code>O(1)</code> node lookups. The Doubly Linked List maintains the temporal usage order of keys: the <strong>Most Recently Used (MRU)</strong> node is positioned at the head, and the <strong>Least Recently Used (LRU)</strong> node resides at the tail. Both <code>get()</code> and <code>put()</code> operations perform in strict <code>O(1)</code> time.
            </p>
          </div>
        </div>

        <!-- Complexity Badges (Problem 1) -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
          <div class="badge-card bg-code-bg rounded-xl border border-github-border p-4 flex flex-col items-center justify-center text-center">
            <span class="text-4xl font-extrabold text-accent-blue font-mono">O(1)</span>
            <span class="text-[11px] font-mono tracking-wider text-github-muted mt-2 uppercase"><code>get(key)</code> Time</span>
          </div>
          <div class="badge-card bg-code-bg rounded-xl border border-github-border p-4 flex flex-col items-center justify-center text-center">
            <span class="text-4xl font-extrabold text-accent-blue font-mono">O(1)</span>
            <span class="text-[11px] font-mono tracking-wider text-github-muted mt-2 uppercase"><code>put(key, val)</code> Time</span>
          </div>
          <div class="badge-card bg-code-bg rounded-xl border border-github-border p-4 flex flex-col items-center justify-center text-center">
            <span class="text-4xl font-extrabold text-accent-blue font-mono">O(C)</span>
            <span class="text-[11px] font-mono tracking-wider text-github-muted mt-2 uppercase">Storage Space (Capacity)</span>
          </div>
        </div>

        <!-- LRU Cache Simulator Panel -->
        <div class="bg-code-bg border border-github-border rounded-xl p-5 space-y-4">
          <div class="flex items-center justify-between border-b border-github-border pb-3">
            <div class="flex items-center space-x-2">
              <span class="w-2.5 h-2.5 rounded-full bg-accent-blue"></span>
              <h3 class="text-xs font-mono font-bold tracking-wider text-white uppercase">Interactive LRU Cache Simulator</h3>
            </div>
            <div class="text-xs font-mono text-github-muted">React &amp; Vanilla JS Mock Engine</div>
          </div>

          <!-- Controls grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-mono text-github-muted mb-1">CACHE CAPACITY:</label>
                <select id="lru-capacity-select" class="w-full bg-github-dark border border-github-border rounded px-3 py-1.5 focus:outline-none focus:border-accent-blue font-mono text-xs">
                  <option value="2">2 Nodes (Optimal for seeing eviction)</option>
                  <option value="3" selected>3 Nodes</option>
                  <option value="4">4 Nodes</option>
                </select>
              </div>

              <div class="flex gap-2">
                <div class="w-1/2">
                  <label class="block text-xs font-mono text-github-muted mb-1">KEY (Int):</label>
                  <input type="number" id="lru-key-input" value="1" min="1" max="99" class="w-full bg-github-dark border border-github-border rounded px-3 py-1.5 focus:outline-none focus:border-accent-blue font-mono text-xs">
                </div>
                <div class="w-1/2">
                  <label class="block text-xs font-mono text-github-muted mb-1">VALUE (Int):</label>
                  <input type="number" id="lru-val-input" value="10" min="1" max="999" class="w-full bg-github-dark border border-github-border rounded px-3 py-1.5 focus:outline-none focus:border-accent-blue font-mono text-xs">
                </div>
              </div>

              <div class="flex gap-2 pt-1">
                <button onclick="runLruPut()" class="flex-1 bg-accent-blue/10 hover:bg-accent-blue/25 border border-accent-blue text-accent-blue rounded py-2 text-xs font-semibold font-mono tracking-wide transition">
                  PUT(key, val)
                </button>
                <button onclick="runLruGet()" class="flex-1 bg-github-border hover:bg-github-border/80 border border-github-border text-white rounded py-2 text-xs font-semibold font-mono tracking-wide transition">
                  GET(key)
                </button>
              </div>
            </div>

            <!-- Memory View state -->
            <div class="bg-github-dark border border-github-border rounded-lg p-3 flex flex-col h-[184px]">
              <span class="text-[10px] font-mono text-github-muted uppercase block border-b border-github-border/30 pb-1.5 mb-2">Internal Cache State</span>
              
              <!-- HashMap -->
              <div class="mb-2">
                <span class="text-[10px] font-mono text-accent-blue block mb-1">HASH MAP:</span>
                <div id="lru-hashmap-view" class="font-mono text-xs flex flex-wrap gap-2 text-github-muted">
                  <!-- dynamically updated -->
                </div>
              </div>

              <!-- Linked list -->
              <div class="flex-1 flex flex-col justify-end">
                <span class="text-[10px] font-mono text-accent-blue block mb-1">DOUBLY LINKED LIST (MRU on Left, LRU on Right):</span>
                <div id="lru-list-view" class="flex items-center space-x-1.5 font-mono text-[11px] overflow-x-auto pb-1">
                  <!-- dynamically filled -->
                </div>
              </div>
            </div>
          </div>

          <!-- Logs Output -->
          <div class="bg-github-dark border border-github-border rounded-lg p-3">
            <span class="text-[10px] font-mono text-github-muted uppercase block border-b border-github-border/30 pb-1 mb-1">Simulation Event Log</span>
            <div id="lru-logs" class="max-h-[90px] overflow-y-auto font-mono text-[11px] text-github-muted py-1 space-y-1">
              <!-- filled on interact -->
            </div>
          </div>
        </div>

        <!-- IDE / Code Window -->
        <div class="space-y-2">
          <div class="flex items-center justify-between text-xs text-github-muted px-1 font-mono">
            <span>EXECUTABLE SOURCE CODE</span>
            <span>lru_cache.py</span>
          </div>

          <div class="rounded-lg overflow-hidden border border-github-border">
            <!-- macOS header window -->
            <div class="bg-[#161B22] border-b border-github-border px-4 py-3 flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <span class="w-3 h-3 rounded-full bg-[#FF5F56]"></span>
                <span class="w-3 h-3 rounded-full bg-[#FFBD2E]"></span>
                <span class="w-3 h-3 rounded-full bg-[#27C93F]"></span>
                <span class="text-xs font-mono text-github-muted ml-2">python</span>
              </div>
              <button onclick="copyCode('lru-code-text', 'lru-copy-btn')" id="lru-copy-btn" class="bg-github-dark hover:bg-github-border border border-github-border text-xs text-github-text hover:text-white px-2.5 py-1 rounded font-mono transition flex items-center space-x-1">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
                <span>Copy</span>
              </button>
            </div>
            <pre><code class="language-python" id="lru-code-text">class Node:
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
    print("get(4):", cache.get(4)) # returns 4</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- PROBLEM 02: EVENT SCHEDULER -->
    <section id="event-scheduler" class="scroll-mt-20">
      <div class="bg-github-dark rounded-xl border border-github-border p-6 sm:p-8 border-l-4 border-l-accent-green space-y-6">
        
        <div class="space-y-1">
          <span class="text-xs font-mono font-bold tracking-widest text-accent-green uppercase">PROBLEM 02</span>
          <h2 class="text-2xl font-bold tracking-tight text-white font-sans">Event Scheduler</h2>
        </div>

        <div class="space-y-4 leading-relaxed text-[15px] font-sans">
          <p>
            The Event Scheduler problem addresses multi-interval operations, verifying absolute schedule viability or minimizing raw resources (conferencing spaces) required to support a concurrent layout.
          </p>
          <p>
            Two static methods inside <code>class EventScheduler</code> provide algorithmic execution for these workloads:
          </p>

          <!-- Method 1: can_attend_all -->
          <div class="bg-code-bg border border-github-border rounded-lg p-4 font-sans text-xs space-y-1.5">
            <div class="flex items-center space-x-1 font-mono font-bold text-accent-green text-[13px] uppercase">
              <span>METHOD A:</span>
              <code>can_attend_all(events)</code>
            </div>
            <ul class="list-disc pl-5 text-github-text text-xs space-y-1 mt-1 leading-normal">
              <li><strong>Sort</strong> the set of events by start time.</li>
              <li>Iterate and check sequence: if <code>current_start &lt; previous_end</code>, an overlap exists &rarr; return <code>False</code>.</li>
              <li>Adjacent endpoints like <code>(9,10)</code> and <code>(10,11)</code> are <strong>strictly allowed</strong> (do not form an overlap).</li>
              <li>If the entire array reveals zero conflicts, return <code>True</code> indicating attendance viability.</li>
            </ul>
          </div>

          <!-- Method 2: min_rooms_required -->
          <div class="bg-code-bg border border-github-border rounded-lg p-4 font-sans text-xs space-y-1.5">
            <div class="flex items-center space-x-1 font-mono font-bold text-accent-green text-[13px] uppercase">
              <span>METHOD B:</span>
              <code>min_rooms_required(events)</code>
            </div>
            <ul class="list-disc pl-5 text-github-text text-xs space-y-1 mt-1 leading-normal">
              <li>Separate all starting times and ending times into <strong>two distinct sorted arrays</strong> (<code>starts</code> and <code>ends</code>).</li>
              <li>Maintain two index indicators (pointers): if <code>starts[start_ptr] &lt; ends[end_ptr]</code>, increment contemporary room counts and shift <code>start_ptr</code>. Otherwise, decrement room load index and move <code>end_ptr</code>.</li>
              <li>Capture the peak high-water-mark of <code>rooms</code> throughout the traversal &mdash; this represents the minimum required rooms.</li>
              <li>This classic sweep-line system avoids expensive <code>O(N²)</code> nested comparison pipelines.</li>
            </ul>
          </div>
        </div>

        <!-- Complexity Badges (Problem 2) -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
          <div class="badge-card bg-code-bg rounded-xl border border-github-border p-4 flex flex-col items-center justify-center text-center">
            <span class="text-4xl font-extrabold text-accent-green font-mono">O(N log N)</span>
            <span class="text-[11px] font-mono tracking-wider text-github-muted mt-2 uppercase"><code>can_attend_all</code> Time</span>
          </div>
          <div class="badge-card bg-code-bg rounded-xl border border-github-border p-4 flex flex-col items-center justify-center text-center">
            <span class="text-4xl font-extrabold text-accent-green font-mono">O(N log N)</span>
            <span class="text-[11px] font-mono tracking-wider text-github-muted mt-2 uppercase"><code>min_rooms_required</code> Time</span>
          </div>
          <div class="badge-card bg-code-bg rounded-xl border border-github-border p-4 flex flex-col items-center justify-center text-center">
            <span class="text-4xl font-extrabold text-accent-green font-mono">O(N)</span>
            <span class="text-[11px] font-mono tracking-wider text-github-muted mt-2 uppercase">Space Complexity</span>
          </div>
        </div>

        <!-- Event Scheduler Simulator Panel -->
        <div class="bg-code-bg border border-github-border rounded-xl p-5 space-y-4">
          <div class="flex items-center justify-between border-b border-github-border pb-3">
            <div class="flex items-center space-x-2">
              <span class="w-2.5 h-2.5 rounded-full bg-accent-green"></span>
              <h3 class="text-xs font-mono font-bold tracking-wider text-white uppercase">Interactive Event Scheduler Playground</h3>
            </div>
            <div class="text-xs font-mono text-github-muted">Sweep-Line &amp; Lane Allocation</div>
          </div>

          <!-- Dataset select buttons -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
            <button onclick="setSchedulerPreset(1)" id="preset-btn-1" class="border border-accent-green text-accent-green bg-accent-green/10 text-xs font-semibold py-2 rounded font-mono transition">
              Dataset 1 (Sequential)<br/>
              <span class="text-[10px] font-normal text-github-muted">[(9,10), (10,11), (11,12)]</span>
            </button>
            <button onclick="setSchedulerPreset(2)" id="preset-btn-2" class="border border-github-border text-github-muted hover:bg-github-border/40 text-xs font-semibold py-2 rounded font-mono transition">
              Dataset 2 (Overlapping)<br/>
              <span class="text-[10px] font-normal text-github-muted">[(9,11), (10,12), (11,13)]</span>
            </button>
            <button onclick="setSchedulerPreset(3)" id="preset-btn-3" class="border border-github-border text-github-muted hover:bg-github-border/40 text-xs font-semibold py-2 rounded font-mono transition">
              Dataset 3 (Mixed Heavy)<br/>
              <span class="text-[10px] font-normal text-github-muted">[(9,13), (10,11), (12,14)]</span>
            </button>
          </div>

          <!-- Results -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 py-1.5">
            <div class="bg-github-dark border border-github-border rounded-lg p-3 flex items-center justify-between">
              <div>
                <span class="text-[10px] font-mono text-github-muted uppercase block">CAN ATTEND ALL?</span>
                <span id="sched-attend-text" class="text-lg font-bold font-mono text-accent-green mt-1 block">True</span>
              </div>
              <div id="sched-attend-badge" class="px-2.5 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider bg-accent-green/20 text-accent-green">
                SUCCESS
              </div>
            </div>

            <div class="bg-github-dark border border-github-border rounded-lg p-3 flex items-center justify-between">
              <div>
                <span class="text-[10px] font-mono text-github-muted uppercase block font-sans">MIN ROOMS REQUIRED:</span>
                <span id="sched-rooms-text" class="text-lg font-bold font-mono text-accent-blue mt-1 block">1 Room</span>
              </div>
              <div class="px-2.5 py-1 rounded text-xs font-mono font-bold uppercase bg-accent-blue/10 border border-accent-blue/40 text-accent-blue">
                OPTIMIZED
              </div>
            </div>
          </div>

          <!-- Gantt chart Room lane view -->
          <div class="bg-github-dark border border-github-border rounded-lg p-4 space-y-3">
            <span class="text-[10px] font-mono text-github-muted uppercase block border-b border-github-border/30 pb-1.5">Room Allocation Lane Timeline (Gantt representation)</span>
            <div id="sched-timeline" class="space-y-4 pt-1 text-xs font-mono">
              <!-- dynamically constructed -->
            </div>
          </div>
        </div>

        <!-- IDE / Code Window -->
        <div class="space-y-2">
          <div class="flex items-center justify-between text-xs text-github-muted px-1 font-mono">
            <span>EXECUTABLE SOURCE CODE</span>
            <span>event_scheduler.py</span>
          </div>

          <div class="rounded-lg overflow-hidden border border-github-border">
            <div class="bg-[#161B22] border-b border-github-border px-4 py-3 flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <span class="w-3 h-3 rounded-full bg-[#FF5F56]"></span>
                <span class="w-3 h-3 rounded-full bg-[#FFBD2E]"></span>
                <span class="w-3 h-3 rounded-full bg-[#27C93F]"></span>
                <span class="text-xs font-mono text-github-muted ml-2">python</span>
              </div>
              <button onclick="copyCode('sched-code-text', 'sched-copy-btn')" id="sched-copy-btn" class="bg-github-dark hover:bg-github-border border border-github-border text-xs text-github-text hover:text-white px-2.5 py-1 rounded font-mono transition flex items-center space-x-1">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002 2h2a2 2 0 002-2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
                <span>Copy</span>
              </button>
            </div>
            <pre><code class="language-python" id="sched-code-text">class EventScheduler:
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
    # Output: False, 2</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 03: ANALYSIS & DISCUSSION -->
    <section id="analysis" class="scroll-mt-20">
      <div class="bg-github-dark rounded-xl border border-github-border p-6 sm:p-8 border-l-4 border-l-accent-orange space-y-10">
        
        <div class="space-y-1">
          <span class="text-xs font-mono font-bold tracking-widest text-accent-orange uppercase">ANALYSIS &amp; FINDINGS</span>
          <h2 class="text-2xl font-bold tracking-tight text-white font-sans">Final Discussion &amp; Trade-offs</h2>
        </div>

        <!-- Subsection 1: Tradeoffs -->
        <div class="space-y-4">
          <h3 class="text-[17px] font-bold text-white tracking-wide border-b border-github-border/40 pb-2 flex items-center space-x-2">
            <span class="text-accent-orange text-[15px] font-mono">1.</span>
            <span>Why Combine a Hash Map and a Doubly Linked List?</span>
          </h3>
          <div class="space-y-4 font-sans text-sm text-github-text leading-relaxed">
            <p>
              An LRU Cache operates under opposing forces: constant time insertion, lookup, and deletion. No single data structure natively satisfies all properties simultaneously:
            </p>
            <ul class="list-disc pl-5 space-y-2 text-github-muted">
              <li><strong class="text-white">Hash Map alone:</strong> Possesses outstanding <code>O(1)</code> lookup, updates, and deletion times via hashed indexing keys, but is structurally flat; it possesses no ordering vectors, rendering it blind to temporal element sequence.</li>
              <li><strong class="text-white">Doubly Linked List alone:</strong> Natively maintains explicit order boundaries. Adjusting node positions or deleting endpoints is consistently <code>O(1)</code> once a reference is established. However, searching for a specific key is <code>O(N)</code>.</li>
            </ul>

            <!-- Trade-off Comparison Table -->
            <div class="overflow-x-auto rounded-lg border border-github-border mt-6">
              <table class="w-full text-left font-sans text-sm pb-1">
                <thead>
                  <tr class="bg-code-bg border-b border-github-border text-xs font-mono font-bold tracking-wider text-accent-blue uppercase">
                    <th class="py-3 px-4 font-mono">TECHNICAL OPERATION</th>
                    <th class="py-3 px-4 font-mono">HASH MAP ONLY</th>
                    <th class="py-3 px-4 font-mono">DOUBLY LINKED LIST ONLY</th>
                    <th class="py-3 px-4 font-mono bg-accent-blue/10">COMBINED ADVANTAGE</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-github-border bg-github-dark font-sans">
                  <tr class="table-row-hover">
                    <td class="py-3 px-4 font-medium text-white">Fast Lookup?</td>
                    <td class="py-3 px-4 text-emerald-500 font-bold">✅ <span class="text-[11px] font-mono font-normal block text-github-muted">O(1) search</span></td>
                    <td class="py-3 px-4 text-rose-500/70">❌ <span class="text-[11px] font-mono font-normal block text-github-muted">O(N) search</span></td>
                    <td class="py-3 px-4 text-emerald-500 font-bold bg-accent-blue/5">✅ <span class="text-[11px] font-mono font-normal block text-github-text">O(1) absolute</span></td>
                  </tr>
                  <tr class="table-row-hover">
                    <td class="py-3 px-4 font-medium text-white">Maintain Order?</td>
                    <td class="py-3 px-4 text-rose-500/70">❌ <span class="text-[11px] font-mono font-normal block text-github-muted">No sequencing</span></td>
                    <td class="py-3 px-4 text-emerald-500 font-bold">✅ <span class="text-[11px] font-mono font-normal block text-github-muted">Logical sorting</span></td>
                    <td class="py-3 px-4 text-emerald-500 font-bold bg-accent-blue/5">✅ <span class="text-[11px] font-mono font-normal block text-github-text">MRU &rarr; LRU</span></td>
                  </tr>
                  <tr class="table-row-hover">
                    <td class="py-3 px-4 font-medium text-white">O(1) Eviction?</td>
                    <td class="py-3 px-4 text-rose-500/70">❌ <span class="text-[11px] font-mono font-normal block text-github-muted">Requires O(N) scan</span></td>
                    <td class="py-3 px-4 text-emerald-500 font-bold">✅ <span class="text-[11px] font-mono font-normal block text-github-muted">Tail removal O(1)</span></td>
                    <td class="py-3 px-4 text-emerald-500 font-bold bg-accent-blue/5">✅ <span class="text-[11px] font-mono font-normal block text-github-text">No scan search</span></td>
                  </tr>
                  <tr class="table-row-hover">
                    <td class="py-3 px-4 font-medium text-white">O(1) Node Update?</td>
                    <td class="py-3 px-4 text-emerald-500 font-bold">✅ <span class="text-[11px] font-mono font-normal block text-github-muted">Key replacement</span></td>
                    <td class="py-3 px-4 text-emerald-500 font-bold">✅ <span class="text-[11px] font-mono font-normal block text-github-muted">Pointer swap</span></td>
                    <td class="py-3 px-4 text-emerald-500 font-bold bg-accent-blue/5">✅ <span class="text-[11px] font-mono font-normal block text-github-text">Instant reposition</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p class="text-xs text-github-muted mt-2">
              <strong>Combined Outcome:</strong> By wrapping the doubly linked list nodes within hash map hash values, we can immediately pull active list references inside <code>O(1)</code> space, rearranging linkages on access or evicting tail pointers instantly. Both data flows synthesize into a fault-tolerant caching core.
            </p>
          </div>
        </div>

        <!-- Subsection 2: Concurrency -->
        <div class="space-y-4">
          <h3 class="text-[17px] font-bold text-white tracking-wide border-b border-github-border/40 pb-2 flex items-center space-x-2">
            <span class="text-accent-orange text-[15px] font-mono">2.</span>
            <span>Concurrency — Making LRU Cache Thread-Safe</span>
          </h3>
          <p class="text-sm font-sans text-github-text leading-relaxed">
            In production multi-threaded runtime loops, overlapping concurrent reads and writes corrupt internal listing points. To keep the cache safe, we analyze three main approaches:
          </p>

          <!-- Concurrency Options Horizontal Cards -->
          <div class="space-y-3 pt-1">
            
            <!-- Option 1 -->
            <div class="bg-code-bg border border-github-border rounded-lg p-4 flex gap-4 items-start">
              <span class="bg-accent-orange/10 text-accent-orange font-mono font-bold px-2.5 py-1 rounded text-xs">01</span>
              <div class="space-y-1.5 flex-1">
                <h4 class="text-sm font-bold text-white">Global Lock (Mutex Synchronizer)</h4>
                <p class="text-xs text-github-muted">
                  Places an exclusive lock/mutex wrapper around both <code>get()</code> and <code>put()</code> functions. Every operation acquires the lock, executes, and releases.
                </p>
                <div class="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono pt-1 text-github-muted">
                  <span><strong class="text-emerald-500 font-normal">Pros:</strong> Absolute simple security, deadlock-free.</span>
                  <span><strong class="text-rose-400 font-normal">Cons:</strong> Severe execution bottlenecks.</span>
                </div>
              </div>
            </div>

            <!-- Option 2 -->
            <div class="bg-code-bg border border-github-border rounded-lg p-4 flex gap-4 items-start">
              <span class="bg-accent-blue/10 text-accent-blue font-mono font-bold px-2.5 py-1 rounded text-xs">02</span>
              <div class="space-y-1.5 flex-1">
                <h4 class="text-sm font-bold text-white">Read-Write Lock (Shared/Exclusive Split)</h4>
                <p class="text-xs text-github-muted">
                  Splits operations: multiple threads can read concurrent keys simultaneously (shares read locks), but updates require unique exclusive write-lock privileges.
                </p>
                <div class="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono pt-1 text-github-muted">
                  <span><strong class="text-emerald-500 font-normal">Pros:</strong> Greatly accelerates read-heavy pipelines.</span>
                  <span><strong class="text-rose-400 font-normal">Cons:</strong> DLL nodes shift on <code>get()</code>, making reads act as structural writes.</span>
                </div>
              </div>
            </div>

            <!-- Option 3 -->
            <div class="bg-code-bg border border-github-border rounded-lg p-4 flex gap-4 items-start">
              <span class="bg-accent-green/10 text-accent-green font-mono font-bold px-2.5 py-1 rounded text-xs">03</span>
              <div class="space-y-1.5 flex-1">
                <h4 class="text-sm font-bold text-white">Fine-Grained Locking &amp; Bucket Sharding</h4>
                <p class="text-xs text-github-muted">
                  Splits key ranges into segmented chunks (hash buckets), compiling separate locks per shard. Access to key A inside slice 1 never blocks key B inside slice 2.
                </p>
                <div class="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono pt-1 text-github-muted">
                  <span><strong class="text-emerald-500 font-normal">Pros:</strong> Maximum high-end operations scale.</span>
                  <span><strong class="text-rose-400 font-normal">Cons:</strong> Extremely complex, high danger of circular race status.</span>
                </div>
              </div>
            </div>

            <div class="bg-accent-blue/5 border border-accent-blue/20 rounded-lg p-3 text-xs font-sans text-github-muted leading-relaxed mt-2.5">
              <strong class="text-accent-blue">Production Recommendation:</strong> An ideal architecture leverages a robust <strong class="text-white">Read-Write Split or Segmented Sharding setup</strong>. Because even <code>get()</code> mutates list order, some database models implement lazy cache sweeps or write-queue consolidations to keep threads operating efficiently without bottlenecks.
            </div>
          </div>
        </div>

        <!-- Subsection 3: Room Assignment / Future Proofing -->
        <div class="space-y-4">
          <h3 class="text-[17px] font-bold text-white tracking-wide border-b border-github-border/40 pb-2 flex items-center space-x-2">
            <span class="text-accent-orange text-[15px] font-mono">3.</span>
            <span>Future Proofing — Assigning Specific Room Numbers</span>
          </h3>
          <div class="space-y-3 font-sans text-sm text-github-text leading-relaxed">
            <p>
              In base interval-scheduling workloads, finding the maximum concurrency returns an integer number of rooms. However, real-world systems must assign <strong>explicit Room Numbers/Identifiers</strong> (e.g., <em>Room A</em>, <em>Room B</em>, <em>Room C</em>...) to each event without overlap.
            </p>
            <p>
              We can maintain an efficient allocation schema by employing a <strong>Min-Heap / Priority Queue of Free Room IDs</strong>:
            </p>
            
            <div class="bg-code-bg border border-github-border rounded-lg p-4 font-mono text-xs space-y-1 mt-2">
              <div class="text-accent-orange font-bold uppercase mb-1">Heap Allocation Algorithm:</div>
              <ul class="list-decimal pl-4 text-github-text space-y-2 font-sans text-xs leading-relaxed">
                <li>Create a priority queue (min-heap) of available names/indexes: <code>["Room A", "Room B", "Room C", ...]</code>.</li>
                <li>Process all sessions chronologically (sorted by start time).</li>
                <li>When an event starts: pop the smallest ID from the heap, assign it to that meeting, and add its return mapping to a calendar timeline.</li>
                <li>When an event concludes: push the recovered Room ID back into the min-heap structure, reserving it for subsequent allocation.</li>
                <li>By reusing expired slots, we avoid unnecessary space creations while maintaining efficient scheduling bounds.</li>
              </ul>
            </div>

            <div class="bg-github-dark border border-github-border rounded-lg p-3 text-xs flex flex-col font-mono text-github-muted">
              <span class="text-[10px] text-accent-green uppercase mb-1.5 block">Allocation Timeline Trace:</span>
              <div class="space-y-1 text-xs">
                <div><code>(09:00, 11:00)</code> &rarr; POPS heap slot &rarr; Assigned <strong class="text-white">Room A</strong></div>
                <div><code>(10:00, 12:00)</code> &rarr; POPS heap slot &rarr; Overlaps active Room A &rarr; Assigned <strong class="text-white">Room B</strong></div>
                <div><code>(12:00, 13:00)</code> &rarr; Room A has expired. Re-enters heap. POPS &rarr; Assigned <strong class="text-white">Room A</strong></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

  </main>

  <!-- Footer -->
  <footer class="bg-code-bg border-t border-github-border py-8 px-4 text-center text-xs font-mono text-github-muted">
    <div class="max-w-[860px] mx-auto space-y-2">
      <p class="text-white font-medium">${authorName} &bull; B.E. Computer Science Engineering</p>
      <p>Chendhuran College of Engineering &bull; <a href="https://github.com/Guru200616" class="hover:text-accent-blue transition duration-150 underline">github.com/Guru200616</a></p>
      <p class="text-[10px] text-github-muted/60 mt-4">&copy; 2026 Guru Rengarajan. Standard Systems &amp; DS Submission. Crafted in High-Density Studio Workspace.</p>
    </div>
  </footer>

  <!-- Simulator Scripts and Logic -->
  <script>
    // --- COPY TO CLIPBOARD ---
    function copyCode(elementId, btnId) {
      const codeText = document.getElementById(elementId).innerText;
      navigator.clipboard.writeText(codeText).then(() => {
        const btn = document.getElementById(btnId);
        const originalHtml = btn.innerHTML;
        btn.innerHTML = \`<svg class="w-3.5 h-3.5 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg><span class="text-accent-green">Copied!</span>\`;
        setTimeout(() => {
          btn.innerHTML = originalHtml;
        }, 1500);
      });
    }

    // --- LRU CACHE SIMULATOR ENGINE ---
    let lruCapacity = 3;
    let lruCache = []; // items of {key, val}
    let lruHashMap = {}; // key -> val

    function updateLruUI() {
      // HashMap
      const hmContainer = document.getElementById('lru-hashmap-view');
      const keys = Object.keys(lruHashMap);
      if (keys.length === 0) {
        hmContainer.innerHTML = '<em>{}Empty</em>';
      } else {
        hmContainer.innerHTML = '{ ' + keys.map(k => \`<span class="bg-github-border px-1.5 py-0.5 rounded text-white">\${k}: \${lruHashMap[k]}</span>\`).join(', ') + ' }';
      }

      // List representation
      const listContainer = document.getElementById('lru-list-view');
      let html = '<span class="text-github-muted bg-github-border/30 px-1 py-0.5 rounded text-[10px] uppercase font-bold">Head (MRU)</span>';
      
      if (lruCache.length === 0) {
        html += '<span class="text-github-muted px-2">&harr;</span><span class="italic text-github-muted">Empty Cache</span>';
      } else {
        lruCache.forEach((node, idx) => {
          html += \`<span class="text-github-muted px-1">&harr;</span><span class="bg-accent-blue/10 border border-accent-blue text-accent-blue px-2 py-1 rounded font-bold">\${node.key}[\${node.val}]</span>\`;
        });
      }
      html += '<span class="text-github-muted px-1">&harr;</span><span class="text-github-muted bg-github-border/30 px-1 py-0.5 rounded text-[10px] uppercase font-bold">Tail (LRU)</span>';
      listContainer.innerHTML = html;
    }

    function addLruLog(msg) {
      const logs = document.getElementById('lru-logs');
      const d = new Date();
      const timeStr = d.toTimeString().split(' ')[0];
      const logLine = \`<div class="hover:text-white transition"><span class="text-github-muted">[\${timeStr}]</span> \${msg}</div>\`;
      logs.innerHTML = logLine + logs.innerHTML;
    }

    function runLruPut() {
      const select = document.getElementById('lru-capacity-select');
      lruCapacity = parseInt(select.value);

      const k = parseInt(document.getElementById('lru-key-input').value);
      const v = parseInt(document.getElementById('lru-val-input').value);

      if (isNaN(k) || isNaN(v)) return;

      // if key exists, update and move to MRU
      const existingIdx = lruCache.findIndex(n => n.key === k);
      if (existingIdx !== -1) {
        lruCache.splice(existingIdx, 1);
        lruCache.unshift({key: k, val: v});
        lruHashMap[k] = v;
        addLruLog(\`put(\${k}, \${v}) &rarr; <span class="text-accent-blue">Updated existing value</span>, repositioned Node to Head (MRU)\`);
      } else {
        // new node
        if (lruCache.length >= lruCapacity) {
          const removed = lruCache.pop();
          delete lruHashMap[removed.key];
          addLruLog(\`put(\${k}, \${v}) &rarr; <span class="text-accent-orange">Cache capacity (\${lruCapacity}) reached!</span> Evicted LRU key \${removed.key}, added \${k} at MRU\`);
        } else {
          addLruLog(\`put(\${k}, \${v}) &rarr; <span class="text-accent-green">Inserted new pair</span>. Capacity currently: \${lruCache.length + 1}/\${lruCapacity}\`);
        }
        lruCache.unshift({key: k, val: v});
        lruHashMap[k] = v;
      }
      updateLruUI();
    }

    function runLruGet() {
      const select = document.getElementById('lru-capacity-select');
      lruCapacity = parseInt(select.value);

      const k = parseInt(document.getElementById('lru-key-input').value);
      if (isNaN(k)) return;

      const idx = lruCache.findIndex(n => n.key === k);
      if (idx !== -1) {
        const node = lruCache[idx];
        lruCache.splice(idx, 1);
        lruCache.unshift(node);
        addLruLog(\`get(\${k}) &rarr; <span class="text-accent-green">Cache HIT</span>. Found value: <strong class="text-white">\${node.val}</strong>, promoted to Head (MRU)\`);
      } else {
        addLruLog(\`get(\${k}) &rarr; <span class="text-red-400">Cache MISS</span> (value -1 or not active in hashMap)\`);
      }
      updateLruUI();
    }

    // Initialize LRU
    updateLruUI();
    addLruLog('LRU cache environment initialized. Initial capacity selection is set to 3.');

    // --- EVENT SCHEDULER PLAYGROUND ---
    const presets = {
      1: [{start: 9, end: 10}, {start: 10, end: 11}, {start: 11, end: 12}],
      2: [{start: 9, end: 11}, {start: 10, end: 12}, {start: 11, end: 13}],
      3: [{start: 9, end: 13}, {start: 10, end: 11}, {start: 12, end: 14}]
    };

    let activeEvents = presets[1];

    function setSchedulerPreset(id) {
      activeEvents = presets[id];
      for (let i = 1; i <= 3; i++) {
        const btn = document.getElementById('preset-btn-' + i);
        if (i === id) {
          btn.className = "border border-accent-green text-accent-green bg-accent-green/10 text-xs font-semibold py-2 rounded font-mono transition";
        } else {
          btn.className = "border border-github-border text-github-muted hover:bg-github-border/40 text-xs font-semibold py-2 rounded font-mono transition";
        }
      }
      calculateAndRenderScheduler();
    }

    function calculateAndRenderScheduler() {
      // 1. can_attend_all
      const sorted = [...activeEvents].sort((a,b) => a.start - b.start);
      let canAttend = true;
      let conflictPair = null;

      for (let i = 1; i < sorted.length; i++) {
        if (sorted[i].start < sorted[i-1].end) {
          canAttend = false;
          conflictPair = {a: sorted[i-1], b: sorted[i]};
          break;
        }
      }

      // Render canAttend details
      const textNode = document.getElementById('sched-attend-text');
      const badgeNode = document.getElementById('sched-attend-badge');

      if (canAttend) {
        textNode.innerText = 'True (Viable)';
        textNode.className = 'text-lg font-bold font-mono text-accent-green mt-1 block';
        badgeNode.innerText = 'SUCCESS';
        badgeNode.className = 'px-2.5 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider bg-accent-green/20 text-accent-green';
      } else {
        textNode.innerText = 'False (Overlap)';
        textNode.className = 'text-lg font-bold font-mono text-accent-orange mt-1 block';
        badgeNode.innerText = 'CONFLICT';
        badgeNode.className = 'px-2.5 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider bg-accent-orange/20 text-accent-orange';
      }

      // 2. min_rooms_required and visual allocation
      // Sweep pointer simulation
      const starts = activeEvents.map(e => e.start).sort((a,b) => a-b);
      const ends = activeEvents.map(e => e.end).sort((a,b) => a-b);
      let roomsNeeded = 0;
      let roomsPeak = 0;
      let sPtr = 0, ePtr = 0;

      while (sPtr < starts.length) {
        if (starts[sPtr] < ends[ePtr]) {
          roomsNeeded++;
          sPtr++;
        } else {
          roomsNeeded--;
          ePtr++;
        }
        roomsPeak = Math.max(roomsPeak, roomsNeeded);
      }

      document.getElementById('sched-rooms-text').innerText = roomsPeak + (roomsPeak === 1 ? ' Room' : ' Rooms');

      // Heap lane assignment simulation
      const lanes = []; // item is an array of assigned events
      sorted.forEach(e => {
        let placedIdx = -1;
        for (let i = 0; i < lanes.length; i++) {
          const laneEvents = lanes[i];
          const lastEvent = laneEvents[laneEvents.length - 1];
          if (lastEvent.end <= e.start) {
            placedIdx = i;
            break;
          }
        }
        if (placedIdx !== -1) {
          lanes[placedIdx].push(e);
        } else {
          lanes.push([e]);
        }
      });

      // Render Timeline Gantt Graph
      const timeline = document.getElementById('sched-timeline');
      let html = '';

      lanes.forEach((laneLogs, laneIdx) => {
        const laneLetter = String.fromCharCode(65 + laneIdx); // Room A, B, C
        html += \`<div class="flex flex-col sm:flex-row sm:items-center py-2 border-b border-github-border/30 last:border-0">
          <div class="sm:w-24 font-bold text-white mb-2 sm:mb-0">Room \${laneLetter}:</div>
          <div class="flex-1 flex gap-2 overflow-x-auto py-1">\`;
        
        laneLogs.forEach(ev => {
          const spanPercent = (ev.end - ev.start) * 2;
          const leftOffset = (ev.start - 9) * 2;
          html += \`<div class="bg-accent-blue/10 border border-accent-blue text-accent-blue rounded px-3 py-1.5 flex flex-col justify-center min-w-[120px]">
            <span class="text-white font-semibold">Event \${ev.start}:00-\${ev.end}:00</span>
            <span class="text-[10px] text-github-muted mt-0.5">Duration: \${ev.end - ev.start}h</span>
          </div>\`;
        });
        
        html += \`</div></div>\`;
      });

      timeline.innerHTML = html;
    }

    // Run scheduler initial
    calculateAndRenderScheduler();

    // --- NAVIGATION SCROLLSPY ---
    window.addEventListener('DOMContentLoaded', () => {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.nav-link');

      window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          if (pageYOffset >= sectionTop - 120) {
            current = section.getAttribute('id');
          }
        });

        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
          }
        });
      });
    });
  </script>
  
  <!-- Prism.js core trigger after window mount -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js"></script>
</body>
</html>
`;
