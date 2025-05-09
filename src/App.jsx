import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "../src/context/ThemeContext/ThemeContext";
import { Toaster } from "react-hot-toast";

import LoginPage from "./Pages/Login/Login";
import HomePage from "../src/Pages/Dashboard/Dashboard";
import RecordsPage from "../src/Pages/Records/Records";
import AddTransaction from "../src/Pages/AddTransaction/AddTransaction";
import Charts from "../src/Pages/Charts/Charts";
import Reports from "../src/Pages/Reports/Reports";
import Profile from "../src/Pages/Profile/Profile";
import DateCalendar from "./Pages/DateCalendar/DateCalendar";
import BottomNavbar from "../src/components/BottomNav";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Navbar/Sidebar";

const App = () => {

  return (
    <UserProvider>
      <ThemeProvider>
        <Router>
          <AuthLayout>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<HomePage />} />
              <Route path="/records" element={<RecordsPage />} />
              <Route path="/AddTransaction" element={<AddTransaction />} />
              <Route path="/Charts" element={<Charts />} />
              <Route path="/Reports" element={<Reports />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/DateCalendar" element={<DateCalendar />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AuthLayout>
        </Router>
      </ThemeProvider>

      <Toaster toastOptions={{ style: { fontSize: "13px" } }} />
    </UserProvider>
  );
};

export default App;

const Root = () => {
  // Check authentication status using token
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

const AuthLayout = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  const hideNavigation = ["/", "/login"].includes(window.location.pathname);

  return (
    <div className="app-container">
      {isAuthenticated && !hideNavigation && <Navbar onLogout={handleLogout} />}
      {isAuthenticated && !hideNavigation && <Sidebar />}
      {children}
      {isAuthenticated && !hideNavigation && <BottomNavbar />}
    </div>
  );
};