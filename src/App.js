
import React, { useState } from "react";

function StudentList() {
  const [students, setStudents] = useState([
    { id: 1, name: "John", rollNumber: "101", studentClass: "10A" },
    { id: 2, name: "David", rollNumber: "102", studentClass: "10B" },
    { id: 3, name: "William", rollNumber: "103", studentClass: "Grade 12" }
  ]);

  const [studentName, setStudentName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [editingStudentId, setEditingStudentId] = useState(null);
  const [editedStudent, setEditedStudent] = useState({
    name: "",
    rollNumber: "",
    studentClass: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !studentName.trim() ||
      !rollNumber.trim() ||
      !studentClass.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const isDuplicate = students.some(
      (student) =>
        student.rollNumber.toLowerCase() === rollNumber.trim().toLowerCase()
    );

    if (isDuplicate) {
      alert("Roll number already exists.");
      return;
    }

    const newStudent = {
      id: students.length + 1,
      name: studentName.trim(),
      rollNumber: rollNumber.trim(),
      studentClass: studentClass.trim()
    };

    setStudents([...students, newStudent]);
    setStudentName("");
    setRollNumber("");
    setStudentClass("");
  };

  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const handleEdit = (student) => {
    setEditingStudentId(student.id);
    setEditedStudent({
      name: student.name,
      rollNumber: student.rollNumber,
      studentClass: student.studentClass
    });
  };

  const handleSave = () => {
    if (
      !editedStudent.name.trim() ||
      !editedStudent.rollNumber.trim() ||
      !editedStudent.studentClass.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const isDuplicate = students.some(
      (student) =>
        student.id !== editingStudentId &&
        student.rollNumber.toLowerCase() ===
          editedStudent.rollNumber.trim().toLowerCase()
    );

    if (isDuplicate) {
      alert("Roll number already exists.");
      return;
    }

    setStudents(
      students.map((student) =>
        student.id === editingStudentId
          ? {
              ...student,
              name: editedStudent.name.trim(),
              rollNumber: editedStudent.rollNumber.trim(),
              studentClass: editedStudent.studentClass.trim()
            }
          : student
      )
    );

    setEditingStudentId(null);
  };

  const handleCancel = () => {
    setEditingStudentId(null);
    setEditedStudent({
      name: "",
      rollNumber: "",
      studentClass: ""
    });
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Student List Management</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Student Name</label>
          <input
            type="text"
            className="form-control"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter student name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Roll Number</label>
          <input
            type="text"
            className="form-control"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            placeholder="Enter roll number"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Class</label>
          <input
            type="text"
            className="form-control"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            placeholder="Enter class (e.g., 10A)"
          />
        </div>

        <button type="submit" className="btn btn-success">
          Add Student
        </button>
      </form>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by student name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Roll Number</th>
              <th>Class</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No students found
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>

                  <td>
                    {editingStudentId === student.id ? (
                      <input
                        type="text"
                        className="form-control"
                        value={editedStudent.name}
                        onChange={(e) =>
                          setEditedStudent({
                            ...editedStudent,
                            name: e.target.value
                          })
                        }
                      />
                    ) : (
                      student.name
                    )}
                  </td>

                  <td>
                    {editingStudentId === student.id ? (
                      <input
                        type="text"
                        className="form-control"
                        value={editedStudent.rollNumber}
                        onChange={(e) =>
                          setEditedStudent({
                            ...editedStudent,
                            rollNumber: e.target.value
                          })
                        }
                      />
                    ) : (
                      student.rollNumber
                    )}
                  </td>

                  <td>
                    {editingStudentId === student.id ? (
                      <input
                        type="text"
                        className="form-control"
                        value={editedStudent.studentClass}
                        onChange={(e) =>
                          setEditedStudent({
                            ...editedStudent,
                            studentClass: e.target.value
                          })
                        }
                      />
                    ) : (
                      student.studentClass
                    )}
                  </td>

                  <td>
                    {editingStudentId === student.id ? (
                      <>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm me-2 mb-1"
                          onClick={handleSave}
                        >
                          Save
                        </button>

                        <button
                          type="button"
                          className="btn btn-secondary btn-sm mb-1"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm me-2 mb-1"
                          onClick={() => handleEdit(student)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="btn btn-danger btn-sm mb-1"
                          onClick={() => handleDelete(student.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentList;
