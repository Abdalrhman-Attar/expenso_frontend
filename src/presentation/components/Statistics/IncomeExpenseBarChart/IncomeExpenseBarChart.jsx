import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useStore } from "../../../../application/utils/hooks";
import "./IncomeExpenseBarChart.css";

const COLORS = { income: "#82ca9d", expense: "#ff6b6b" };

const IncomeExpenseBarChart = ({ timePeriod }) => {
  const [{ transactions }] = useStore();

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

  const data = Object.entries(groups).map(([name, vals]) => ({
    name,
    ...vals,
  }));

  return (
    <div className="chart-container">
      <h5>Income vs Expense Over Time</h5>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill={COLORS.income} />
          <Bar dataKey="expense" fill={COLORS.expense} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeExpenseBarChart;
