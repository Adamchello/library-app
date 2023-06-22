import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

export function NavBar() {
  return (
    <div className="nav-container">
      <div>
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
      </div>
      <div>
        <NavLink to="/book" className="nav-link">
          Book
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;
