import React from "react";
import "../styles/dashboard.css";

export default function SummaryCard({ title, value, className }) {
  return (
    <div className={`summary-card ${className || ""}`}>
      <div className="summary-title">{title}</div>
      <div className="summary-value">{value}</div>
    </div>
  );
}
