import { CategoryType } from "../enums/CategoryType.jsx";

export default class Category {
  constructor({ id, user_id, name, type, created_at, updated_at }) {
    this.id = id;
    this.user_id = user_id;
    this.name = name;
    this.type = type;
    this.created_at = new Date(created_at);
    this.updated_at = updated_at ? new Date(updated_at) : this.created_at;
  }

  isIncome() {
    return this.type === CategoryType.INCOME;
  }
  isExpense() {
    return this.type === CategoryType.EXPENSE;
  }
}
