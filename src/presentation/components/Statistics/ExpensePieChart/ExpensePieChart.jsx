// src/presentation/components/Statistics/ExpensePieChart/ExpensePieChart.jsx
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useStore } from "../../../../application/utils/hooks";
import Transaction from "../../../../domain/entities/Transaction";
import Category from "../../../../domain/entities/Category";
import "./ExpensePieChart.css";

const COLORS = ["#FF6666", "#FFA500", "#FFCA28", "#FF8042", "#D32F2F"];

const ExpensePieChart = ({ timePeriod }) => {
  const {
    theme,
    state: { transactions: rawTx, categories: rawCats },
  } = useStore();

  // Wrap in your domain entities
  const transactions = rawTx.map((t) => new Transaction(t));
  const categories = rawCats.map((c) => new Category(c));
  const now = new Date();

  // Filter only expenses in the selected period
  const filtered = transactions
    .filter((tx) => tx.isExpense())
    .filter((tx) => {
      const d = new Date(tx.date);
      if (timePeriod === "Daily") {
        return d.toDateString() === now.toDateString();
      }
      if (timePeriod === "Monthly") {
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      }
      if (timePeriod === "Yearly") {
        return d.getFullYear() === now.getFullYear();
      }
      return true;
    });

  // Sum amounts by category ID
  const aggByCatId = filtered.reduce((acc, tx) => {
    const catId = tx.category_id;
    acc[catId] = (acc[catId] || 0) + Math.abs(tx.amount);
    return acc;
  }, {});

  // Build data array matching category names
  const data = categories
    .map((cat) => ({
      name: cat.name,
      value: aggByCatId[cat.id] || 0,
    }))
    .filter((entry) => entry.value > 0);

  return (
    <div className={`chart-container ${theme}-mode`}>
      <h5>Expense Breakdown</h5>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
            {data.map((_, i) => (
              <Cell key={`expense-cell-${i}`} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(val) => `$${val.toFixed(2)}`} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensePieChart;
