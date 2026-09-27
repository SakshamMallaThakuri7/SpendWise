# SpendWise – Personal Expense Tracker

## Project Description
SpendWise is a single-page React app for logging income and expenses and seeing where your money goes. It shows a running balance, lets you filter and sort your transaction history, and keeps everything saved in the browser so your data survives a refresh.

## Features
- Add income or expense transactions with amount, category, description, and date
- Live summary dashboard: total income, total expenses, current balance, and entry counts
- Delete any transaction, with totals updating instantly
- Filter by type (income/expense) and by category
- Search transactions by description or category
- Sort by newest, oldest, highest amount, or lowest amount
- Data persisted in `localStorage`, so it survives a page refresh
- Friendly empty states when there are no transactions yet, or when a filter/search matches nothing
- Responsive layout for desktop, tablet, and mobile

## Technologies Used
- React (functional components + hooks)
- JavaScript (ES6+)
- CSS (custom, with media queries — no UI framework)
- Vite
- Browser `localStorage`

## Installation

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build a production version:

```bash
npm run build
npm run preview
```

## Project Structure

```
spendwise/
├── src/
│   ├── components/
│   │   ├── Header.jsx / Header.css              # App title and tagline
│   │   ├── SummaryCards.jsx / SummaryCards.css   # Income / expenses / balance cards
│   │   ├── TransactionForm.jsx / .css            # Controlled form to add a transaction
│   │   ├── FilterBar.jsx / .css                  # Search, type filter, category filter, sort
│   │   ├── TransactionList.jsx / .css            # Maps over transactions, shows EmptyState if none
│   │   ├── TransactionItem.jsx / .css            # A single transaction row
│   │   └── EmptyState.jsx / .css                 # Reusable "nothing to show" message
│   ├── App.jsx        # Owns all state: transactions, filters, sort order
│   ├── App.css         # Page layout (grid, responsive breakpoints)
│   ├── main.jsx        # React entry point
│   └── index.css       # Design tokens (colors, fonts) and base styles
├── index.html
├── package.json
└── vite.config.js
```

## React Concepts Demonstrated

- **Components** – The UI is broken into 7 focused components instead of one large file.
- **Props** – `App.jsx` owns the `transactions` state and passes data *and* callback functions (like `onAddTransaction`, `onDelete`) down to children. Children never modify state directly; they call the function they were given.
- **useState** – Used for the transactions list, the "add transaction" form fields, and all filter/search/sort controls.
- **useEffect** – Saves `transactions` to `localStorage` every time the array changes.
- **useMemo** – Used for derived values (totals, filtered/sorted list) so they only recalculate when their inputs change.
- **Event handling** – `onChange`, `onClick`, and `onSubmit` handlers throughout the form and filter bar.
- **Controlled forms** – Every input's value comes from React state, and every keystroke updates that state via `onChange`.
- **Conditional rendering** – The empty state, the error message in the form, and the balance card's color all change based on state.
- **List rendering** – `transactions.map()` renders `TransactionItem` components, each with a unique `key` (the transaction's generated `id`, not its array index).
- **localStorage** – Transactions are read from `localStorage` when the app first loads (inside `useState`'s initializer) and written back on every change (inside `useEffect`).

## Data Flow

```
User fills out the form
  → TransactionForm validates input
  → calls onAddTransaction() (passed down as a prop)
  → App.jsx updates the transactions state
  → useEffect saves the new array to localStorage
  → SummaryCards and TransactionList re-render with the new data
```

## Screenshots

![Dashboard](screenshots/dashboard.png)

![Add Transaction](screenshots/add-transaction.png)

![Transaction List](screenshots/transactions.png)

*(Add your own screenshots to a `screenshots/` folder before submitting.)*

## Known Limitations
This is a frontend-only educational project. There is no backend, no user accounts/authentication, and no real bank or payment integration — all data lives in the browser's `localStorage` on the device it was entered on.
