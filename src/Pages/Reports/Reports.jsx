import React, { useState } from "react";
import { FaCarSide, FaCouch, FaHamburger, FaShoppingBag, FaTimes } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Reports.css"; // Import the CSS file

// Sample categories with initial budgets
const categories = [
  { name: "Food", icon: <FaHamburger />, budget: 1000, expenses: 400 },
  { name: "Transport", icon: <FaCarSide />, budget: 5000, expenses: 200 },
  { name: "Entertainment", icon: <FaCouch />, budget: 300, expenses: 150 },
  { name: "Shopping", icon: <FaShoppingBag />, budget: 800, expenses: 600 },
];

const ReportsPage = () => {
  const [selectedTab, setSelectedTab] = useState("Analytics");
  const [showBudgetPopup, setShowBudgetPopup] = useState(false);
  const [showOverflowPopup, setShowOverflowPopup] = useState(false);
  const [showMonthlyBudgetPopup, setShowMonthlyBudgetPopup] = useState(false); // New state for monthly budget popup
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newBudget, setNewBudget] = useState(0);
  const [newMonthlyBudget, setNewMonthlyBudget] = useState(0); // New state for monthly budget input
  const [monthlyBudget, setMonthlyBudget] = useState(50000); // Global monthly budget
  const [categoryBudgets, setCategoryBudgets] = useState(
    categories.reduce((acc, category) => {
      acc[category.name] = category.budget;
      return acc;
    }, {})
  );

  // Calculate total allocated budget for all categories
  const totalAllocatedBudget = Object.values(categoryBudgets).reduce(
    (sum, budget) => sum + budget,
    0
  );

  // Calculate remaining monthly budget
  const remainingMonthlyBudget = monthlyBudget - totalAllocatedBudget;

  const handleBudgetChange = (e) => {
    setNewBudget(Number(e.target.value));
  };

  const handleMonthlyBudgetChange = (e) => {
    setNewMonthlyBudget(Number(e.target.value)); // Update new monthly budget input
  };

  const handleSaveBudget = () => {
    if (newBudget > remainingMonthlyBudget + categoryBudgets[selectedCategory]) {
      setShowOverflowPopup(true); // Show overflow popup
      return;
    }

    // Update the category budget
    setCategoryBudgets((prev) => ({
      ...prev,
      [selectedCategory]: newBudget,
    }));
    setShowBudgetPopup(false);
  };

  const handleSaveMonthlyBudget = () => {
    if (newMonthlyBudget < totalAllocatedBudget) {
      alert("Monthly budget cannot be less than the total allocated budget.");
      return;
    }

    // Update the monthly budget
    setMonthlyBudget(newMonthlyBudget);
    setShowMonthlyBudgetPopup(false);
  };

  const openBudgetPopup = (category) => {
    setSelectedCategory(category);
    setNewBudget(categoryBudgets[category] || 0);
    setShowBudgetPopup(true);
  };

  const openMonthlyBudgetPopup = () => {
    setNewMonthlyBudget(monthlyBudget); // Set current monthly budget as default value
    setShowMonthlyBudgetPopup(true);
  };

  return (
    <div className="reports-container">
      {/* Header */}
      <h2 className="reports-header">Reports</h2>

      {/* Tabs */}
      <div className="tabs-container">
        {["Analytics", "Accounts"].map((tab) => (
          <button
            key={tab}
            className={`tab-button ${selectedTab === tab ? "active" : ""}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Show content only if the selected tab is "Analytics" */}
      {selectedTab === "Analytics" && (
        <>
          <div className="monthly-budget">
            <h3>Monthly Budget:</h3>
            <div>
              <span className="tc">Total Budget: {monthlyBudget}</span>
              <span className="tc">Allocated: {totalAllocatedBudget}</span>
              <span className="tc">Remaining: {remainingMonthlyBudget}</span>
            </div>
            <button
              onClick={openMonthlyBudgetPopup} // Open monthly budget popup
              className="set-budget-button"
            >
              Set Budget
            </button>
          </div>

          {/* Category Budgets */}
          <div className="category-budgets">
            <h3>Category Budgets:</h3>
            <div className="category-grid">
              {categories.map((category) => {
                const budget = categoryBudgets[category.name] || 0;
                const remaining = budget - category.expenses;
                const percentage = (remaining / budget) * 100;

                return (
                  <div key={category.name} className="category-card">
                    <div className="category-card-header">
                      <div>
                        <span className="text-2xl">{category.icon}</span>
                        <h4>{category.name}</h4>
                        <p>Budget: {budget}</p>
                        <p>Expenses: {category.expenses}</p>
                        <p>Remaining: {remaining}</p>
                      </div>
                      <div className="progress-bar-container">
                        <CircularProgressbar
                          value={percentage}
                          text={`${Math.round(percentage)}%`}
                          styles={buildStyles({
                            textColor: "black",
                            pathColor: "#eab308",
                            trailColor: "gray",
                          })}
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => openBudgetPopup(category.name)}
                      className="set-budget-button"
                    >
                      Set Budget
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Budget Popup */}
      {showBudgetPopup && (
        <div className="budget-popup-overlay">
          <div className="budget-popup">
            <div className="budget-popup-header">
              <h3>Set Budget for {selectedCategory}</h3>
              <button onClick={() => setShowBudgetPopup(false)}>
                <FaTimes />
              </button>
            </div>
            <input
              type="number"
              value={newBudget}
              onChange={handleBudgetChange}
              placeholder="Enter new budget"
            />
            <button onClick={handleSaveBudget}>Save</button>
          </div>
        </div>
      )}

      {/* Monthly Budget Popup */}
      {showMonthlyBudgetPopup && (
        <div className="budget-popup-overlay">
          <div className="budget-popup">
            <div className="budget-popup-header">
              <h3>Set Monthly Budget</h3>
              <button onClick={() => setShowMonthlyBudgetPopup(false)}>
                <FaTimes />
              </button>
            </div>
            <input
              type="number"
              value={newMonthlyBudget}
              onChange={handleMonthlyBudgetChange}
              placeholder="Enter new monthly budget"
            />
            <button onClick={handleSaveMonthlyBudget}>Save</button>
          </div>
        </div>
      )}

      {/* Overflow Popup */}
      {showOverflowPopup && (
        <div className="overflow-popup-overlay">
          <div className="overflow-popup">
            <div className="overflow-popup-header">
              <h3>Budget Overflow</h3>
              <button onClick={() => setShowOverflowPopup(false)}>
                <FaTimes />
              </button>
            </div>
            <p>
              You have reached the monthly budget and cannot allocate more.
            </p>
            <button onClick={() => setShowOverflowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;