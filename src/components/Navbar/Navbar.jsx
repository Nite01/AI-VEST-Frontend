import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import "./style.css";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import Sidepopupbar from "../Sidepopupbar/Sidepopupbar.";

const Navbar = ({ onLogout }) => {

  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex-container">
      <nav className="navbar">
        {/* Sidebar Toggle */}
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>

        {/* App Title */}
        <h1 className="header-title">AIVest</h1>

        {/* Search and Calendar Icons */}
        <div className="relative-flex-container">

          {/* Logout Button */}
          <div className="relative-container">
            <button onClick={onLogout} className="logout">
              <FaSignOutAlt size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}>
          <div className="sidebar-container" onClick={(e) => e.stopPropagation()}>
            {isSidebarOpen && (
              <Sidepopupbar
                isOpen={isSidebarOpen}
                toggleSidepopupbar={toggleSidebar}
                onClose={closeSidebar}
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;