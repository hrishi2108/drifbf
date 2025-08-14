import React from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

export default function Header() {
  return (
    <header className="app-header">
      <div className="container">
        <div className="brand">
          <Link to="/" className="brand-link">Interface Monitoring</Link>
        </div>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/logs">Logs</Link>
          <Link to="/add" className="add-link">Add Log</Link>
        </nav>
      </div>
    </header>
  );
}
