// src/application/state/StoreContext.jsx
import React, { createContext, useReducer, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import {
  getCurrentUser,
  updateCurrentUser as apiUpdateUser,
  listTransactions,
  createTransaction as apiCreateTransaction,
  updateTransaction as apiUpdateTransaction,
  deleteTransaction as apiDeleteTransaction,
  listCategories,
  createCategory as apiCreateCategory,
  updateCategory as apiUpdateCategory,
  deleteCategory as apiDeleteCategory,
  listNotifications,
  createNotification as apiCreateNotification,
  updateNotification as apiUpdateNotification,
  deleteNotification as apiDeleteNotification,
} from "../../infrastructure/api/backend_service/backendService";

import User from "../../domain/entities/User";
import Transaction from "../../domain/entities/Transaction";
import Category from "../../domain/entities/Category";
import Notification from "../../domain/entities/Notification";

export const StoreContext = createContext();

const initialState = {
  user: null,
  transactions: [],
  categories: [],
  notifications: [],
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
        transactions: state.transactions.map((t) => (t.id === action.payload.id ? action.payload : t)),
      };
    case "REMOVE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };

    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "ADD_CATEGORY":
      return { ...state, categories: [action.payload, ...state.categories] };
    case "UPDATE_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((c) => (c.id === action.payload.id ? action.payload : c)),
      };
    case "REMOVE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter((c) => c.id !== action.payload),
      };

    case "SET_NOTIFICATIONS":
      return { ...state, notifications: action.payload };
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };
    case "UPDATE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.map((n) => (n.id === action.payload.id ? action.payload : n)),
      };
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
  const { getAccessTokenSilently } = useAuth0();

  // wrap raw user → User entity
  const wrapUser = (raw) =>
    new User({
      id: raw.id,
      auth0_id: raw.auth0_id,
      name: raw.name,
      email: raw.email,
      subscription: raw.subscription,
      created_at: raw.created_at,
      updated_at: raw.updated_at,
    });

  // wrap raw txn → Transaction entity
  const wrapTxn = (r) =>
    new Transaction({
      id: r.id,
      user_id: r.user_id,
      category_id: r.category_id,
      description: r.description,
      amount: r.amount,
      type: r.type,
      date: r.date,
      is_recurring: r.is_recurring,
      created_at: r.created_at,
      updated_at: r.updated_at,
    });

  // wrap raw cat → Category entity
  const wrapCat = (r) =>
    new Category({
      id: r.id,
      user_id: r.user_id,
      name: r.name,
      type: r.type,
      created_at: r.created_at,
      updated_at: r.updated_at,
    });

  // wrap raw note → Notification entity
  const wrapNote = (r) =>
    new Notification({
      id: r.id,
      user_id: r.user_id,
      message: r.message,
      type: r.type,
      is_read: r.is_read,
      scheduled_for: r.scheduled_for,
      created_at: r.created_at,
      updated_at: r.updated_at,
    });

  // load initial data
  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        });

        // user
        const rawUser = await getCurrentUser(token);
        dispatch({ type: "SET_USER", payload: wrapUser(rawUser) });

        // transactions
        const rawTxns = await listTransactions(token);
        dispatch({
          type: "SET_TRANSACTIONS",
          payload: rawTxns.map(wrapTxn),
        });

        // categories
        const rawCats = await listCategories(token);
        dispatch({
          type: "SET_CATEGORIES",
          payload: rawCats.map(wrapCat),
        });

        // notifications
        const rawNotes = await listNotifications(token);
        dispatch({
          type: "SET_NOTIFICATIONS",
          payload: rawNotes.map(wrapNote),
        });
      } catch (e) {
        console.error("Failed to load initial data", e);
      }
    })();
  }, [getAccessTokenSilently]);

  // user
  const updateUser = async (updates) => {
    const token = await getAccessTokenSilently({ audience: import.meta.env.VITE_AUTH0_AUDIENCE });
    const raw = await apiUpdateUser(updates, token);
    const user = wrapUser(raw);
    dispatch({ type: "SET_USER", payload: user });
    return user;
  };

  // transactions
  const addTransaction = async (txn) => {
    const token = await getAccessTokenSilently({ audience: import.meta.env.VITE_AUTH0_AUDIENCE });
    const raw = await apiCreateTransaction(txn, token);
    const created = wrapTxn(raw);
    dispatch({ type: "ADD_TRANSACTION", payload: created });

    // Fetch updated notifications
    const updatedNotes = await listNotifications(token);
    dispatch({ type: "SET_NOTIFICATIONS", payload: updatedNotes.map(wrapNote) });

    return created;
  };

  const updateTransaction = async (id, txn) => {
    const token = await getAccessTokenSilently({ audience: import.meta.env.VITE_AUTH0_AUDIENCE });
    const raw = await apiUpdateTransaction(id, txn, token);
    const updated = wrapTxn(raw);
    dispatch({ type: "UPDATE_TRANSACTION", payload: updated });

    const updatedNotes = await listNotifications(token);
    dispatch({ type: "SET_NOTIFICATIONS", payload: updatedNotes.map(wrapNote) });

    return updated;
  };

  const removeTransaction = async (id) => {
    const token = await getAccessTokenSilently({ audience: import.meta.env.VITE_AUTH0_AUDIENCE });
    await apiDeleteTransaction(id, token);
    dispatch({ type: "REMOVE_TRANSACTION", payload: id });

    const updatedNotes = await listNotifications(token);
    dispatch({ type: "SET_NOTIFICATIONS", payload: updatedNotes.map(wrapNote) });
  };

  // categories
  const addCategory = async (cat) => {
    const token = await getAccessTokenSilently({ audience: import.meta.env.VITE_AUTH0_AUDIENCE });
    const raw = await apiCreateCategory(cat, token);
    const created = wrapCat(raw);
    dispatch({ type: "ADD_CATEGORY", payload: created });

    const updatedNotes = await listNotifications(token);
    dispatch({ type: "SET_NOTIFICATIONS", payload: updatedNotes.map(wrapNote) });

    return created;
  };

  const updateCategory = async (id, cat) => {
    const token = await getAccessTokenSilently({ audience: import.meta.env.VITE_AUTH0_AUDIENCE });
    const raw = await apiUpdateCategory(id, cat, token);
    const updated = wrapCat(raw);
    dispatch({ type: "UPDATE_CATEGORY", payload: updated });

    const updatedNotes = await listNotifications(token);
    dispatch({ type: "SET_NOTIFICATIONS", payload: updatedNotes.map(wrapNote) });

    return updated;
  };

  const removeCategory = async (id) => {
    const token = await getAccessTokenSilently({ audience: import.meta.env.VITE_AUTH0_AUDIENCE });
    await apiDeleteCategory(id, token);
    dispatch({ type: "REMOVE_CATEGORY", payload: id });

    const updatedNotes = await listNotifications(token);
    dispatch({ type: "SET_NOTIFICATIONS", payload: updatedNotes.map(wrapNote) });
  };

  // notifications
  const addNotification = async (note) => {
    const token = await getAccessTokenSilently({ audience: import.meta.env.VITE_AUTH0_AUDIENCE });
    const raw = await apiCreateNotification(note, token);
    const created = wrapNote(raw);
    dispatch({ type: "ADD_NOTIFICATION", payload: created });
    return created;
  };
  const updateNotification = async (id, note) => {
    const token = await getAccessTokenSilently({ audience: import.meta.env.VITE_AUTH0_AUDIENCE });
    const raw = await apiUpdateNotification(id, note, token);
    const updated = wrapNote(raw);
    dispatch({ type: "UPDATE_NOTIFICATION", payload: updated });
    return updated;
  };
  const removeNotification = async (id) => {
    const token = await getAccessTokenSilently({ audience: import.meta.env.VITE_AUTH0_AUDIENCE });
    await apiDeleteNotification(id, token);
    dispatch({ type: "REMOVE_NOTIFICATION", payload: id });
  };

  const contextValue = {
    state,
    dispatch,
    updateUser,
    addTransaction,
    updateTransaction,
    removeTransaction,
    addCategory,
    updateCategory,
    removeCategory,
    addNotification,
    updateNotification,
    removeNotification,
  };

  return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
}
