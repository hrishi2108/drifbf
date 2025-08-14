import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Logs from "./pages/Logs";
import LogDetail from "./pages/LogDetail";
import AddLog from "./pages/AddLog";

export default function App() {
  return (
    <div>
      <Header />
      <main style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/logs/:id" element={<LogDetail />} />
          <Route path="/add" element={<AddLog />} />
        </Routes>
      </main>
    </div>
  );
}
