import "./SummaryCards.css";
import { useStore } from "../../../../application/utils/hooks";

const SummaryCards = () => {
  const [state] = useStore();
  const { transactions } = state;
  const balance = transactions.reduce((sum, t) => sum + (t.type === "income" ? t.amount : -t.amount), 0);
  const month = new Date().getMonth();
  const income = transactions.filter((t) => t.type === "income" && new Date(t.date).getMonth() === month).reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions.filter((t) => t.type === "expense" && new Date(t.date).getMonth() === month).reduce((sum, t) => sum + t.amount, 0);

  const cards = [
    { title: "Total Balance", value: `$${balance.toFixed(2)}` },
    { title: "Income This Month", value: `$${income.toFixed(2)}` },
    { title: "Expenses This Month", value: `$${expenses.toFixed(2)}` },
  ];

  return (
    <div className="summary-cards">
      {cards.map((card) => (
        <div key={card.title} className="card summary-card">
          <h3>{card.title}</h3>
          <p>{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
