import { NotificationType } from "../enums/NotificationType.jsx";

export default class Notification {
  constructor({ id, user_id, message, type, is_read, scheduled_for, created_at, updated_at }) {
    this.id = id;
    this.user_id = user_id;
    this.message = message;
    this.type = type;
    this.is_read = Boolean(is_read);
    this.scheduled_for = new Date(scheduled_for);
    this.created_at = new Date(created_at);
    this.updated_at = updated_at ? new Date(updated_at) : this.created_at;
  }

  markRead() {
    this.is_read = true;
  }

  markUnread() {
    this.is_read = false;
  }

  isReminder() {
    return this.type === NotificationType.REMINDER;
  }

  isWarning() {
    return this.type === NotificationType.WARNING;
  }

  isInfo() {
    return this.type === NotificationType.INFO;
  }
}
