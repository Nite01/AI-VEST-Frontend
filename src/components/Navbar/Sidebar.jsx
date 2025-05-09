import React, { useState } from "react";
import { FaBars, FaHome, FaUser, FaSignOutAlt, FaSun, FaMoon, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div
      className={`sidebar ${darkMode ? "" : "light-mode"}`}
      onMouseOver={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Sidebar Content */}
      <div>
        {/* Menu Items */}
        <ul className="menu-list">
          <li>
            <Link to="/" className="menu-item">
              <FaHome size={25} /> {isOpen && <span>Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link to="/Profile" className="menu-item">
              <FaUser size={24} /> {isOpen && <span>Profile</span>}
            </Link>
          </li>
          <li className="menu-item">
            <FaCog size={24} /> {isOpen && <span>Settings</span>}
          </li>

          {/* Dark Mode Toggle */}
          <li className="menu-item">
            <button onClick={toggleDarkMode} className="dark-mode-toggle">
              {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
              {isOpen && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
            </button>
          </li>

          {/* Logout Button */}
          <li className="menu-item">
            <button onClick={onLogout} className="logout-button"><FaSignOutAlt size={24} /> 
            {isOpen && <span>Logout</span>}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
