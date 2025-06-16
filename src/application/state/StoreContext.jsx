import { createContext, useReducer } from "react";

export const StoreContext = createContext();

const initialState = {
  user: {
    id: "u1",
    name: "John Doe",
    email: "john.doe@example.com",
  },
  transactions: [
    { id: "t1", description: "Salary", amount: 5000, date: "2025-06-01", type: "income", category: "Salary" },
    { id: "t2", description: "Rent", amount: 1200, date: "2025-06-03", type: "expense", category: "Rent" },
    { id: "t3", description: "Groceries", amount: 150, date: "2025-06-05", type: "expense", category: "Food" },
    { id: "t4", description: "Electricity Bill", amount: 75, date: "2025-06-07", type: "expense", category: "Utilities" },
    { id: "t5", description: "Freelance Work", amount: 800, date: "2025-06-10", type: "income", category: "Freelance" },
  ],
  categories: [
    { id: "c1", name: "Salary", type: "Income", createdAt: "2025-01-01" },
    { id: "c2", name: "Rent", type: "Expense", createdAt: "2025-01-05" },
    { id: "c3", name: "Food", type: "Expense", createdAt: "2025-01-08" },
    { id: "c4", name: "Utilities", type: "Expense", createdAt: "2025-01-10" },
    { id: "c5", name: "Freelance", type: "Income", createdAt: "2025-01-15" },
  ],
  notifications: [
    { id: "n1", message: "Rent payment due tomorrow", date: "2025-06-02T09:00:00Z", type: "reminder" },
    { id: "n2", message: "Electricity bill paid", date: "2025-06-07T08:30:00Z", type: "info" },
    { id: "n3", message: "New transaction added: Groceries", date: "2025-06-05T18:45:00Z", type: "info" },
    { id: "n4", message: "Freelance payment received", date: "2025-06-10T15:20:00Z", type: "warning" },
    { id: "n5", message: "Monthly financial report is ready", date: "2025-06-11T12:00:00Z", type: "info" },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_TRANSACTIONS":
      return { ...state, transactions: action.payload };
    case "ADD_TRANSACTION":
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case "UPDATE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map((txn) => (txn.id === action.payload.id ? action.payload : txn)),
      };
    case "REMOVE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter((txn) => txn.id !== action.payload),
      };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_NOTIFICATIONS":
      return { ...state, notifications: action.payload };
    case "ADD_NOTIFICATION":
      return { ...state, notifications: [action.payload, ...state.notifications] };
    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.payload),
      };
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
}
