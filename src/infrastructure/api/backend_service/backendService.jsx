import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../../../application/constants/api";

import User from "../../../domain/entities/User";
import Category from "../../../domain/entities/Category";
import Transaction from "../../../domain/entities/Transaction";
import Notification from "../../../domain/entities/Notification";

const API = axios.create({
  baseURL: API_BASE_URL,
});

// --- Users ---
export const getCurrentUser = (token) =>
  API.get(`${API_ENDPOINTS.USERS}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => new User(res.data));

export const updateCurrentUser = (updates, token) =>
  API.patch(`${API_ENDPOINTS.USERS}/me`, updates, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => new User(res.data));

// --- Transactions ---
export const listTransactions = (token) =>
  API.get(API_ENDPOINTS.TRANSACTIONS, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.data.map((t) => new Transaction(t)));

export const getTransaction = (id, token) =>
  API.get(`${API_ENDPOINTS.TRANSACTIONS}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => new Transaction(res.data));

export const createTransaction = (txn, token) =>
  API.post(API_ENDPOINTS.TRANSACTIONS, txn, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => new Transaction(res.data));

export const updateTransaction = (id, txn, token) =>
  API.put(`${API_ENDPOINTS.TRANSACTIONS}/${id}`, txn, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => new Transaction(res.data));

export const deleteTransaction = (id, token) =>
  API.delete(`${API_ENDPOINTS.TRANSACTIONS}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// --- Categories ---
export const listCategories = (token) =>
  API.get(API_ENDPOINTS.CATEGORIES, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.data.map((c) => new Category(c)));

export const getCategory = (id, token) =>
  API.get(`${API_ENDPOINTS.CATEGORIES}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => new Category(res.data));

export const createCategory = (cat, token) =>
  API.post(API_ENDPOINTS.CATEGORIES, cat, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => new Category(res.data));

export const updateCategory = (id, cat, token) =>
  API.put(`${API_ENDPOINTS.CATEGORIES}/${id}`, cat, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => new Category(res.data));

export const deleteCategory = (id, token) =>
  API.delete(`${API_ENDPOINTS.CATEGORIES}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// --- Notifications ---
export const listNotifications = (token) =>
  API.get(API_ENDPOINTS.NOTIFICATIONS, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.data.map((n) => new Notification(n)));

export const getNotification = (id, token) =>
  API.get(`${API_ENDPOINTS.NOTIFICATIONS}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => new Notification(res.data));

export const createNotification = (note, token) =>
  API.post(API_ENDPOINTS.NOTIFICATIONS, note, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => new Notification(res.data));

export const updateNotification = (id, note, token) =>
  API.put(`${API_ENDPOINTS.NOTIFICATIONS}/${id}`, note, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => new Notification(res.data));

export const deleteNotification = (id, token) =>
  API.delete(`${API_ENDPOINTS.NOTIFICATIONS}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
