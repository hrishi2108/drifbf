import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

// Optional: simple error wrapper
const wrap = (p) => p.then(r => r.data).catch(err => { throw err.response?.data || err; });

export const fetchLogs = (params) => wrap(api.get("/logs", { params }));
export const createLog = (payload) => wrap(api.post("/logs", payload));
export const fetchLogById = (id) => wrap(api.get(`/logs/${id}`));
export const fetchSummary = (params) => wrap(api.get("/logs/summary", { params }));

export default api;
