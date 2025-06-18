// src/presentation/components/Statistics/IncomeExpenseBarChart/IncomeExpenseBarChart.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useStore, useTheme } from "../../../../application/utils/hooks";
import "./IncomeExpenseBarChart.css";

const COLORS = { income: "#82ca9d", expense: "#ff6b6b" };

const IncomeExpenseBarChart = ({ timePeriod }) => {
  const {
    theme,
    state: { transactions },
  } = useStore();

  // Group transactions by the chosen period key
  const groups = {};
  transactions.forEach((tx) => {
    const d = new Date(tx.date);
    let key;
    if (timePeriod === "Daily") {
      key = d.getHours().toString().padStart(2, "0") + ":00";
    } else if (timePeriod === "Monthly") {
      key = d.toLocaleString("default", { month: "short" });
    } else {
      key = d.getFullYear().toString();
    }
    if (!groups[key]) groups[key] = { income: 0, expense: 0 };
    groups[key][tx.type.toLowerCase()] += Math.abs(tx.amount);
  });

  // Transform into array
  const data = Object.entries(groups).map(([name, vals]) => ({
    name,
    ...vals,
  }));

  return (
    <div className={`chart-container ${theme}-mode`}>
      <h5>Income vs Expense Over Time</h5>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="var(--text-color)" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Legend />
          <Bar dataKey="income" fill={COLORS.income} />
          <Bar dataKey="expense" fill={COLORS.expense} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeExpenseBarChart;
