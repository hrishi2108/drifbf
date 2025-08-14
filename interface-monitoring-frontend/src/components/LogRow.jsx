import React from "react";
import { Link } from "react-router-dom";

function statusClass(status) {
  const s = String(status).toUpperCase();
  if (s.includes("SUCCESS") || s === "Success") return "status-success";
  if (s.includes("FAIL") || s === "Failure") return "status-failure";
  if (s.includes("WARN") || s === "Warning") return "status-warning";
  return "status-info";
}

export default function LogRow({ log }) {
  return (
    <tr>
      <td>{log.interfaceName || log.name}</td>
      <td>{log.integrationKey || log.integrationKey || "-"}</td>
      <td><span className={`status ${statusClass(log.status)}`}>{log.status}</span></td>
      <td className="message-cell">{log.message || log.details || "-"}</td>
      <td>{new Date(log.createdAt || log.runDate || log.updatedAt).toLocaleString()}</td>
      
    </tr>
  );
}
