import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function ViewPage() {
  const { id } = useParams();
  const [log, setLog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLog() {
      try {
        const res = await fetch(`${API_URL}logs/${id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        if (!data) {
          setError("Log not found");
        } else {
          setLog(data);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch log");
      } finally {
        setLoading(false);
      }
    }
    fetchLog();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!log) return <p>Log not found</p>;

  return (
    <div className="view-page">
      <h2>Log Details</h2>
      <table>
        <tbody>
          <tr>
            <td><strong>Interface Name</strong></td>
            <td>{log.interfaceName || log.name}</td>
          </tr>
          <tr>
            <td><strong>Integration Key</strong></td>
            <td>{log.integrationKey || "-"}</td>
          </tr>
          <tr>
            <td><strong>Status</strong></td>
            <td>{log.status}</td>
          </tr>
          <tr>
            <td><strong>Message</strong></td>
            <td>{log.message || log.details || "-"}</td>
          </tr>
          <tr>
            <td><strong>Date</strong></td>
            <td>{new Date(log.createdAt || log.runDate || log.updatedAt).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
      <Link to="/">Back to Dashboard</Link>
    </div>
  );
}
