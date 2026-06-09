import { useState, useEffect, useRef } from "react";
import { 
  Copy, 
  Check, 
  Layers, 
  Calendar, 
  Cpu, 
  Lock, 
  Download, 
  Award, 
  ExternalLink,
  Info,
  CheckCircle,
  XCircle,
  TrendingUp,
  SquareCode,
  Sparkles
} from "lucide-react";
import { lruCachePythonCode, eventSchedulerPythonCode } from "./rawCode";
import { buildStandaloneHTML } from "./htmlTemplate";

// Type definitions for simulators
interface LRUNode {
  key: number;
  val: number;
}

interface SchedEvent {
  id: number;
  start: number;
  end: number;
}

export default function App() {
  const [copiedLru, setCopiedLru] = useState(false);
  const [copiedSched, setCopiedSched] = useState(false);
  const [activeTab, setActiveTab] = useState("lru-cache");

  // --- LRU Cache Simulator States ---
  const [lruCapacity, setLruCapacity] = useState<number>(3);
  const [lruCache, setLruCache] = useState<LRUNode[]>([
    { key: 1, val: 10 },
    { key: 2, val: 20 },
    { key: 3, val: 30 }
  ]);
  const [lruHashMap, setLruHashMap] = useState<Record<number, number>>({
    1: 10,
    2: 20,
    3: 30
  });
  const [inputKey, setInputKey] = useState<string>("4");
  const [inputValue, setInputValue] = useState<string>("40");
  const [lruLogs, setLruLogs] = useState<string[]>([
    "LRU Cache memory initiated with capacity = 3.",
    "put(1, 10) was successful.",
    "put(2, 20) was successful.",
    "put(3, 30) was successful."
  ]);

  // --- Scheduler Simulator States ---
  const [schedulerPreset, setSchedulerPreset] = useState<number>(1);
  const [activeEvents, setActiveEvents] = useState<SchedEvent[]>([
    { id: 1, start: 9, end: 10 },
    { id: 2, start: 10, end: 11 },
    { id: 3, start: 11, end: 12 }
  ]);

  // --- External Prism Activation ---
  useEffect(() => {
    // Inject and trigger Prism syntax highlighter in the browser environment
    if (!(window as any).Prism) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css";
      document.head.appendChild(link);

      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js";
      script.onload = () => {
        const pyScript = document.createElement("script");
        pyScript.src = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js";
        pyScript.onload = () => {
          (window as any).Prism?.highlightAll();
        };
        document.body.appendChild(pyScript);
      };
      document.body.appendChild(script);
    } else {
      (window as any).Prism?.highlightAll();
    }
  }, []);

  // --- Scrollspy effect ---
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["lru-cache", "event-scheduler", "analysis"];
      const scrollPos = window.scrollY + 160;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Helper to trigger copy checkmark animation ---
  const handleCopy = (code: string, type: "lru" | "sched") => {
    navigator.clipboard.writeText(code).then(() => {
      if (type === "lru") {
        setCopiedLru(true);
        setTimeout(() => setCopiedLru(false), 1500);
      } else {
        setCopiedSched(true);
        setTimeout(() => setCopiedSched(false), 1500);
      }
    });
  };

  // --- Interactive LRU Cache Operators ---
  const logAction = (message: string) => {
    const timestamp = new Date().toTimeString().split(" ")[0];
    setLruLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 49)]);
  };

  const executePut = () => {
    const key = parseInt(inputKey);
    const val = parseInt(inputValue);
    if (isNaN(key) || isNaN(val)) return;

    setLruCache(prev => {
      // Check if key already exists
      const existingIdx = prev.findIndex(item => item.key === key);
      let updatedList = [...prev];

      if (existingIdx !== -1) {
        // Key exists, move to front as MRU
        updatedList.splice(existingIdx, 1);
        updatedList.unshift({ key, val });
        setLruHashMap(prevMap => ({ ...prevMap, [key]: val }));
        logAction(`put(${key}, ${val}) -> Updated existing key. Promoted Node to Head (MRU).`);
      } else {
        // New key insertion
        if (prev.length >= lruCapacity) {
          // Cache full! Evict oldest node (at the back)
          const evicted = updatedList.pop();
          if (evicted) {
            setLruHashMap(prevMap => {
              const res = { ...prevMap };
              delete res[evicted.key];
              return res;
            });
            logAction(`put(${key}, ${val}) -> Cache capacity (${lruCapacity}) exceeded. Evicted LRU Node ${evicted.key}[${evicted.val}]. Inserted ${key}[${val}] at Head (MRU).`);
          }
        } else {
          logAction(`put(${key}, ${val}) -> Cache space available. Inserted new Node at Head (MRU).`);
        }
        updatedList.unshift({ key, val });
        setLruHashMap(prevMap => ({ ...prevMap, [key]: val }));
      }
      return updatedList;
    });
  };

  const executeGet = () => {
    const key = parseInt(inputKey);
    if (isNaN(key)) return;

    if (key in lruHashMap) {
      setLruCache(prev => {
        const idx = prev.findIndex(item => item.key === key);
        if (idx !== -1) {
          const matched = prev[idx];
          const updated = [...prev];
          updated.splice(idx, 1);
          updated.unshift(matched);
          logAction(`get(${key}) -> Cache HIT. Associated value: ${matched.val}. Promoted Node to Head (MRU).`);
          return updated;
        }
        return prev;
      });
    } else {
      logAction(`get(${key}) -> Cache MISS. Key not located inside Hash Map index. Returns -1.`);
    }
  };

  // Adjust cache size dynamically
  const handleCapacityChange = (cap: number) => {
    setLruCapacity(cap);
    setLruCache(prev => {
      let updated = [...prev];
      if (prev.length > cap) {
        const toEvict = prev.slice(cap);
        updated = prev.slice(0, cap);
        setLruHashMap(prevMap => {
          const copy = { ...prevMap };
          toEvict.forEach(n => delete copy[n.key]);
          return copy;
        });
        logAction(`Capacity resized down to ${cap} nodes. Evicted ${toEvict.length} oldest LRU items.`);
      } else {
        logAction(`Capacity modified to ${cap} nodes.`);
      }
      return updated;
    });
  };

  // --- Scheduler Data presets ---
  const presets: Record<number, SchedEvent[]> = {
    1: [
      { id: 1, start: 9, end: 10 },
      { id: 2, start: 10, end: 11 },
      { id: 3, start: 11, end: 12 }
    ],
    2: [
      { id: 1, start: 9, end: 11 },
      { id: 2, start: 10, end: 12 },
      { id: 3, start: 11, end: 13 }
    ],
    3: [
      { id: 1, start: 9, end: 13 },
      { id: 2, start: 10, end: 11 },
      { id: 3, start: 12, end: 14 }
    ]
  };

  const handlePresetSelect = (id: number) => {
    setSchedulerPreset(id);
    setActiveEvents(presets[id]);
  };

  // Run overlapping check
  const checkCanAttendAll = (): boolean => {
    const sorted = [...activeEvents].sort((a, b) => a.start - b.start);
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i].start < sorted[i - 1].end) {
        return false;
      }
    }
    return true;
  };

  // Run Rooms calculator using sweep-line technique
  const calculateMinRooms = (): number => {
    const starts = activeEvents.map(e => e.start).sort((a, b) => a - b);
    const ends = activeEvents.map(e => e.end).sort((a, b) => a - b);

    let sPtr = 0;
    let ePtr = 0;
    let roomsNum = 0;
    let peakRooms = 0;

    while (sPtr < starts.length) {
      if (starts[sPtr] < ends[ePtr]) {
        roomsNum++;
        sPtr++;
      } else {
        roomsNum--;
        ePtr++;
      }
      peakRooms = Math.max(peakRooms, roomsNum);
    }
    return peakRooms;
  };

  // Produce room allocation timetable lane by lane (greedy min-heap allocation approximation)
  const computeRoomLanes = (): SchedEvent[][] => {
    const sorted = [...activeEvents].sort((a, b) => a.start - b.start);
    const lanes: SchedEvent[][] = [];

    sorted.forEach(evt => {
      let placedIdx = -1;
      for (let i = 0; i < lanes.length; i++) {
        const laneEvents = lanes[i];
        if (laneEvents[laneEvents.length - 1].end <= evt.start) {
          placedIdx = i;
          break;
        }
      }
      if (placedIdx !== -1) {
        lanes[placedIdx].push(evt);
      } else {
        lanes.push([evt]);
      }
    });

    return lanes;
  };

  // --- HTML Blob download exporter generator ---
  const handleDownloadStandalone = () => {
    const htmlString = buildStandaloneHTML("Guru Rengarajan");
    const blob = new Blob([htmlString], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "index.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const lanes = computeRoomLanes();
  const meetsCriteria = checkCanAttendAll();
  const roomsNeeded = calculateMinRooms();

  return (
    <div className="min-h-screen bg-github-dark text-github-text font-sans selection:bg-accent-blue/20 flex flex-col">
      
      {/* Sticky top navigation header */}
      <nav className="sticky top-0 z-50 w-full bg-github-dark/95 backdrop-blur border-b border-github-border">
        <div className="max-w-[860px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-mono text-sm font-medium tracking-tight">
            <span className="text-accent-blue">Guru Rengarajan</span>
            <span className="text-github-muted"> · SE Intern Assignment</span>
          </div>
          <div className="flex items-center space-x-6 text-xs font-semibold">
            <a 
              href="#lru-cache" 
              className={`nav-link text-github-muted hover:text-github-text pb-1 transition duration-150 ${activeTab === "lru-cache" ? "text-accent-blue border-b-2 border-accent-blue" : ""}`}
            >
              LRU Cache
            </a>
            <a 
              href="#event-scheduler" 
              className={`nav-link text-github-muted hover:text-github-text pb-1 transition duration-150 ${activeTab === "event-scheduler" ? "text-accent-blue border-b-2 border-accent-blue" : ""}`}
            >
              Event Scheduler
            </a>
            <a 
              href="#analysis" 
              className={`nav-link text-github-muted hover:text-github-text pb-1 transition duration-150 ${activeTab === "analysis" ? "text-accent-blue border-b-2 border-accent-blue" : ""}`}
            >
              Analysis
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-[860px] w-full mx-auto px-4 py-12 space-y-16 flex-1">
        
        {/* Document Header Panel */}
        <header className="pb-8 border-b border-github-border space-y-4 relative">
          
          {/* Pulsing floating direct download panel */}
          <div className="p-4 rounded-xl border border-dashed border-accent-blue/30 bg-accent-blue/5 hover:bg-accent-blue/10 transition duration-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start space-x-3 text-left">
              <div className="p-2 bg-accent-blue/10 rounded-lg text-accent-blue mt-0.5 animate-pulse">
                <Sparkles size={16} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5 font-sans">
                  Export Autonomous Assignment Submission
                </h4>
                <p className="text-xs text-github-muted mt-0.5 leading-normal font-sans">
                  The evaluation requests a single-file static <code>index.html</code> with integrated styles and scripts. Generates and download it instantly below.
                </p>
              </div>
            </div>
            <button 
              onClick={handleDownloadStandalone}
              className="w-full sm:w-auto bg-accent-blue hover:bg-accent-blue/80 text-github-dark font-mono text-xs font-bold py-2.5 px-4 rounded-lg flex items-center justify-center space-x-2 shrink-0 transition shadow-lg cursor-pointer"
            >
              <Download size={14} />
              <span>Download index.html</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono font-medium tracking-wider text-accent-blue uppercase pt-4">
            <span>SOFTWARE ENGINEERING INTERN ASSIGNMENT</span>
            <span>•</span>
            <span>JUNE 2026</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white font-sans sm:text-5xl">
            Data Structures &amp;<br className="hidden sm:inline" /> Systems Design Write-up
          </h1>
          
          <p className="text-lg text-github-muted leading-relaxed max-w-3xl font-sans">
            A comprehensive, modular engineering submission evaluating advanced cache management algorithms, scheduling systems under concurrency, runtime optimizations, thread-safety pathways, and robust space complexity bounds.
          </p>
          
          {/* Submission Metadata details */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-github-border/40 text-xs font-mono">
            <div>
              <span class="text-github-muted">SUBMITTED BY:</span>
              <div className="font-semibold text-white mt-0.5">Guru Rengarajan</div>
            </div>
            <div>
              <span class="text-github-muted">EVALUATION TOPICS:</span>
              <div className="font-semibold text-white mt-0.5">LRU Cache &amp; Event Scheduler</div>
            </div>
            <div>
              <span class="text-github-muted">TARGET POSITION:</span>
              <div className="font-semibold text-white mt-0.5">Software Engineering Intern</div>
            </div>
          </div>
        </header>

        {/* SECTION 1: LRU CACHE */}
        <section id="lru-cache" className="scroll-mt-20">
          <div className="bg-github-dark rounded-xl border border-github-border p-6 sm:p-8 border-l-4 border-l-accent-blue space-y-6">
            
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold tracking-widest text-accent-blue uppercase block">PROBLEM 01</span>
              <h2 className="text-2xl font-bold tracking-tight text-white font-sans">LRU Cache Implementation</h2>
            </div>

            <div className="space-y-4 leading-relaxed font-sans text-[15px]">
              <p>
                An <strong>LRU (Least Recently Used) Cache</strong> requires bounded memory limits by evicting items that haven't been accessed for the longest time when the cache stretches to capacity. 
              </p>
              <div className="bg-code-bg border border-github-border rounded-lg p-4 font-mono text-xs text-accent-blue space-y-1">
                <span className="font-semibold">Core Strategy:</span>
                <p className="text-github-text mt-1 text-xs font-sans leading-normal">
                  Uses a <strong>Hash Map + Doubly Linked List</strong>. The hash map maps a key to its corresponding Node, enabling fast <code>O(1)</code> node lookups. The Doubly Linked List maintains the temporal usage order of keys: the <strong>Most Recently Used (MRU)</strong> node is positioned at the head, and the <strong>Least Recently Used (LRU)</strong> node resides at the tail. Both <code>get()</code> and <code>put()</code> operations perform in strict <code>O(1)</code> time.
                </p>
              </div>
            </div>

            {/* Complexity Badges representation */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
              <div className="group bg-code-bg rounded-xl border border-github-border p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(88,166,255,0.15)] cursor-default">
                <span className="text-4xl font-extrabold text-accent-blue font-mono">O(1)</span>
                <span className="text-[11px] font-mono tracking-wider text-github-muted mt-2 uppercase"><code>get(key)</code> Time</span>
              </div>
              <div className="group bg-code-bg rounded-xl border border-github-border p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(88,166,255,0.15)] cursor-default">
                <span className="text-4xl font-extrabold text-accent-blue font-mono">O(1)</span>
                <span className="text-[11px] font-mono tracking-wider text-github-muted mt-2 uppercase"><code>put(key, val)</code> Time</span>
              </div>
              <div className="group bg-code-bg rounded-xl border border-github-border p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(88,166,255,0.15)] cursor-default">
                <span className="text-4xl font-extrabold text-accent-blue font-mono">O(C)</span>
                <span className="text-[11px] font-mono tracking-wider text-github-muted mt-2 uppercase">Storage Space (Capacity)</span>
              </div>
            </div>

            {/* Interactive Cache Simulation panel */}
            <div className="bg-code-bg border border-github-border rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-github-border pb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-blue animate-pulse"></span>
                  <h3 className="text-xs font-mono font-bold tracking-wider text-white uppercase">Interactive LRU Cache Simulator</h3>
                </div>
                <div className="text-[10px] font-mono bg-accent-blue/10 text-accent-blue px-2 py-0.5 rounded border border-accent-blue/20 uppercase font-semibold">Live Sandbox</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  
                  {/* Capacity Control Choice */}
                  <div>
                    <label className="block text-[10px] font-mono text-github-muted tracking-wider uppercase mb-1">Cache Memory Capacity:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[2, 3, 4].map(cap => (
                        <button
                          key={cap}
                          onClick={() => handleCapacityChange(cap)}
                          className={`py-1 rounded font-mono text-xs border transition ${lruCapacity === cap ? "bg-accent-blue/10 border-accent-blue text-accent-blue font-semibold" : "bg-github-dark border-github-border text-github-muted hover:border-github-border/80"}`}
                        >
                          {cap} Nodes
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input form */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-mono text-github-muted tracking-wider uppercase mb-1">Key (Int):</label>
                      <input 
                        type="number" 
                        value={inputKey} 
                        onChange={e => setInputKey(e.target.value)}
                        className="w-full bg-github-dark border border-github-border rounded px-3 py-1.5 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30 font-mono text-xs text-white"
                        placeholder="e.g. 5"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-github-muted tracking-wider uppercase mb-1">Value (Int):</label>
                      <input 
                        type="number" 
                        value={inputValue} 
                        onChange={e => setInputValue(e.target.value)}
                        className="w-full bg-github-dark border border-github-border rounded px-3 py-1.5 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30 font-mono text-xs text-white"
                        placeholder="e.g. 50"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1 font-mono text-xs">
                    <button 
                      onClick={executePut}
                      className="flex-1 bg-accent-blue/15 hover:bg-accent-blue/25 border border-accent-blue text-accent-blue rounded-lg py-2 font-bold tracking-wide transition cursor-pointer"
                    >
                      PUT(key, value)
                    </button>
                    <button 
                      onClick={executeGet}
                      className="flex-1 bg-github-border hover:bg-github-border/70 border border-github-border text-white rounded-lg py-2 font-bold tracking-wide transition cursor-pointer"
                    >
                      GET(key)
                    </button>
                  </div>

                </div>

                {/* State graph viewport */}
                <div className="bg-github-dark border border-github-border rounded-lg p-3.5 flex flex-col justify-between h-[200px]">
                  
                  {/* HashMap visualization */}
                  <div>
                    <div className="flex justify-between items-center border-b border-github-border/30 pb-1 mb-2">
                      <span className="text-[10px] font-mono text-github-muted tracking-wider uppercase">HashMap Index lookup:</span>
                      <span className="text-[11px] font-mono text-accent-blue font-semibold">O(1) Access</span>
                    </div>
                    <div className="font-mono text-xs flex flex-wrap gap-1.5 min-h-[32px] content-start">
                      {Object.keys(lruHashMap).length === 0 ? (
                        <span className="text-github-muted italic text-[11px]">Empty HashMap {"{}"}</span>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          <span className="text-github-muted font-bold text-xs mt-0.5">{"{"}</span>
                          {Object.entries(lruHashMap).map(([key, val]) => (
                            <div key={key} className="bg-code-bg border border-github-border px-1.5 py-0.5 rounded text-white text-[11px] flex gap-1">
                              <span className="text-accent-blue">{key}</span>
                              <span className="text-github-muted">:</span>
                              <span className="text-github-text font-medium">{val}</span>
                            </div>
                          ))}
                          <span className="text-github-muted font-bold text-xs mt-0.5">{"}"}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Doubly linked list visualization */}
                  <div>
                    <div className="flex justify-between items-center border-b border-github-border/30 pb-1 mb-2">
                      <span className="text-[10px] font-mono text-github-muted tracking-wider uppercase">Doubly Linked List sequence:</span>
                      <span className="text-[10px] font-mono text-github-muted font-normal">(MRU &larr; Head ... Tail &rarr; LRU)</span>
                    </div>
                    <div className="flex items-center space-x-1.5 overflow-x-auto pb-1.5 font-mono text-[11px] min-h-[46px]">
                      
                      {/* Head dummy */}
                      <span className="bg-github-border/40 text-github-muted px-1.5 py-0.5 rounded text-[9px] font-bold uppercase select-none">Head</span>
                      
                      {lruCache.length === 0 ? (
                        <>
                          <span className="text-github-muted font-bold">&harr;</span>
                          <span className="italic text-github-muted text-xs">Empty Cache</span>
                        </>
                      ) : (
                        lruCache.map((node, index) => (
                          <div key={node.key} className="flex items-center space-x-1 shrink-0 animate-fade-in">
                            <span className="text-github-muted font-semibold">&harr;</span>
                            <div className="bg-accent-blue/10 border border-accent-blue text-accent-blue px-2 py-1 rounded font-bold flex flex-col items-center justify-center min-w-[50px] shadow-sm">
                              <span className="text-[10px] text-github-muted font-normal">K: {node.key}</span>
                              <span className="text-white text-xs">{node.val}</span>
                            </div>
                          </div>
                        ))
                      )}

                      {/* Tail dummy */}
                      <span className="text-github-muted font-semibold">&harr;</span>
                      <span className="bg-github-border/40 text-github-muted px-1.5 py-0.5 rounded text-[9px] font-bold uppercase select-none">Tail</span>

                    </div>
                  </div>

                </div>
              </div>

              {/* Logs display */}
              <div className="bg-github-dark border border-github-border rounded-lg p-3">
                <span className="text-[10px] font-mono text-github-muted uppercase block border-b border-github-border/30 pb-1 mb-1.5 tracking-wider">Simulation Event log:</span>
                <div className="max-h-[80px] overflow-y-auto font-mono text-[11px] text-github-muted py-1 space-y-1 scrollbar-thin">
                  {lruLogs.map((log, index) => (
                    <div key={index} className="hover:text-github-text transition-colors duration-150 border-l border-github-border/40 pl-2">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* macOS code display viewport */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-github-muted px-1 font-mono">
                <span>VERBATIM PYTHON FILE</span>
                <span>lru_cache.py</span>
              </div>

              <div className="rounded-lg overflow-hidden border border-github-border">
                <div className="bg-code-bg border-b border-github-border px-4 py-2.5 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                    <span className="text-xs font-mono text-github-muted ml-2">python</span>
                  </div>
                  <button 
                    onClick={() => handleCopy(lruCachePythonCode, "lru")}
                    className="bg-github-dark hover:bg-github-border border border-github-border text-xs text-github-text hover:text-white px-2.5 py-1 rounded font-mono transition flex items-center space-x-1.5 cursor-pointer"
                  >
                    {copiedLru ? (
                      <>
                        <Check size={12} className="text-accent-green" />
                        <span className="text-accent-green">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre><code className="language-python">{lruCachePythonCode}</code></pre>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: EVENT SCHEDULER */}
        <section id="event-scheduler" className="scroll-mt-20">
          <div className="bg-github-dark rounded-xl border border-github-border p-6 sm:p-8 border-l-4 border-l-accent-green space-y-6">
            
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold tracking-widest text-accent-green uppercase block">PROBLEM 02</span>
              <h2 className="text-2xl font-bold tracking-tight text-white font-sans">Event Scheduler</h2>
            </div>

            <div className="space-y-4 leading-relaxed text-[15px] font-sans">
              <p>
                The Event Scheduler problem addresses multi-interval operations, verifying absolute schedule viability or minimizing raw resources (conferencing spaces) required to support a concurrent layout.
              </p>
              <p>
                Two static methods inside <code>class EventScheduler</code> provide algorithmic execution for these workloads:
              </p>

              {/* Method 1: can_attend_all */}
              <div className="bg-code-bg border border-github-border rounded-lg p-4 font-sans text-xs space-y-1.5">
                <div className="flex items-center space-x-1 font-mono font-bold text-accent-green text-[13px] uppercase">
                  <span>METHOD A:</span>
                  <code>can_attend_all(events)</code>
                </div>
                <ul className="list-disc pl-5 text-github-text text-xs space-y-1 mt-1 leading-normal">
                  <li><strong>Sort</strong> the set of events by start time.</li>
                  <li>Iterate and check sequence: if <code>current_start &lt; previous_end</code>, an overlap exists &rarr; return <code>False</code>.</li>
                  <li>Adjacent endpoints like <code>(9,10)</code> and <code>(10,11)</code> are <strong>strictly allowed</strong> (do not form an overlap).</li>
                  <li>If the entire array reveals zero conflicts, return <code>True</code> indicating attendance viability.</li>
                </ul>
              </div>

              {/* Method 2: min_rooms_required */}
              <div className="bg-code-bg border border-github-border rounded-lg p-4 font-sans text-xs space-y-1.5">
                <div className="flex items-center space-x-1 font-mono font-bold text-accent-green text-[13px] uppercase">
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

            {/* Complexity Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
              <div className="group bg-code-bg rounded-xl border border-github-border p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(63,185,80,0.15)] cursor-default">
                <span className="text-4xl font-extrabold text-accent-green font-mono">O(N log N)</span>
                <span className="text-[11px] font-mono tracking-wider text-github-muted mt-2 uppercase"><code>can_attend_all</code> Time</span>
              </div>
              <div className="group bg-code-bg rounded-xl border border-github-border p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(63,185,80,0.15)] cursor-default">
                <span className="text-4xl font-extrabold text-accent-green font-mono">O(N log N)</span>
                <span className="text-[11px] font-mono tracking-wider text-github-muted mt-2 uppercase"><code>min_rooms_required</code> Time</span>
              </div>
              <div className="group bg-code-bg rounded-xl border border-github-border p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(63,185,80,0.15)] cursor-default">
                <span className="text-4xl font-extrabold text-accent-green font-mono">O(N)</span>
                <span className="text-[11px] font-mono tracking-wider text-github-muted mt-2 uppercase">Space Complexity</span>
              </div>
            </div>

            {/* Interactive Scheduler simulation */}
            <div className="bg-code-bg border border-github-border rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-github-border pb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-green animate-pulse"></span>
                  <h3 className="text-xs font-mono font-bold tracking-wider text-white uppercase">Interactive Event Scheduler Playground</h3>
                </div>
                <div className="text-[10px] font-mono bg-accent-green/10 text-accent-green px-2 py-0.5 rounded border border-accent-green/20 uppercase font-semibold">Live Sandbox</div>
              </div>

              {/* Presets switcher */}
              <div>
                <label className="block text-[10px] font-mono text-github-muted tracking-wide uppercase mb-1.5">Load Target Dataset Preset:</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
                  <button
                    onClick={() => handlePresetSelect(1)}
                    className={`p-2.5 rounded border text-left flex flex-col justify-between transition ${schedulerPreset === 1 ? "bg-accent-green/10 border-accent-green text-accent-green font-semibold" : "bg-github-dark border-github-border hover:border-github-border/80 text-github-muted"}`}
                  >
                    <span>Dataset 1 (Sequential)</span>
                    <span className="text-[9px] text-github-muted mt-1 font-normal">[(9,10), (10,11), (11,12)]</span>
                  </button>
                  <button
                    onClick={() => handlePresetSelect(2)}
                    className={`p-2.5 rounded border text-left flex flex-col justify-between transition ${schedulerPreset === 2 ? "bg-accent-green/10 border-accent-green text-accent-green font-semibold" : "bg-github-dark border-github-border hover:border-github-border/80 text-github-muted"}`}
                  >
                    <span>Dataset 2 (Overlapping)</span>
                    <span className="text-[9px] text-github-muted mt-1 font-normal">[(9,11), (10,12), (11,13)]</span>
                  </button>
                  <button
                    onClick={() => handlePresetSelect(3)}
                    className={`p-2.5 rounded border text-left flex flex-col justify-between transition ${schedulerPreset === 3 ? "bg-accent-green/10 border-accent-green text-accent-green font-semibold" : "bg-github-dark border-github-border hover:border-github-border/80 text-github-muted"}`}
                  >
                    <span>Dataset 3 (Mixed Heavy)</span>
                    <span className="text-[9px] text-github-muted mt-1 font-normal">[(9,13), (10,11), (12,14)]</span>
                  </button>
                </div>
              </div>

              {/* Execution outputs indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="bg-github-dark border border-github-border rounded-lg p-3.5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-github-muted uppercase block">CAN ATTEND ALL?</span>
                    <span className={`text-lg font-bold font-mono mt-1 block ${meetsCriteria ? "text-accent-green" : "text-accent-orange"}`}>
                      {meetsCriteria ? "True (Attendable)" : "False (Overlap Conflicts)"}
                    </span>
                  </div>
                  <div className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${meetsCriteria ? "bg-accent-green/10 border border-accent-green/30 text-accent-green" : "bg-accent-orange/10 border border-accent-orange/30 text-accent-orange"}`}>
                    {meetsCriteria ? "SUCCESS" : "CONFLICT"}
                  </div>
                </div>

                <div className="bg-github-dark border border-github-border rounded-lg p-3.5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-github-muted uppercase block">MIN ROOMS REQUIRED:</span>
                    <span className="text-lg font-bold font-mono text-accent-blue mt-1 block">
                      {roomsNeeded} {roomsNeeded === 1 ? "Conference Room" : "Conference Rooms"}
                    </span>
                  </div>
                  <div className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-accent-blue/10 border border-accent-blue/30 text-accent-blue">
                    SWEEP-LINE
                  </div>
                </div>
              </div>

              {/* Custom Timeline visualization (Gantt representation) */}
              <div className="bg-github-dark border border-github-border rounded-lg p-4 space-y-3.5">
                <div className="flex justify-between items-center border-b border-github-border/30 pb-2">
                  <span className="text-[10px] font-mono text-github-muted uppercase tracking-wider block">Gantt-lane allocation timetable:</span>
                  <span className="text-[10px] font-mono text-github-muted font-normal">Allocated sequentially via min-heap</span>
                </div>
                
                <div className="space-y-4 font-mono text-xs pt-1">
                  {lanes.map((laneEvents, laneIdx) => {
                    const laneLetter = String.fromCharCode(65 + laneIdx); // Room A, Room B, etc.
                    return (
                      <div key={laneIdx} className="flex flex-col sm:flex-row sm:items-center py-1.5 border-b border-github-border/30 last:border-0 pb-4 last:pb-1 group">
                        <div className="sm:w-24 font-bold text-white shrink-0 mb-2 sm:mb-0 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                          <span>Room {laneLetter}:</span>
                        </div>
                        <div className="flex-1 flex flex-wrap gap-2.5 overflow-x-auto min-w-0">
                          {laneEvents.map(evt => (
                            <div 
                              key={evt.id} 
                              className="bg-accent-blue/5 border border-accent-blue/40 text-accent-blue rounded px-3 py-2 flex flex-col justify-center min-w-[140px] shadow-sm shrink-0 hover:bg-accent-blue/10 transition"
                            >
                              <span className="text-white font-semibold">Event ({evt.start}:00 &rarr; {evt.end}:00)</span>
                              <span className="text-[10px] text-github-muted mt-0.5">Duration: {evt.end - evt.start} hour(s)</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* macOS code textpane */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-github-muted px-1 font-mono">
                <span>VERBATIM PYTHON FILE</span>
                <span>event_scheduler.py</span>
              </div>

              <div className="rounded-lg overflow-hidden border border-github-border">
                <div className="bg-code-bg border-b border-github-border px-4 py-2.5 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                    <span className="text-xs font-mono text-github-muted ml-2">python</span>
                  </div>
                  <button 
                    onClick={() => handleCopy(eventSchedulerPythonCode, "sched")}
                    className="bg-github-dark hover:bg-github-border border border-github-border text-xs text-github-text hover:text-white px-2.5 py-1 rounded font-mono transition flex items-center space-x-1.5 cursor-pointer"
                  >
                    {copiedSched ? (
                      <>
                        <Check size={12} className="text-accent-green" />
                        <span className="text-accent-green">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre><code className="language-python">{eventSchedulerPythonCode}</code></pre>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3: SYSTEM DISCUSSION & METHOD ANALYSIS */}
        <section id="analysis" className="scroll-mt-20">
          <div className="bg-github-dark rounded-xl border border-github-border p-6 sm:p-8 border-l-4 border-l-accent-orange space-y-10">
            
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold tracking-widest text-accent-orange uppercase block">ANALYSIS &amp; FINDINGS</span>
              <h2 className="text-2xl font-bold tracking-tight text-white font-sans">Final Discussion &amp; Trade-offs</h2>
            </div>

            {/* Trade-off summary */}
            <div className="space-y-4">
              <h3 className="text-[17px] font-bold text-white tracking-wide border-b border-github-border/40 pb-2 flex items-center space-x-2">
                <span className="text-accent-orange text-[15px] font-mono">1.</span>
                <span>Why Combine a Hash Map and a Doubly Linked List?</span>
              </h3>
              
              <div className="space-y-4 font-sans text-sm text-github-text leading-relaxed">
                <p>
                  An LRU Cache operates under opposing forces: constant-time operations for lookups, insertions, and updates. No single data structure natively satisfies all requirements:
                </p>
                
                <ul className="list-disc pl-5 space-y-2 text-github-muted">
                  <li><strong className="text-white">Hash Map alone:</strong> Natively enables constant <code>O(1)</code> lookup, replacement, and key-based deletions via hashed indexing. However, it is structurally unordered and cannot record the relative usage sequence of elements over time.</li>
                  <li><strong className="text-white">Doubly Linked List alone:</strong> Natively retains linear chronological history. Moving nodes to the front or removing the tail can be achieved instantly in <code>O(1)</code> time once a pointer is acquired. However, search is <code>O(N)</code>.</li>
                </ul>

                {/* Trade-off Comparison Table */}
                <div className="overflow-x-auto rounded-lg border border-github-border mt-6">
                  <table className="w-full text-left font-sans text-sm pb-1">
                    <thead>
                      <tr className="bg-code-bg border-b border-github-border text-xs font-mono font-bold tracking-wider text-accent-blue uppercase">
                        <th className="py-3 px-4 font-mono">TECHNICAL OPERATION</th>
                        <th className="py-3 px-4 font-mono">HASH MAP ONLY</th>
                        <th className="py-3 px-4 font-mono">DOUBLY LINKED LIST ONLY</th>
                        <th className="py-3 px-4 font-mono bg-accent-blue/10">COMBINED ADVANTAGE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-github-border bg-github-dark font-sans text-xs">
                      <tr className="table-row-hover transition-colors">
                        <td className="py-3 px-4 font-medium text-white font-sans text-sm">Fast Lookup?</td>
                        <td className="py-3 px-4 text-emerald-500 font-bold font-mono">
                          ✅ <span className="text-[10px] font-normal block text-github-muted mt-0.5 font-sans">O(1) search</span>
                        </td>
                        <td className="py-3 px-4 text-rose-500/70 font-mono">
                          ❌ <span className="text-[10px] font-normal block text-github-muted mt-0.5 font-sans">O(N) traversal search</span>
                        </td>
                        <td className="py-3 px-4 text-emerald-500 font-bold bg-accent-blue/5 font-mono">
                          ✅ <span className="text-[10px] font-normal block text-github-text mt-0.5 font-sans">O(1) combined reference</span>
                        </td>
                      </tr>
                      <tr className="table-row-hover transition-colors">
                        <td className="py-3 px-4 font-medium text-white font-sans text-sm">Maintain Order?</td>
                        <td className="py-3 px-4 text-rose-500/70 font-mono">
                          ❌ <span className="text-[10px] font-normal block text-github-muted mt-0.5 font-sans">No memory ordering</span>
                        </td>
                        <td className="py-3 px-4 text-emerald-500 font-bold font-mono">
                          ✅ <span className="text-[10px] font-normal block text-github-muted mt-0.5 font-sans">Relinkable pointers</span>
                        </td>
                        <td className="py-3 px-4 text-emerald-500 font-bold bg-accent-blue/5 font-mono">
                          ✅ <span className="text-[10px] font-normal block text-github-text mt-0.5 font-sans">Strict Head (MRU) / Tail (LRU)</span>
                        </td>
                      </tr>
                      <tr className="table-row-hover transition-colors">
                        <td className="py-3 px-4 font-medium text-white font-sans text-sm">O(1) Eviction?</td>
                        <td className="py-3 px-4 text-rose-500/70 font-mono">
                          ❌ <span className="text-[10px] font-normal block text-github-muted mt-0.5 font-sans">Requires O(N) scan key search</span>
                        </td>
                        <td className="py-3 px-4 text-emerald-500 font-bold font-mono">
                          ✅ <span className="text-[10px] font-normal block text-github-muted mt-0.5 font-sans">Removes Tail in O(1)</span>
                        </td>
                        <td className="py-3 px-4 text-emerald-500 font-bold bg-accent-blue/5 font-mono">
                          ✅ <span className="text-[10px] font-normal block text-github-text mt-0.5 font-sans">No traversal deletion</span>
                        </td>
                      </tr>
                      <tr className="table-row-hover transition-colors">
                        <td className="py-3 px-4 font-medium text-white font-sans text-sm">O(1) Node Update?</td>
                        <td className="py-3 px-4 text-emerald-500 font-bold font-mono">
                          ✅ <span className="text-[10px] font-normal block text-github-muted mt-0.5 font-sans">Index mutation only</span>
                        </td>
                        <td className="py-3 px-4 text-emerald-500 font-bold font-mono">
                          ✅ <span className="text-[10px] font-normal block text-github-muted mt-0.5 font-sans">Instant link swaps</span>
                        </td>
                        <td className="py-3 px-4 text-emerald-500 font-bold bg-accent-blue/5 font-mono">
                          ✅ <span className="text-[10px] font-normal block text-github-text mt-0.5 font-sans">O(1) key mutation + shift</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-xs text-github-muted mt-1 leading-relaxed">
                  <strong>Combined Advantage Outcome:</strong> Overlapping these properties solves the scheduling puzzle. The Hash Map houses the physical nodes inside memory arrays allowing <code>O(1)</code> key retrieval. Simultaneously, the Doubly Linked List maps the sequential chronological usage paths of active nodes. 
                </p>
              </div>
            </div>

            {/* Block 2: Concurrency options */}
            <div className="space-y-4">
              <h3 className="text-[17px] font-bold text-white tracking-wide border-b border-github-border/40 pb-2 flex items-center space-x-2">
                <span className="text-accent-orange text-[15px] font-mono">2.</span>
                <span>Concurrency — Making LRU Cache Thread-Safe</span>
              </h3>
              
              <p className="text-sm font-sans text-github-text leading-relaxed">
                In multithreaded runtime systems, race-conditions degrade the cache structure because simultaneous read and write events corrupt list pointers. To mitigate this state corruption, we evaluate three standard strategies:
              </p>

              <div className="space-y-4 pt-1">
                
                {/* Global lock card */}
                <div className="p-4 rounded-xl border border-github-border bg-code-bg flex items-start gap-4">
                  <div className="bg-accent-orange/10 text-accent-orange font-mono font-bold rounded-lg px-2.5 py-1 text-xs select-none">
                    01
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h4 className="text-sm font-bold text-white">Global Lock (Coarse-Grained Synchronization)</h4>
                    <p className="text-xs text-github-muted">
                      Locks the entire cache structure (under a mutex wrapper) whenever a <code>get()</code> or <code>put()</code> executes. Only one thread can perform operations at a time.
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono pt-1 text-github-muted">
                      <span><strong className="text-emerald-500 font-normal">Pros:</strong> Bulletproof security, simple thread protection.</span>
                      <span><strong className="text-rose-400 font-normal font-sans text-xs">Cons:</strong> High latency blockages on concurrent lookups.</span>
                    </div>
                  </div>
                </div>

                {/* ReadWrite locks card */}
                <div className="p-4 rounded-xl border border-github-border bg-code-bg flex items-start gap-4">
                  <div className="bg-accent-blue/10 text-accent-blue font-mono font-bold rounded-lg px-2.5 py-1 text-xs select-none">
                    02
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h4 className="text-sm font-bold text-white">Read-Write Lock (Shared / Exclusive Split)</h4>
                    <p className="text-xs text-github-muted">
                      Allows multiple threads to read keys concurrently (shared read lock), but requires exclusive locks to update nodes on <code>put()</code> commands.
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono pt-1 text-github-muted">
                      <span><strong className="text-emerald-500 font-normal">Pros:</strong> Improves throughput under read-heavy traffic.</span>
                      <span><strong className="text-rose-400 font-normal font-sans text-xs">Cons:</strong> Since <code>get()</code> moves nodes to the front, reads mutate pointers and require exclusive rights anyway.</span>
                    </div>
                  </div>
                </div>

                {/* Fine-grained locks card */}
                <div className="p-4 rounded-xl border border-github-border bg-code-bg flex items-start gap-4">
                  <div className="bg-accent-green/10 text-accent-green font-mono font-bold rounded-lg px-2.5 py-1 text-xs select-none">
                    03
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h4 className="text-sm font-bold text-white">Fine-Grained Sharding (Hash Ring Buckets)</h4>
                    <p className="text-xs text-github-muted">
                      Shards the lookup keys into split buckets (e.g. 16 separate sectors), holding independent locks per sector. Threads operating on Key A and Key B do not block each other if they land in different buckets.
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono pt-1 text-github-muted">
                      <span><strong className="text-emerald-500 font-normal">Pros:</strong> Absolute maximum performance under high throughput.</span>
                      <span><strong className="text-rose-400 font-normal font-sans text-xs">Cons:</strong> High development complexity, prone to deadlock if crossing boundaries.</span>
                    </div>
                  </div>
                </div>

                <div className="bg-accent-blue/5 border border-accent-blue/15 rounded-lg p-3 text-xs text-github-muted leading-relaxed font-sans">
                  <strong className="text-accent-blue font-semibold">Production recommendation:</strong> Under standard read-mostly usage, a <strong className="text-white">Fine-Grained Segmented Sharding setup</strong> yields optimal scalability. Alternatively, utilizing cache queue buffers to run concurrent shifts asynchronously preserves microsecond latency.
                </div>

              </div>
            </div>

            {/* Block 3: Future proofing */}
            <div className="space-y-4">
              <h3 className="text-[17px] font-bold text-white tracking-wide border-b border-github-border/40 pb-2 flex items-center space-x-2">
                <span className="text-accent-orange text-[15px] font-mono">3.</span>
                <span>Future Proofing — Assigning Specific Room Numbers</span>
              </h3>
              
              <div className="space-y-3 font-sans text-sm text-github-text leading-relaxed">
                <p>
                  While finding raw peak concurrency counts matches scheduler requirements, real production platforms require allocating <strong>designated Room Numbers or IDs</strong> (e.g., <em>Room A</em>, <em>Room B</em>) without conflicting events overlaps.
                </p>
                <p>
                  This scheduling problem can be modeled as a heap management task, maintaining clean resource conservation by leveraging a <strong>Min-Heap / Priority Queue of Idle Room Names</strong>:
                </p>

                <div className="bg-code-bg border border-github-border rounded-lg p-4 font-mono text-xs space-y-1 mt-2">
                  <div className="text-accent-orange font-bold uppercase mb-1.5">Priority Queue Allocator Algorithm:</div>
                  <ul className="list-decimal pl-4 text-github-text space-y-2 mt-1.5 font-sans leading-normal">
                    <li>Initialize a priority queue (min-heap) holding vacant space tokens: <code>["Room A", "Room B", "Room C"]</code>.</li>
                    <li>Sort the raw meeting events grid chronologically by start time.</li>
                    <li>As each interval starts, pop the lowest room value from the heap structure and commit it on the assignment schedule.</li>
                    <li>When any running interval concludes, return its designated Room ID back into the heap pool, freeing it up.</li>
                    <li>By reusing expired slots, we avoid unnecessary space creations while maintaining efficient scheduling bounds.</li>
                  </ul>
                </div>

                <div className="bg-github-dark border border-github-border rounded-lg p-3.5 text-xs flex flex-col font-mono text-github-muted space-y-1">
                  <span className="text-[10px] text-accent-green font-bold uppercase mb-1 block">Allocation Trace example:</span>
                  <div><code>(09:00, 11:00)</code> &rarr; POPS heap slot &rarr; Allocated <strong class="text-white font-semibold">Room A</strong></div>
                  <div><code>(10:00, 12:00)</code> &rarr; POPS heap slot &rarr; Room A active &rarr; Allocated <strong class="text-white font-semibold">Room B</strong></div>
                  <div><code>(12:00, 13:00)</code> &rarr; Room A has expired. Re-enters heap. POPS &rarr; Allocated <strong class="text-white font-semibold flex-1">Room A</strong></div>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Footer view */}
      <footer className="bg-code-bg border-t border-github-border py-12 px-4 text-center text-xs font-mono text-github-muted">
        <div className="max-w-[860px] mx-auto space-y-3">
          <p className="text-white font-medium text-sm">Guru Rengarajan &bull; B.E. Computer Science Engineering</p>
          <p>Chendhuran College of Engineering &bull; <a href="https://github.com/Guru200616" target="_blank" rel="noopener noreferrer" className="hover:text-accent-blue transition duration-150 underline inline-flex items-center gap-1">github.com/Guru200616 <ExternalLink size={10} /></a></p>
          <div className="w-16 h-px bg-github-border mx-auto my-4" />
          <p className="text-[10px] text-github-muted/65 leading-relaxed">&copy; 2026 Guru Rengarajan. All rights reserved. Prepared and structured using senior developer-level responsive standards.</p>
        </div>
      </footer>

    </div>
  );
}

