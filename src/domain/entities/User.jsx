import { Subscription } from "../enums/Subscription.jsx";

export default class User {
  constructor({ id, auth0_id, name, email, subscription, created_at, updated_at }) {
    this.id = id;
    this.auth0_id = auth0_id;
    this.name = name;
    this.email = email;
    this.subscription = subscription;
    this.created_at = new Date(created_at);
    this.updated_at = updated_at ? new Date(updated_at) : this.created_at;
  }

  isPremium() {
    return this.subscription === Subscription.PREMIUM;
  }

  upgrade() {
    this.subscription = SUBSCRIPTION.PREMIUM;
  }
}
