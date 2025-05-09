import React, { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useUserAuth } from "../../hooks/useUserAuth";


const IncomeForm = ({ subcategory, onClose, fetchIncomeDetails }) => {
    useUserAuth();

    const [income, setIncome] = useState({ source: subcategory, amount: "", date: "" });

    const handleSubmit = async () => {
        const { source, amount, date } = income;

        if (!source.trim()) {
            toast.error("Source is required.");
            return;
        }
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Amount should be a valid number greater than 0.");
            return;
        }
        if (!date) {
            toast.error("Date is required.");
            return;
        }

        try {
            await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
                source,
                amount,
                date
            });

            toast.success("Income added successfully");
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || "Error adding income.");
            console.error("Error adding income:", error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="modal">
            <h2>Add Income for {subcategory}</h2>
            <input type="text" placeholder="Source" onChange={(e) => setIncome({ ...income, source: e.target.value })} />
            <input type="number" placeholder="Amount" onChange={(e) => setIncome({ ...income, amount: e.target.value })} />
            <input type="date" onChange={(e) => setIncome({ ...income, date: e.target.value })} />
            <button onClick={handleSubmit}>Save</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default IncomeForm;