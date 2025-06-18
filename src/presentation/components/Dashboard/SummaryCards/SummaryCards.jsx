import "./SummaryCards.css";
import { useEffect } from "react";
import { useStore, useTheme } from "../../../../application/utils/hooks";

const SummaryCards = () => {
  const {
    theme,
    state: { transactions, notifications },
    addNotification,
  } = useStore();

  const balance = transactions.reduce((sum, t) => sum + (t.isIncome() ? t.amount : -t.amount), 0);

  const thisMonth = new Date().getMonth();
  const income = transactions.filter((t) => t.isIncome() && new Date(t.date).getMonth() === thisMonth).reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions.filter((t) => !t.isIncome() && new Date(t.date).getMonth() === thisMonth).reduce((sum, t) => sum + t.amount, 0);

  const cards = [
    { title: "Total Balance", value: `$${balance.toFixed(2)}` },
    { title: "Income This Month", value: `$${income.toFixed(2)}` },
    { title: "Expenses This Month", value: `$${expenses.toFixed(2)}` },
  ];

  // Utility: checks if a message with same content exists today
  const notificationExistsToday = (msg) => {
    const todayStr = new Date().toDateString();
    return notifications.some((n) => {
      const nDate = new Date(n.scheduledFor || n.scheduled_for).toDateString();
      return n.message === msg && nDate === todayStr;
    });
  };

  useEffect(() => {
    const now = new Date().toISOString();

    if (balance < 0) {
      const msg = `Your balance is negative: $${balance.toFixed(2)}`;
      if (!notificationExistsToday(msg)) {
        addNotification({
          message: msg,
          type: "warning",
          scheduled_for: now,
        });
      }
    } else if (balance < 50) {
      const msg = `Your balance is getting low: $${balance.toFixed(2)}`;
      if (!notificationExistsToday(msg)) {
        addNotification({
          message: msg,
          type: "info",
          scheduled_for: now,
        });
      }
    }
  }, [balance, notifications, addNotification]);

  return (
    <div className={`summary-cards ${theme}-mode`}>
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
