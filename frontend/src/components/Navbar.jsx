import React from "react";
import { Link, useLocation } from "react-router-dom";
import { logoutUser } from "../../firebase";

const Navbar = ({ user }) => {
  const location = useLocation();

  return (
    <nav>
      <ul className="navbar">
        <li
          style={
            location.pathname === "/"
              ? { color: "#000", borderBottom: "2px solid #000" }
              : { color: "#ffae00" }
          }
          className="navbar-item"
        >
          <Link to="/">Home</Link>
        </li>
        <li
          style={
            location.pathname === "/transactions"
              ? { color: "#000", borderBottom: "2px solid #000" }
              : { color: "#ffae00" }
          }
          className="navbar-item"
        >
          <Link to="/transactions">Transactions</Link>
        </li>
        <li
          style={
            location.pathname === "/dashboard"
              ? { color: "#000", borderBottom: "2px solid #000" }
              : { color: "#ffae00" }
          }
          className="navbar-item"
        >
          <Link to="/dashboard">Dashboard</Link>
        </li>
        {user && (
          <li className="navbar-item">
            <button onClick={logoutUser} style={{ color: "#ffae00", background: "none", border: "none", cursor: "pointer" }}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
