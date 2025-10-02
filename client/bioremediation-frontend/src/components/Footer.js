import React from "react";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        {/* Left side */}
        <span>
          {" "}
          &copy; {new Date().getFullYear()} BioTrack. All rights reserved.{" "}
        </span>
        <br />
        <span>
          Made with <span style={{ color: "red" }}>❤️</span> by{" "}
          <strong>Vivek Kumar</strong>
        </span>
        <br />
        {/* Right side */}
        <div className="d-flex align-items-center mt-2 mt-md-0">
          {/* Social Links */}
          <a
            href="https://github.com/Vivek16777"
            className="text-light me-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/vivek-kumar-7ba30a28b/"
            className="text-light me-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://vivek16777.github.io/vivek/"
            className="text-light me-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGlobe size={20} />
          </a>

          {/* Policy & Contact */}
          <a href="/" className="text-light me-3">
            About
          </a>
          <a href="https://vivek16777.github.io/vivek/" className="text-light">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
