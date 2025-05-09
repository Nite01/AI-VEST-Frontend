import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { addThousandsSeparator } from "../../utils/helper";
import "./Records.css";

const TransactionList = () => {
  useUserAuth();

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();
  const currentMonthYear = `${currentMonth} ${currentYear}`;

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [transactions, setTransactions] = useState([]); // ✅ Initialize transactions
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response?.data) {
        setDashboardData(response.data);

        if (response.data.transactions) {
          setTransactions(response.data.transactions); // ✅ Update state with transactions
        }
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      alert("Failed to fetch dashboard data. Please check your connection or login again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="transaction-list">
      <div className="header">
        <h1>{currentMonthYear}</h1>
        <div className="totals">
          <div>
            <span>Income</span>
            <span>{addThousandsSeparator(dashboardData?.totalIncome || 0)}</span>
          </div>
          <div>
            <span>Expenses</span>
            <span>-{addThousandsSeparator(dashboardData?.totalExpenses || 0)}</span>
          </div>
          <div>
            <span>Balance</span>
            <span>{addThousandsSeparator(dashboardData?.totalBalance || 0)}</span>
          </div>
        </div>
      </div>

      <div className="transactions">
        {transactions.map((transaction, index) => (
          <div key={index} className="transaction-item">
            <span>{transaction.date}</span>
            <span>{transaction.type}</span>
            <span>{transaction.source || transaction.category}</span>
            <span className={`amount ${transaction.source ? "source" : "category"}`}>{addThousandsSeparator(transaction.amount)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;