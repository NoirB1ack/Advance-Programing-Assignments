import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  // -----------------------------
  // State
  // -----------------------------
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    if (!saved) return new Map();

    const parsed = JSON.parse(saved);
    return new Map(
      parsed.map(student => [
        student.id,
        {
          ...student,
          enrolledCourses: new Set(student.enrolledCourses)
        }
      ])
    );
  });

  const [form, setForm] = useState({
    id: "",
    name: "",
    courses: "",
    gpa: ""
  });

  const [filterCourse, setFilterCourse] = useState("");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10; 

  // Demo Tools State
  const [dummyCount, setDummyCount] = useState("");

  // -----------------------------
  // Persist to localStorage
  // -----------------------------
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
  // Add Single Student
  // -----------------------------
  const addStudent = (e) => {
    e.preventDefault(); 
    const id = Number(form.id);
    const gpa = Number(form.gpa);

    if (!id || isNaN(id) || !form.name || isNaN(gpa)) {
      alert("Please enter valid numbers for ID and GPA, and ensure a name is provided.");
      return;
    }

    if (students.has(id)) {
      alert("Student with this ID already exists.");
      return;
    }

    const newStudent = {
      id,
      name: form.name,
      enrolledCourses: new Set(
        form.courses
          .split(",")
          .map(c => c.trim())
          .filter(c => c !== "")
      ),
      gpa
    };

    setStudents(prev => {
      const newMap = new Map(prev);
      newMap.set(id, newStudent);
      return newMap;
    });

    setForm({ id: "", name: "", courses: "", gpa: "" });
  };

  // -----------------------------
  // Remove Single Student
  // -----------------------------
  const removeStudent = (id) => {
    setStudents(prev => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  };

  // -----------------------------
  // Demo Tools: Generate & Clear All
  // -----------------------------
  const generateDummyStudents = () => {
    const count = Number(dummyCount);
    if (!count || isNaN(count) || count <= 0) {
      alert("Please enter a valid number greater than 0.");
      return;
    }

    setStudents(prev => {
      const newMap = new Map(prev);
      
      // Find the highest existing ID so we don't overwrite current students
      let maxId = 0;
      if (newMap.size > 0) {
        maxId = Math.max(...Array.from(newMap.keys()));
      }

      const coursesPool = ["CS101", "ENG200", "MATH300", "PHY101", "HIS201", "ART105"];

      for (let i = 1; i <= count; i++) {
        const newId = maxId + i;
        
        // Pick 1 to 3 random courses for the student
        const randomCourses = new Set();
        const numCourses = Math.floor(Math.random() * 3) + 1; 
        for(let c = 0; c < numCourses; c++) {
           randomCourses.add(coursesPool[Math.floor(Math.random() * coursesPool.length)]);
        }

        newMap.set(newId, {
          id: newId,
          name: `Dummy Student ${newId}`,
          enrolledCourses: randomCourses,
          gpa: Number((Math.random() * 4).toFixed(2)) // Random GPA between 0.00 and 4.00
        });
      }
      return newMap;
    });
    
    setDummyCount(""); // Clear the input field after generating
  };

  const clearAllStudents = () => {
    if (window.confirm("Are you sure you want to delete all students? This cannot be undone.")) {
      setStudents(new Map());
      setCurrentPage(1); // Reset pagination
    }
  };

  // -----------------------------
  // Benchmark Utility (For demo purposes)
  // -----------------------------
  const runBenchmark = () => {
    const dataSizes = [10, 100, 1000, 10000, 100000];
    const benchmarkResults = [];

    console.log("Starting benchmark... this might freeze the UI for a second on 100k!");

    dataSizes.forEach(size => {
      const mockMap = new Map();
      const startInsert = performance.now();
      
      for (let i = 0; i < size; i++) {
        mockMap.set(i, {
          id: i,
          name: `Test Student ${i}`,
          enrolledCourses: new Set(['CS101', 'ENG200', 'MATH300']),
          gpa: Number((Math.random() * 4).toFixed(2))
        });
      }
      const endInsert = performance.now();

      const startProcess = performance.now();
      const sorted = [...mockMap.values()].sort((a, b) => b.gpa - a.gpa);
      const unique = [...mockMap.values()].reduce((acc, student) => {
        student.enrolledCourses.forEach(course => acc.add(course));
        return acc;
      }, new Set());
      const endProcess = performance.now();

      const startDelete = performance.now();
      mockMap.delete(size / 2); 
      const endDelete = performance.now();

      benchmarkResults.push({
        "Records": size,
        "Insert All (ms)": (endInsert - startInsert).toFixed(3),
        "Sort & Filter (ms)": (endProcess - startProcess).toFixed(3),
        "Single Delete (ms)": (endDelete - startDelete).toFixed(3)
      });
    });

    console.table(benchmarkResults);
    alert("Benchmark complete! Check your browser's console (F12) to see the results.");
  };

  // -----------------------------
  // Derived Data
  // -----------------------------
  const sortedStudents = [...students.values()].sort((a, b) =>
    sortOrder === "desc" ? b.gpa - a.gpa : a.gpa - b.gpa
  );

  const uniqueCourses = [...students.values()].reduce((acc, student) => {
    student.enrolledCourses.forEach(course => acc.add(course));
    return acc;
  }, new Set());

  const displayedStudents = sortedStudents
    .filter(student =>
      student.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter(student =>
      filterCourse
        ? [...student.enrolledCourses].some(course =>
            course.toLowerCase().includes(filterCourse.toLowerCase())
          )
        : true
    );

  const averageGPA =
    students.size === 0
      ? 0
      : (
          [...students.values()].reduce((acc, s) => acc + s.gpa, 0) /
          students.size
        ).toFixed(2);

  // -----------------------------
  // Pagination Logic
  // -----------------------------
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterCourse, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(displayedStudents.length / recordsPerPage));
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  
  const currentRecords = displayedStudents.slice(indexOfFirstRecord, indexOfLastRecord);

  // -----------------------------
  // UI
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

      {/* Filters & Demo Tools */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div className="card" style={{ marginBottom: 0 }}>
          <h4 style={{ marginBottom: "10px" }}>Search & Filter</h4>
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

        <div className="card" style={{ marginBottom: 0 }}>
          <h4 style={{ marginBottom: "10px" }}>Demo Tools</h4>
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <input
              className="input"
              placeholder="# to generate"
              type="number"
              value={dummyCount}
              onChange={e => setDummyCount(e.target.value)}
              style={{ flex: 1 }}
            />
            <button className="btn primary" onClick={generateDummyStudents}>
              Generate
            </button>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button className="btn danger" onClick={clearAllStudents} style={{ flex: 1 }}>
              Clear All Data
            </button>
            <button className="btn" onClick={runBenchmark} style={{ flex: 1, backgroundColor: "#64748b", color: "white" }}>
              Run Benchmark
            </button>
          </div>
        </div>
      </div>

      {/* Students Table & Pagination */}
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <h3 style={{ margin: 0 }}>Students</h3>
          <button
            className="btn primary"
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
          >
            Sort GPA ({sortOrder})
          </button>
        </div>

        {students.size === 0 ? (
          <p style={{ padding: "15px", color: "var(--text-light)" }}>
            No students added yet. Use the Demo Tools above to generate some!
          </p>
        ) : (
          <div style={{ overflowX: "auto" }}>
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
                {currentRecords.map(student => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td className={student.gpa >= 3.0 ? "gpa-high" : "gpa-low"}>
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

            {/* Pagination Controls */}
            {displayedStudents.length > recordsPerPage && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px", paddingTop: "15px", borderTop: "1px solid var(--border)" }}>
                <button 
                  className="btn" 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer', border: "1px solid var(--border)", background: "transparent", color: "var(--text-dark)" }}
                >
                  Previous
                </button>
                
                <span style={{ fontWeight: "500", color: "var(--text-light)" }}>
                  Page {currentPage} of {totalPages}
                </span>
                
                <button 
                  className="btn" 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  style={{ opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', border: "1px solid var(--border)", background: "transparent", color: "var(--text-dark)" }}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}