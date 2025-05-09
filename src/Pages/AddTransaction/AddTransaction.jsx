import React, { useState, useContext } from "react";
import {
  FaHome, FaBus, FaUtensils, FaMoneyBill, FaBriefcase, FaGift, FaPlane, FaShoppingBag
} from "react-icons/fa";
import "./AddTransaction.css";
import ExpenseForm from "../../components/Inputs/ExpenseForm";
import IncomeForm from "../../components/Inputs/IncomeForm";
import { useUserAuth } from "../../hooks/useUserAuth";

const categories = {
  Expense: [
    { name: "Household", icon: <FaHome size={40} /> },
    { name: "Outing", icon: <FaBus size={40} /> },
    { name: "Food", icon: <FaUtensils size={40} /> },
    { name: "Travel", icon: <FaPlane size={40} /> },
    { name: "Shopping", icon: <FaShoppingBag size={40} /> },
  ],
  Income: [
    { name: "Salary", icon: <FaMoneyBill size={40} /> },
    { name: "Business", icon: <FaBriefcase size={40} /> },
    { name: "Other", icon: <FaGift size={40} /> },
  ],
};

const AddTransaction = () => {
  useUserAuth(); // ✅ Ensures correct authentication handling
  const [selectedType, setSelectedType] = useState("Expense");
  const [selectedCategory, setSelectedCategory] = useState(null);


  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="add-transaction-container">
      <h2 className="title">Add Transaction</h2>

      {/* Transaction Type Toggle */}
      <div className="transaction-type">
        {["Expense", "Income"].map((type) => (
          <button key={type} className={`type-btn ${selectedType === type ? "active" : ""}`} onClick={() => setSelectedType(type)}>
            {type}
          </button>
        ))}
      </div>

      {/* Categories Grid */}
      <div className="categories-grid">
        {categories[selectedType].map((category) => (
          <div key={category.name} className="category-card" onClick={() => handleCategoryClick(category.name)}>
            {category.icon}
            <span>{category.name}</span>
          </div>
        ))}
      </div>

      {/* Render Form Based on Selection */}
      {selectedCategory && (
        selectedType === "Expense" ? (
          <ExpenseForm category={selectedCategory} onClose={() => setSelectedCategory(null)} />
        ) : (
          <IncomeForm category={selectedCategory} onClose={() => setSelectedCategory(null)} />
        )
      )}
    </div>
  );
};

export default AddTransaction;