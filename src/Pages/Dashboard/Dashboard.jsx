import { useState, useEffect } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import "./Dashboard.css";

const Dashboard = () => {
  useUserAuth();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    setError(null); // Reset error state before fetching

    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response?.data?.transactions) {
        setTransactions(response.data.transactions);
      } else {
        setError("No transactions found.");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to fetch dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="relative">
      <main className="main-content">
        {loading ? (
          <p className="text-gray-400">Loading transactions...</p>
        ) : error ? (
          <div>
            <h2 className="text">Error</h2>
            <p className="text-gray-400">{error}</p>
          </div>
        ) : transactions.length > 0 ? (
          <div>
            <h2 className="text">Your Transactions</h2>
            <ul>
              {transactions.map((transaction) => (
                <li key={transaction.id || Math.random()} className="transaction-item">
                  <div className={`amount ${transaction.source ? "source" : "category"}`}>{transaction.type}</div>
                  <div className={`amount ${transaction.source ? "source" : "category"}`}>
                    {transaction.amount < 0 ? `-₹${Math.abs(transaction.amount)}` : `₹${transaction.amount}`}
                  </div>
                  <div className="date">{transaction.date}</div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <h2 className="text">No Records</h2>
            <p className="text-gray-400">Start by adding your first transaction</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;