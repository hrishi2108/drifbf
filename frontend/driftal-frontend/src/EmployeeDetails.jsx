import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './EmployeeDetails.css';



const API_URL = import.meta.env.VITE_API_URL;

export default function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${API_URL}/employees/${id}`);
        setEmployee(res.data.employee);
        setFormData(res.data.employee);
      } catch (err) {
        setError("Failed to load employee details");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/employees/${id}`, formData);
      alert("Employee updated successfully");
      setEditMode(false);
      const res = await axios.get(`${API_URL}/employees/${id}`);
      setEmployee(res.data.employee);
    } catch {
      alert("Error updating employee");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!employee) return <p>No Employee Found</p>;

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>

      {editMode ? (
        <>
          <h3>Edit Employee</h3>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="role"
            value={formData.role || ""}
            onChange={handleChange}
            placeholder="Role"
          />

          <button onClick={handleUpdate} className="save-btn">
            Save
          </button>
          <button onClick={() => setEditMode(false)} className="cancel-btn">
            Cancel
          </button>
        </>
      ) : (
        <>
          <h3>{employee.name}</h3>
          <p>
            <b>Email:</b> {employee.email}
          </p>
          <p>
            <b>Role:</b> {employee.role}
          </p>
          <p>
            <b>Submitted:</b> {employee.assessment_submitted ? "Yes" : "No"}
          </p>
          <p>
            <b>Tags:</b> {employee.tags?.join(", ")}
          </p>

          <h4>Assessment Answers:</h4>
          <ul>
            {employee.assessment_answers &&
              Object.entries(employee.assessment_answers).map(([key, val]) => (
                <li key={key}>
                  <b>{key.toUpperCase()}:</b> {val}
                </li>
              ))}
          </ul>

          <button onClick={() => setEditMode(true)} className="edit-btn">
            Edit Employee
          </button>
        </>
      )}
    </div>
  );
}
