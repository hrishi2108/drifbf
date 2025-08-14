import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchLogById } from "../services/api";
import "../styles/logs.css";

export default function LogDetail() {
  const { id } = useParams();
  const [log, setLog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogById(id)
      .then((res) => setLog(res))
      .catch((err) => {
        console.error(err);
        setLog(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!log) return <div>Log not found</div>;

  return (
    <div className="log-detail">
      <h2>Log detail</h2>
      <div className="card">
        <div><strong>Interface:</strong> {log.interfaceName}</div>
        <div><strong>Integration Key:</strong> {log.integrationKey}</div>
        <div><strong>Status:</strong> {log.status}</div>
        <div><strong>Severity:</strong> {log.severity}</div>
        <div><strong>Message:</strong> {log.message}</div>
        <div><strong>Time:</strong> {new Date(log.createdAt).toLocaleString()}</div>
        <div><strong>Metadata:</strong> <pre style={{whiteSpace: "pre-wrap"}}>{JSON.stringify(log.metadata || {}, null, 2)}</pre></div>
      </div>
      <div style={{ marginTop: 12 }}>
        <Link to="/logs">Back to logs</Link>
      </div>
    </div>
  );
}
