import React, { useState, useEffect } from "react";
import { BarChart, Bar, PieChart, Pie, Tooltip, Legend, Cell, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import "./Charts.css"; // Import the CSS file

// Colors for Pie Charts
const COLORS = ["#FF5733", "#33FF57", "#337BFF", "#FFF200"];

const Charts = () => {

  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response?.data) {
        setMonthlyData(response.data.monthlyData);
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      alert("Failed to fetch dashboard data. Please check your connection or login again.");
    } finally {
      setLoading(false);
    }
  };

  // Get All Expense Details
  const fetchExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE, {
        params: { format: "chart" } // Request grouped data for charts
      });

      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("Error fetching expense data:", error);
    }
  };

  // Get All Income Details
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME, {
        params: { format: "chart" }
      }
      );

      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchExpenseDetails();
    fetchIncomeDetails();
  }, []);

  return (
    <div className="charts-container">

      <div className="charts-header">
        <Link to="/" className="text-white">
          <FaArrowLeft size={24} className="icon" />
        </Link>
        <h2>Charts & Insights</h2>
      </div>


      <div className="pie-charts-container">

        <div className="pie-chart-wrapper">
          <h1>Expenses Breakdown</h1>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={expenseData}
                dataKey="value"
                nameKey="category"
                outerRadius={80}
                innerRadius={40}
                fill="#FF5733"
                label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(0)}%`}
                animationDuration={800}
              >
                {expenseData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip wrapperStyle={{ backgroundColor: "#333", color: "#fff", borderRadius: "5px" }} />
              <Legend verticalAlign="bottom" iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>


        <div className="pie-chart-wrapper">
          <h1>Income Breakdown</h1>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={incomeData}
                dataKey="value"
                nameKey="source" // ✅ Changed to "source"
                outerRadius={80}
                innerRadius={40} // ✅ Makes it a donut chart
                fill="#33FF57"
                label={({ source, percent }) => `${source}: ${(percent * 100).toFixed(0)}%`} // ✅ Show source & percentage
                animationDuration={800}
              >
                {incomeData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth="0" />
                ))}
              </Pie>
              <Tooltip wrapperStyle={{ backgroundColor: "#333", color: "#fff", borderRadius: "5px" }} />
              <Legend verticalAlign="bottom" iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>


      <div className="bar-chart-container">
        <h3>Monthly Trends</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyData}>
            <XAxis dataKey="month" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Income" fill="#33FF57" />
            <Bar dataKey="Expense" fill="#FF5733" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
