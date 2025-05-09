import { useState } from "react";
import { format, addMonths, subMonths } from "date-fns";
import { motion } from "framer-motion";
import "./DataCalendar.css"
import { setMonth, setYear } from "date-fns";
import { FaArrowDown } from "react-icons/fa";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [expenses, setExpenses] = useState({
    "2025-03-05": 900, // Example expense
  });
  const [selectedDate, setSelectedDate] = useState(null); // Track selected date for adding expense
  const [newExpense, setNewExpense] = useState(""); // Track new expense input

  const dailyBudget = 645.16;

  // Handle next month
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  // Handle previous month
  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  // Handle month picker click
  const handleMonthClick = () => setShowMonthPicker(true);

  // Handle day click to add/delete expense
  const handleDayClick = (dateKey) => {
    setSelectedDate(dateKey);
    setNewExpense(expenses[dateKey] || ""); // Pre-fill input if expense exists
  };
  const handleConfirmMonthYear = () => {
    setCurrentDate(setYear(setMonth(currentDate, selectedMonth), selectedYear));
    setShowMonthPicker(false);
  };

  // Handle adding/updating an expense
  const handleAddExpense = () => {
    if (newExpense.trim() === "") return;

    const updatedExpenses = { ...expenses, [selectedDate]: parseFloat(newExpense) };
    setExpenses(updatedExpenses);
    setSelectedDate(null); // Close input
    setNewExpense(""); // Clear input
  };

  // Handle deleting an expense
  const handleDeleteExpense = () => {
    const updatedExpenses = { ...expenses };
    delete updatedExpenses[selectedDate]; // Remove expense for the selected date
    setExpenses(updatedExpenses);
    setSelectedDate(null); // Close input
  };

  // Render days of the month
  const renderDays = () => {
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    return days.map((day) => {
      const dateKey = `${format(startDate, "yyyy-MM")}-${String(day).padStart(2, "0")}`;
      const expense = expenses[dateKey] || 0;
      const isOverBudget = expense > dailyBudget;
      const isUnderBudget = expense > 0 && expense <= dailyBudget;

      return (
        <motion.div
          key={day}
          className={`day-container ${isOverBudget
              ? "over-budget"
              : isUnderBudget
                ? "under-budget"
                : "neutral"
            }`}
          onClick={() => handleDayClick(dateKey)}
        >
          {day}
          {expense > 0 && <div className="expense">{expense}</div>}
        </motion.div>
      );
    });
  };

  return (
    <div className="contaiiner">

      <div className="flex2-container">
        <button onClick={handlePrevMonth}>⬅️</button>
        <h2 onClick={handleMonthClick} className="heading">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <button onClick={handleNextMonth}>➡️</button>
      </div>

      {/* Calendar Days */}
      <div className="days-container">{renderDays()}</div>

      {/* Expense Input Modal */}
      {selectedDate && (
        <div className="overlay2">
          <div className="overlay2-container">
            <h3>Add/Edit Expense for {selectedDate}</h3>
            <input
              type="number"
              placeholder="Enter expense"
              value={newExpense}
              onChange={(e) => setNewExpense(e.target.value)}
              className="date-input"
            />
            <div className="button-flex">
              <button
                onClick={handleAddExpense}
                className="button"
              >
                {expenses[selectedDate] ? "Update" : "Add"}
              </button>
              {expenses[selectedDate] && (
                <button
                  onClick={handleDeleteExpense}
                  className="delete-button"
                >
                  Delete
                </button>
              )}
              <button
                onClick={() => setSelectedDate(null)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showMonthPicker && (<div className="month-picker-overlay">

        <div className="month-picker-container">
          <h3>{format(new Date(selectedYear, selectedMonth), "MMMM yyyy")}</h3>
          <div className="month-picker">
            {[...Array(12).keys()].map((m) => (
              <button key={m} onClick={() => setSelectedMonth(m)} className={selectedMonth === m ? "selected" : ""}>
                {format(new Date(2000, m), "MMM")}
              </button>
            ))}
          </div>
          <div className="year-selector">
            <button onClick={() => setSelectedYear(selectedYear - 1)}>◀</button>
            <span>{selectedYear}</span>
            <button onClick={() => setSelectedYear(selectedYear + 1)}>▶</button>
          </div>
          <div className="modal-actions">
            <button onClick={() => setShowMonthPicker(false)}>Cancel</button>
            <button onClick={handleConfirmMonthYear}>Confirm</button>
          </div>
        </div>
      </div>
      )}

    </div>
  );
};

export default Calendar; 
