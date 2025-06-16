import "./Graphs.css";
import { useStore } from "../../../../application/utils/hooks";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";

const Graphs = () => {
  const [state] = useStore();
  const { transactions, categories } = state;

  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dayStr = date.toLocaleDateString();
    const total = transactions.filter((t) => new Date(t.date).toLocaleDateString() === dayStr).reduce((sum, t) => sum + (t.type === "income" ? t.amount : -t.amount), 0);
    return { day: dayStr, total };
  });

  const categoryData = categories.map((cat) => {
    const value = transactions
      .filter((t) => t.category === cat.name) 
      .reduce((sum, t) => sum + t.amount, 0);
    return { name: cat.name, value };
  });

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

  return (
    <div className="dashboard-graphs card">
      <h4>Balance Over Last 7 Days</h4>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={last7Days}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="var(--primary-color)" />
        </LineChart>
      </ResponsiveContainer>
      <h4>Category Breakdown</h4>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={80} label>
            {categoryData.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graphs;
