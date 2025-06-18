# 💰 Expenso – Frontend

Expenso is a personal finance tracker built with **React**, featuring **Auth0 authentication**, role-based access (Standard / Premium), and a smart dashboard for tracking income and expenses.

---

## 📦 Features

- ✅ Auth0 authentication
- 👤 User profile management
- 📊 Dashboard with graphs and summaries
- 💸 Track income and expenses
- 📁 Categorize transactions
- 🔔 Notification center
- ⭐ Upgrade to Premium (role-based)

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite
- **State:** Custom Context API
- **Auth:** Auth0 + JWT
- **Charts:** Recharts
- **Styling:** Bootstrap, CSS Modules
- **API:** Axios to Node.js/Express backend

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/expenso-frontend.git
cd expenso-frontend

### 2. Install dependencies

npm install

### Configure environment variables
## Create a .env file with the following keys:

# These must match your Auth0 tenant settings.
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_AUDIENCE=your-auth0-api-audience
VITE_ROLES_CLAIM=https://example.com/roles

# Chat bot api key
VITE_GEMINI_API_KEY=google_gemini_api

# backend key
VITE_API_URL=backend_api
```

## ▶️ Run the App

```bash
npm run dev
```

## Project Structure

```graphhql
src/
│
├── application/       # App state, constants, helpers
│   └── state/         # StoreContext (global state)
│
├── domain/            # Core business entities (User, Transaction, etc.)
│
├── infrastructure/    # API and service integrations
│
├── presentation/      # Pages & components
│   ├── components/    # Common and feature-specific UI
│   └── routes/        # Top-level page components
│
└── main.jsx           # App entry point
```

## 🔐 Auth0 Setup

- ✅ Register your frontend with Auth0
- 👤 Set Allowed Callback URLs
- 📊 Set Allowed Logout URLs to 
- 💸 Roles like Premium must be configured in the Auth0 dashboard and assigned using Management API.


## 🌟 Premium Role Upgrade

Standard users can upgrade by clicking the Upgrade to Premium button on the profile page. This calls:

```http
POST /api/users/upgrade
```

…and assigns the Premium role in Auth0 and updates the local DB.

## 📄 License

MIT - [Abdalrhman Attar]