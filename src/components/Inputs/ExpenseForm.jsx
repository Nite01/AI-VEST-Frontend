import React, { useState } from "react";
import "./ExpenseForm.css";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { useUserAuth } from "../../hooks/useUserAuth";

const ExpenseForm = ({ subcategory, onClose }) => {
    useUserAuth();

    const [expense, setExpense] = useState({ category: subcategory, amount: "", date: "" });

    const handleSubmit = async () => {
        const { category, amount, date } = expense;

        // Validation Checks
        if (!category.trim()) {
            toast.error("Category is required.");
            return;
        }
        if (!amount || isNaN(amount) || Number(amount) <= 0 || !/^\d+(\.\d{1,2})?$/.test(amount)) {
            toast.error("Amount must be a valid number greater than 0 with up to 2 decimal places.");
            return;
        }
        if (!date) {
            toast.error("Date is required.");
            return;
        }

        try {
            await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, { category, amount, date });
            toast.success("Expense added successfully");
            onClose(); // Close form after success
        } catch (error) {
            console.error("Error adding expense:", error.response?.data?.message || error.message);
            toast.error("Failed to add expense. Please try again.");
        }
    };

    return (
        <div className="modal">
            <h2>Add Expense</h2>
            <input
                type="text"
                placeholder="Category"
                value={expense.category}
                onChange={(e) => setExpense({ ...expense, category: e.target.value })}
            />
            <input
                type="number"
                placeholder="Amount"
                value={expense.amount}
                onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
            />
            <input
                type="date"
                value={expense.date}
                onChange={(e) => setExpense({ ...expense, date: e.target.value })}
            />
            <button onClick={handleSubmit}>Save</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default ExpenseForm;