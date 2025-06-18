// src/presentation/components/Statistics/IncomePieChart/IncomePieChart.jsx
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useStore, useTheme } from "../../../../application/utils/hooks";
import "./IncomePieChart.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28FD0"];

const IncomePieChart = ({ timePeriod }) => {
  const {
    theme,
    state: { transactions },
  } = useStore();
  const now = new Date();

  // filter by income and selected period
  const filtered = transactions
    .filter((tx) => tx.type === "Income")
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

  // aggregate by category
  const aggregated = filtered.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + Math.abs(tx.amount);
    return acc;
  }, {});
  const data = Object.entries(aggregated).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className={`chart-container ${theme}-mode`}>
      <h5>Income Breakdown</h5>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} label>
            {data.map((_, i) => (
              <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(val) => `$${val.toFixed(2)}`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomePieChart;
