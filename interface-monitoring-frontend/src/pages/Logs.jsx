import React, { useEffect, useState } from "react";
import { fetchLogs } from "../services/api";
import LogRow from "../components/LogRow";
import Filters from "../components/Filters";
import "../styles/logs.css";

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState(null); // lastId for cursor pagination
  const [hasMore, setHasMore] = useState(true);
  const [params, setParams] = useState({ limit: 25 });

  useEffect(() => {
    loadInitial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  function loadInitial() {
    setLoading(true);
    setCursor(null);
    fetchLogs(params)
      .then((res) => {
        setLogs(res.data || res);
        // if cursor-style, server returns { data, page:null, limit }
        if (res.data) {
          setLogs(res.data);
          setHasMore(res.data.length >= (params.limit || 25));
        } else if (Array.isArray(res)) {
          setLogs(res);
          setHasMore(res.length >= (params.limit || 25));
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  function loadMore() {
    if (logs.length === 0) return;
    const last = logs[logs.length - 1];
    const lastId = last._id || last.id;
    const p = { ...params, lastId, limit: params.limit || 25 };
    setLoading(true);
    fetchLogs(p)
      .then((res) => {
        const newData = res.data || res;
        if (!newData || newData.length === 0) {
          setHasMore(false);
          return;
        }
        setLogs((prev) => [...prev, ...newData]);
        setHasMore(newData.length >= (params.limit || 25));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  function onApplyFilters(filters) {
    const applied = { ...params, ...filters, page: 1 };
    // remove undefined fields
    Object.keys(applied).forEach(k => applied[k] === undefined && delete applied[k]);
    setParams(applied);
  }

  return (
    <div className="logs-root">
      <div className="logs-header">
        <h1>Logs</h1>
      </div>

      <Filters onApply={onApplyFilters} />

      <div className="table-wrap">
        <table className="logs-table">
          <thead>
            <tr>
              <th>Interface</th>
              <th>Integration Key</th>
              <th>Status</th>
              <th>Message</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((l) => <LogRow key={l._id || l.id} log={l} />)}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 12 }}>
        {loading ? <button disabled>Loading...</button> :
          hasMore ? <button onClick={loadMore}>Load more</button> : <div>No more logs</div>
        }
      </div>
    </div>
  );
}
