import React from "react";
import { Link } from "react-router-dom";
import "../styles/style.scss";

const Home = () => {
  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="navbar-links">
          <Link to="/patients">Patients</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/register">Register</Link>
          <Link to="/logout">Logout</Link>
        </div>
      </nav>

      <div className="welcome-section">
        <h1>Welcome to your Hospital Management System</h1>
        <p className="subtext">Add a patient to start</p>
      </div>
    </div>
  );
};

export default Home;
