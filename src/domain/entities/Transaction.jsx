import { TransactionType } from "../enums/TransactionType.jsx";

export default class Transaction {
  constructor({ id, user_id, category_id, description, amount, type, date, created_at, updated_at }) {
    this.id = id;
    this.user_id = user_id;
    this.category_id = category_id;
    this.description = description;
    this.amount = parseFloat(amount);
    this.type = type;
    this.date = new Date(date);
    this.created_at = new Date(created_at);
    this.updated_at = updated_at ? new Date(updated_at) : this.created_at;
  }

  isIncome() {
    return this.type === TransactionType.INCOME;
  }
  isExpense() {
    return this.type === TransactionType.EXPENSE;
  }

  netValue() {
    return this.isIncome() ? this.amount : -this.amount;
  }
}
