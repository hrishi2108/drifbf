import React, { useEffect, useState } from "react";
import { fetchSummary } from "../services/api";
import SummaryCard from "../components/SummaryCard";
import "../styles/dashboard.css";

/* Simple dashboard showing counts and tiny trend placeholder */
export default function Dashboard() {
  const [summary, setSummary] = useState({ counts: [], hourly: [] });
  const [range, setRange] = useState("24h");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchSummary({ range })
      .then((data) => setSummary(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [range]);

  const countsMap = (summary.counts || []).reduce((acc, cur) => {
    acc[cur._id] = cur.count;
    return acc;
  }, {});

  return (
    <div className="dashboard-root">
      <div className="dashboard-top">
        <h1>Dashboard</h1>
        <div>
          <select value={range} onChange={(e) => setRange(e.target.value)}>
            <option value="24h">Last 24 hours</option>
            <option value="week">Last week</option>
            <option value="month">Last month</option>
          </select>
        </div>
      </div>

      <div className="summary-grid">
        <SummaryCard title="Success" value={countsMap.SUCCESS || 0} className="success" />
        <SummaryCard title="Failure" value={countsMap.FAILURE || 0} className="failure" />
        <SummaryCard title="Warning" value={countsMap.WARNING || 0} className="warning" />
      </div>

      
    </div>
  );
}
