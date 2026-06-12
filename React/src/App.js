import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  // -----------------------------
  // STATE MANAGEMENT
  // -----------------------------
  
  /*  
   * I used "Lazy Initialization" for the students state. Passing a function to useState 
   * ensures we only read from localStorage during the very first render, saving processing time.
   * I chose a JavaScript 'Map' instead of an Array to store students. This gives us O(1) 
   * time complexity for looking up, adding, or deleting a student by ID, which is highly 
   * efficient for large datasets compared to an Array's O(N) time.
   */
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    if (!saved) return new Map();

    const parsed = JSON.parse(saved);
    return new Map(
      parsed.map(student => [
        student.id,
        {
          ...student,
          enrolledCourses: new Set(student.enrolledCourses) // Set ensures no duplicate courses
        }
      ])
    );
  });

  const [form, setForm] = useState({ id: "", name: "", courses: "", gpa: "" });
  const [filterCourse, setFilterCourse] = useState("");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [benchmarkData, setBenchmarkData] = useState([]);

  // -----------------------------
  // DATA PERSISTENCE (Side Effects)
  // -----------------------------
  
  /*
   * I used the useEffect hook to synchronize my React state with the browser's Local Storage.
   * By putting '[students]' in the dependency array, this code only fires when the student map 
   * actually changes. Sets and Maps don't cleanly turn into JSON, so I convert them to Arrays first.
   */
  useEffect(() => {
    const serialized = JSON.stringify(
      [...students.values()].map(student => ({
        ...student,
        enrolledCourses: [...student.enrolledCourses]
      }))
    );
    localStorage.setItem("students", serialized);
  }, [students]);

  // -----------------------------
  // CRUD OPERATIONS
  // -----------------------------

  const addStudent = (e) => {
    e.preventDefault(); 
    const id = Number(form.id);
    const gpa = Number(form.gpa);

    // Input sanitization and validation
    if (!id || isNaN(id) || !form.name || isNaN(gpa)) {
      alert("Please enter valid numbers for ID and GPA, and ensure a name is provided.");
      return;
    }

    // O(1) collision check using the Map.has() method
    if (students.has(id)) {
      alert("Student with this ID already exists.");
      return;
    }

    const newStudent = {
      id,
      name: form.name,
      enrolledCourses: new Set(
        form.courses.split(",").map(c => c.trim()).filter(c => c !== "")
      ),
      gpa
    };

    /*
     * React requires "Immutable State Updates". We cannot just mutate the existing map 
     * (e.g., prev.set()). We must clone it into a new Map object in memory so React 
     * detects the change and triggers a UI re-render.
     */
    setStudents(prev => {
      const newMap = new Map(prev);
      newMap.set(id, newStudent);
      return newMap;
    });

    // Clear form
    setForm({ id: "", name: "", courses: "", gpa: "" });
  };

  const removeStudent = (id) => {
    // O(1) deletion time complexity using Map.delete()
    setStudents(prev => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  };

  // -----------------------------
  // MOCK DATA GENERATION
  // -----------------------------

  const generateRandomStudents = () => {
    const input = window.prompt("How many students do you want to generate?");
    const count = parseInt(input, 10);

    if (isNaN(count) || count <= 0) return;

    const coursesPool = ['CS101', 'ENG200', 'MATH300', 'PHY101', 'HIST105', 'ART101', 'BIO201'];

    setStudents(prev => {
      const newMap = new Map(prev);
      
      /*
       * This generation loop runs in O(N) time, where N is the user input.
       * I implemented a do-while loop for ID generation to guarantee no primary key collisions.
       */
      for (let i = 0; i < count; i++) {
        let randomId;
        do {
          randomId = Math.floor(Math.random() * 100000) + 1;
        } while (newMap.has(randomId)); // O(1) collision check

        const numCourses = Math.floor(Math.random() * 3) + 1;
        const studentCourses = new Set();
        while (studentCourses.size < numCourses) {
          studentCourses.add(coursesPool[Math.floor(Math.random() * coursesPool.length)]);
        }

        newMap.set(randomId, {
          id: randomId,
          name: `Student ${randomId}`,
          enrolledCourses: studentCourses,
          gpa: Math.floor(Math.random() * 1001) / 100 // Generates a random number from 0.00 to 10.00
        });
      }
      return newMap;
    });
  };

  // -----------------------------
  // PERFORMANCE BENCHMARKING
  // -----------------------------

  const runBenchmark = () => {
    const dataSizes = [10, 100, 1000, 10000, 100000];
    const results = [];

    // Timeout allows React to render any UI changes before locking the main thread with heavy math
    setTimeout(() => {
      dataSizes.forEach(size => {
        const mockMap = new Map();
        
        // Measure O(N) Map Population
        const startInsert = performance.now();
        for (let i = 0; i < size; i++) {
          mockMap.set(i, {
            id: i,
            name: `Test Student ${i}`,
            enrolledCourses: new Set(['CS101']),
            gpa: 3.0
          });
        }
        const endInsert = performance.now();

        // Measure O(N log N) Sorting + O(N) Mapping
        const startProcess = performance.now();
        [...mockMap.values()].sort((a, b) => b.gpa - a.gpa);
        const endProcess = performance.now();

        // Measure O(1) Map Deletion
        const startDelete = performance.now();
        mockMap.delete(size / 2); 
        const endDelete = performance.now();

        results.push({
          records: size,
          insertMs: (endInsert - startInsert).toFixed(2),
          processMs: (endProcess - startProcess).toFixed(2),
          deleteMs: (endDelete - startDelete).toFixed(3)
        });
      });

      setBenchmarkData(results);
    }, 100);
  };

  // -----------------------------
  // DERIVED STATE (Computed Data)
  // -----------------------------
  
  /*
   * I intentionally did NOT put 'sortedStudents' or 'averageGPA' in their own useState variables. 
   * This is "Derived State". Because React re-runs this component on every state change, 
   * these values are recalculated dynamically. This ensures our UI stats can never become out-of-sync 
   * with the underlying Map data, eliminating a whole class of bugs.
   */

  // O(N log N) Sorting
  const sortedStudents = [...students.values()].sort((a, b) =>
    sortOrder === "desc" ? b.gpa - a.gpa : a.gpa - b.gpa
  );

  // O(N) Reduce to find unique items
  const uniqueCourses = [...students.values()].reduce((acc, student) => {
    student.enrolledCourses.forEach(course => acc.add(course));
    return acc;
  }, new Set());

  // O(N) Filtering
  const displayedStudents = sortedStudents
    .filter(student => student.name.toLowerCase().includes(search.toLowerCase()))
    .filter(student => filterCourse ? [...student.enrolledCourses].some(course => course.toLowerCase().includes(filterCourse.toLowerCase())) : true);

  const averageGPA = students.size === 0 ? 0 : ([...students.values()].reduce((acc, s) => acc + s.gpa, 0) / students.size).toFixed(2);

  // -----------------------------
  // UI RENDERING
  // -----------------------------
  return (
    <div className="dashboard">
      <h2 className="title">Course Enrollment Dashboard</h2>

      {/* Add Student Form */}
      <form className="card form-card" onSubmit={addStudent}>
        <input
          className="input"
          placeholder="ID"
          value={form.id}
          onChange={e => setForm({ ...form, id: e.target.value })}
        />
        <input
          className="input"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="input"
          placeholder="Courses (comma separated)"
          value={form.courses}
          onChange={e => setForm({ ...form, courses: e.target.value })}
        />
        <input
          className="input"
          placeholder="GPA"
          value={form.gpa}
          onChange={e => setForm({ ...form, gpa: e.target.value })}
        />
        <button type="submit" className="btn primary">
          Add Student
        </button>
      </form>

      {/* Stats */}
      <div className="stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '20px' }}>
        <div className="card stat-card" style={{ marginBottom: 0, textAlign: 'center' }}>
          <h4>Total Students</h4>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)', margin: '10px 0 0' }}>{students.size}</p>
        </div>
        <div className="card stat-card" style={{ marginBottom: 0, textAlign: 'center' }}>
          <h4>Unique Courses</h4>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)', margin: '10px 0 0' }}>{uniqueCourses.size}</p>
        </div>
        <div className="card stat-card" style={{ marginBottom: 0, textAlign: 'center' }}>
          <h4>Average GPA</h4>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)', margin: '10px 0 0' }}>{averageGPA}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <input
          className="input"
          placeholder="Search by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginBottom: "10px", width: "100%", display: "block" }}
        />
        <input
          className="input"
          placeholder="Filter by course..."
          value={filterCourse}
          onChange={e => setFilterCourse(e.target.value)}
          style={{ width: "100%", display: "block" }}
        />
      </div>

      {/* Students Table */}
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <h3 style={{ margin: 0 }}>Students</h3>
          <div>
            <button
              className="btn primary"
              onClick={() =>
                setSortOrder(sortOrder === "desc" ? "asc" : "desc")
              }
            >
              Sort GPA ({sortOrder})
            </button>
            <button
              className="btn"
              onClick={generateRandomStudents}
              style={{ marginLeft: "10px", backgroundColor: "#10b981", color: "white" }} 
            >
              Generate Random
            </button>
            <button
              className="btn danger"
              onClick={runBenchmark}
              style={{ marginLeft: "10px" }}
            >
              Run Benchmark
            </button>
          </div>
        </div>

        {students.size === 0 ? (
          <p style={{ padding: "15px", color: "var(--text-light)" }}>
            No students added yet.
          </p>
        ) : (
          <div style={{ overflowX: "auto", maxHeight: "400px", overflowY: "auto" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>GPA</th>
                  <th>Courses</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedStudents.map(student => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td className={student.gpa >= 7.5 ? "gpa-high" : "gpa-low"}>
                      {student.gpa}
                    </td>
                    <td>{[...student.enrolledCourses].join(", ")}</td>
                    <td>
                      <button
                        className="btn danger"
                        onClick={() => removeStudent(student.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Benchmark Results & Complexity UI */}
      {benchmarkData.length > 0 && (
        <div className="card" style={{ marginTop: '20px', animation: 'pageFade 0.4s ease' }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
            
            {/* Live Data Table */}
            <div style={{ flex: 1 }}>
              <h3 style={{ marginBottom: "15px" }}>Live Benchmark Results</h3>
              <table className="table" style={{ fontSize: "0.9rem" }}>
                <thead>
                  <tr>
                    <th>Records (N)</th>
                    <th>Insert All</th>
                    <th>Sort & Map</th>
                    <th>Single Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {benchmarkData.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.records.toLocaleString()}</td>
                      <td>{row.insertMs} ms</td>
                      <td style={{ color: row.processMs > 50 ? "var(--danger)" : "inherit" }}>
                        {row.processMs} ms
                      </td>
                      <td>{row.deleteMs} ms</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Complexity Legend */}
            <div style={{ flex: 1, backgroundColor: "var(--background)", padding: "15px", borderRadius: "8px" }}>
              <h3 style={{ marginBottom: "15px" }}>Time Complexity Legend</h3>
              <ul style={{ listStyleType: "none", padding: 0, margin: 0, fontSize: "0.9rem", color: "var(--text-dark)" }}>
                <li style={{ marginBottom: "8px" }}>
                  <strong>Map Insert & Delete:</strong> <code>O(1)</code> average. 
                  <br /><span style={{ color: "var(--text-light)" }}>Extremely fast, regardless of data size.</span>
                </li>
                <li style={{ marginBottom: "8px" }}>
                  <strong>Generate Random (N new):</strong> <code>O(K + N)</code>.
                  <br /><span style={{ color: "var(--text-light)" }}>Clones existing map (K), then loops N times.</span>
                </li>
                <li style={{ marginBottom: "8px" }}>
                  <strong>Searching / Filtering:</strong> <code>O(N)</code>. 
                  <br /><span style={{ color: "var(--text-light)" }}>Checks every student once. Noticeable at 100k+.</span>
                </li>
                <li>
                  <strong>Sorting the Table:</strong> <code>O(N log N)</code>. 
                  <br /><span style={{ color: "var(--text-light)" }}>The heaviest operation. Causes the UI freeze at high record counts.</span>
                </li>
              </ul>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}