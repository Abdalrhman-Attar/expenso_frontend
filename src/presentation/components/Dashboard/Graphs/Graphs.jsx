import "./Graphs.css";
import { useStore } from "../../../../application/utils/hooks";
import Transaction from "../../../../domain/entities/Transaction";
import Category from "../../../../domain/entities/Category";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";

const Graphs = () => {
  const {
    theme,
    state: { transactions: rawTx, categories: rawCats },
  } = useStore();

  const transactions = rawTx.map((t) => new Transaction(t));
  const categories = rawCats.map((c) => new Category(c));

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

  // Last 7 Days Balance Chart
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const label = date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "numeric",
      day: "numeric",
    });

    const total = transactions.filter((tx) => new Date(tx.date).toDateString() === date.toDateString()).reduce((sum, tx) => sum + tx.netValue(), 0);

    return { day: label, total };
  });

  // Income/Expense by Category
  const incomeData = categories
    .map((cat) => {
      const value = transactions.filter((tx) => tx.category_id === cat.id && tx.isIncome()).reduce((sum, tx) => sum + tx.amount, 0);
      return { name: cat.name, value };
    })
    .filter((entry) => entry.value > 0);

  const expenseData = categories
    .map((cat) => {
      const value = transactions.filter((tx) => tx.category_id === cat.id && tx.isExpense()).reduce((sum, tx) => sum + tx.amount, 0);
      return { name: cat.name, value };
    })
    .filter((entry) => entry.value > 0);

  return (
    <div className={`dashboard-graphs card ${theme}-mode`}>
      <h4>Balance Over Last 7 Days</h4>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={last7Days}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip formatter={(val) => `$${val.toFixed(2)}`} />
          <Line type="monotone" dataKey="total" stroke="var(--primary-color)" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>

      {/* Expense Breakdown */}
      <h4 className="mt-4">Expense Breakdown</h4>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={expenseData} dataKey="value" nameKey="name" outerRadius={80} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
            {expenseData.map((_, idx) => (
              <Cell key={`expense-cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(val) => `$${val.toFixed(2)}`} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>

      {/* Income Breakdown */}
      <h4 className="mt-4">Income Breakdown</h4>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={incomeData} dataKey="value" nameKey="name" outerRadius={80} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
            {incomeData.map((_, idx) => (
              <Cell key={`income-cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(val) => `$${val.toFixed(2)}`} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graphs;
