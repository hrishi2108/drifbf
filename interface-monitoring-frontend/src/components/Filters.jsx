import React, { useState } from "react";

export default function Filters({ onApply }) {
  const [interfaceName, setInterfaceName] = useState("");
  const [status, setStatus] = useState("");
  const [q, setQ] = useState("");
  const [range, setRange] = useState("24h");

  function apply() {
    onApply({ interfaceName: interfaceName || undefined, status: status || undefined, q: q || undefined, range });
  }

  function reset() {
    setInterfaceName("");
    setStatus("");
    setQ("");
    setRange("24h");
    onApply({});
  }

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 16 }}>
      <input placeholder="Search messages" value={q} onChange={(e) => setQ(e.target.value)} />
      <input placeholder="Interface name" value={interfaceName} onChange={(e) => setInterfaceName(e.target.value)} />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All statuses</option>
        <option value="SUCCESS">SUCCESS</option>
        <option value="FAILURE">FAILURE</option>
        <option value="WARNING">WARNING</option>
      </select>
      <select value={range} onChange={(e) => setRange(e.target.value)}>
        <option value="24h">Last 24 hours</option>
        <option value="week">Last week</option>
        <option value="month">Last month</option>
      </select>
      <button onClick={apply}>Apply</button>
      <button onClick={reset} className="btn-secondary">Reset</button>
    </div>
  );
}
