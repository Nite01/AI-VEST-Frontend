import React, { use, useState } from "react";
import { FaBars, FaHome, FaUser, FaSignOutAlt, FaSun, FaMoon, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../hooks/useUserAuth";
import "./Sidepopupbar.css";

const Sidebar = ({ isOpen, toggleSidepopupbar }) => {
  useUserAuth();
  const [darkMode, setDarkMode] = useState(false);


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("darkmode");
  };

  return (
    <div
      className={`sidepopupbar ${darkMode ? "" : "lightmode"}${isOpen ? "open" : ""}`}
    >

      <div>

        <div className="bar">
          <button onClick={toggleSidepopupbar}>
            <FaBars size={24} /></button> <span>AIVest</span>
        </div>


        <ul className="menu-list2">
          <li>
            <Link to="/dashboard" className="menu-item2">
              <FaHome size={25} /> <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/Profile" className="menu-item2">
              <FaUser size={24} />  <span>Profile</span>
            </Link>
          </li>
          <li className="menu-item2">
            <FaCog size={24} />  <span>Settings</span>
          </li>

          {/* Dark Mode Toggle */}
          <li className="menu-item2">
            <button onClick={toggleDarkMode} className="dark-mode-toggle2">
              {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
              <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default Sidebar;