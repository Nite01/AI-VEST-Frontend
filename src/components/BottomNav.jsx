import React from 'react';
import { Link } from "react-router-dom";
import { FaBars, FaHome, FaFileAlt, FaChartBar, FaClock, FaUser, FaSignOutAlt, FaSun, FaMoon, FaCogs, FaCog, FaClipboard, FaAd, FaPlus } from "react-icons/fa";
import "./Navbar/style.css";
import "../Pages/Records/Records"
import "../Pages/AddTransaction/AddTransaction"
import "../Pages/Charts/Charts"
import "../Pages/Reports/Reports"
import "../Pages/Profile/Profile"

const BottomNav = () => {

  return (
    <>
    
    <div className="bottom-navbar">
    <Link to="/Records"> <button className="bottom-navbar-button"><FaClipboard size={24} />Records</button></Link>
      <Link to="/Charts"><button className="bottom-navbar-button"><FaChartBar size={24} /> Analysis</button></Link>
      <Link to="/AddTransaction"><button className="add-button"><FaPlus size={24} /></button></Link>
      <Link to="/Reports"><button className="bottom-navbar-button"><FaFileAlt size={24} /> Reports</button></Link>
      <Link to="/Profile"> <button className="bottom-navbar-button"><FaUser size={24} /> Profile</button></Link>
    </div>
    </>
  );
};

export default BottomNav;
