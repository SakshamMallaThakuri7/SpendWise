import './SummaryCards.css'

// Formats a number as currency, e.g. 1234.5 -> "$1,234.50"
function formatCurrency(value) {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

// Receives all its numbers as props from App.jsx — it holds no state
// of its own. This is a good example of "parent owns the data, child
// just displays it".
function SummaryCards({ income, expenses, balance, transactionCount, expenseCount }) {
  const isPositive = balance >= 0

  return (
    <div className="summary-grid">
      <div className="summary-card">
        <span className="summary-label">Total income</span>
        <span className="summary-value income-text">{formatCurrency(income)}</span>
        <span className="summary-meta">{transactionCount - expenseCount} entries</span>
      </div>

      <div className="summary-card">
        <span className="summary-label">Total expenses</span>
        <span className="summary-value expense-text">{formatCurrency(expenses)}</span>
        <span className="summary-meta">{expenseCount} entries</span>
      </div>

      {/* Conditional rendering: the balance card's color/label changes
          depending on whether the balance is positive or negative. */}
      <div className={`summary-card balance-card ${isPositive ? 'is-positive' : 'is-negative'}`}>
        <span className="summary-label">Current balance</span>
        <span className="summary-value">{formatCurrency(balance)}</span>
        <span className="summary-meta">
          {isPositive ? 'You are in the green' : 'You are spending more than you earn'}
        </span>
      </div>
    </div>
  )
}

export default SummaryCards
