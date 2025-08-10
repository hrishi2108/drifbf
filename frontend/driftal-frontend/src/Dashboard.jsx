import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Dashboard.css';


const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    submission_status: "",
    role: "",
    tag: "",
    search: "",
    sort_by: "",
    sort_order: "asc",
  });

  const navigate = useNavigate();

  const fetchEmployees = async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (filters.submission_status) params.submission_status = filters.submission_status;
      if (filters.role) params.role = filters.role;
      if (filters.tag) params.interest_area = filters.tag;
      if (filters.search) params.search = filters.search;
      if (filters.sort_by) params.sort_by = filters.sort_by;
      if (filters.sort_order) params.sort_order = filters.sort_order;

      const res = await axios.get(`${API_URL}/employees`, { params });
      setEmployees(res.data.employees);
    } catch (err) {
      setError("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleViewDetails = (id) => {
    navigate(`/employee/${id}`);
  };

  return (
    <div className="container">
      <h2>Employee Dashboard</h2>

      <div className="filters">
        <select name="submission_status" value={filters.submission_status} onChange={handleFilterChange}>
          <option value="">Submission Status</option>
          <option value="submitted">Submitted</option>
          <option value="not_submitted">Not Submitted</option>
        </select>

        <select name="role" value={filters.role} onChange={handleFilterChange}>
          <option value="">Role</option>
          <option value="Software Engineer">Software Engineer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="Product Manager">Product Manager</option>
        </select>

        <select name="tag" value={filters.tag} onChange={handleFilterChange}>
          <option value="">Interest Tag</option>
          <option value="AI Enthusiast">AI Enthusiast</option>
          <option value="HR-Tech Passionate">HR-Tech Passionate</option>
          <option value="Looking to explore">Looking to explore</option>
        </select>

        <input
          type="text"
          name="search"
          placeholder="Search name, email, keywords"
          value={filters.search}
          onChange={handleFilterChange}
        />

        <select name="sort_by" value={filters.sort_by} onChange={handleFilterChange}>
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="submission_date">Submission Date</option>
          <option value="learning_score">Learning Score</option>
        </select>

        <select name="sort_order" value={filters.sort_order} onChange={handleFilterChange}>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>

      {loading && <p>Loading employees...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && employees.length === 0 && <p>No employees found.</p>}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Submitted</th>
            <th>Tags</th>
            <th>Submission Date</th>
            <th>Learning Score</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.role}</td>
              <td>{emp.email}</td>
              <td>{emp.assessment_submitted ? "Submitted" : "Not Submitted"}</td>
              <td>{emp.tags?.join(", ")}</td>
              <td>{emp.submission_date ? new Date(emp.submission_date).toLocaleDateString() : "N/A"}</td>
              <td>{emp.learning_score ?? "N/A"}</td>
              <td>
                <button onClick={() => handleViewDetails(emp._id)}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
