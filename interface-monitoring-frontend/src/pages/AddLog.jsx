import React, { useState } from "react";
import { createLog } from "../services/api";
import "../styles/forms.css";
import { useNavigate } from "react-router-dom";

export default function AddLog() {
  const [form, setForm] = useState({
    interfaceName: "",
    integrationKey: "",
    status: "SUCCESS",
    message: "",
    severity: "info"
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function onChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function onSubmit(ev) {
    ev.preventDefault();
    setLoading(true);
    createLog(form).then(() => {
      setLoading(false);
      navigate("/logs");
    }).catch((err) => {
      console.error(err);
      setLoading(false);
      alert("Failed to add log");
    });
  }

  return (
    <div className="form-root">
      <h1>Add Log</h1>
      <form onSubmit={onSubmit}>
        <label>Interface name
          <input name="interfaceName" value={form.interfaceName} onChange={onChange} required />
        </label>

        <label>Integration key
          <input name="integrationKey" value={form.integrationKey} onChange={onChange} required />
        </label>

        <label>Status
          <select name="status" value={form.status} onChange={onChange}>
            <option value="SUCCESS">SUCCESS</option>
            <option value="FAILURE">FAILURE</option>
            <option value="WARNING">WARNING</option>
          </select>
        </label>

        <label>Severity
          <select name="severity" value={form.severity} onChange={onChange}>
            <option value="info">info</option>
            <option value="minor">minor</option>
            <option value="major">major</option>
          </select>
        </label>

        <label>Message
          <textarea name="message" value={form.message} onChange={onChange} />
        </label>

        <div>
          <button type="submit" disabled={loading}>{loading ? "Saving..." : "Save"}</button>
        </div>
      </form>
    </div>
  );
}
