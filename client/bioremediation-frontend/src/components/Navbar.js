import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          BioTrack
        </Link>

        {/* Hamburger button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="ms-auto d-flex flex-column flex-lg-row">
            {token ? (
              <>
                {/* Links for logged-in users */}
                <Link
                  className="btn btn-outline-light me-2 mb-2 mb-lg-0"
                  to="/profile"
                >
                  Profile
                </Link>
                <Link
                  className="btn btn-outline-light me-2 mb-2 mb-lg-0"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
                <Link
                  className="btn btn-outline-light me-2 mb-2 mb-lg-0"
                  to="/research"
                >
                  Research
                </Link>
                <Link
                  className="btn btn-outline-light me-2 mb-2 mb-lg-0"
                  to="/analysis"
                >
                  Analysis
                </Link>

                {/* Admin-only link */}
                {user?.role === "admin" && (
                  <Link
                    className="btn btn-warning me-2 mb-2 mb-lg-0"
                    to="/admin"
                  >
                    Admin
                  </Link>
                )}

                <button
                  className="btn btn-danger mb-2 mb-lg-0"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Links for guests */}
                <Link
                  className="btn btn-outline-light me-2 mb-2 mb-lg-0"
                  to="/login"
                >
                  Login
                </Link>
                <Link className="btn btn-success mb-2 mb-lg-0" to="/signup">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
