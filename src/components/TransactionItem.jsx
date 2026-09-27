import './TransactionItem.css'

function formatCurrency(value) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

function formatDate(isoDate) {
  return new Date(isoDate + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// Renders exactly one transaction row. It receives the transaction object
// and the onDelete callback as props — it never touches App.jsx's state
// directly, it just calls the function it was given.
function TransactionItem({ transaction, onDelete }) {
  const isIncome = transaction.type === 'income'

  return (
    <div className="transaction-item">
      <div className="cell cell-description" data-label="Description">
        <span
          className={`type-dot ${isIncome ? 'dot-income' : 'dot-expense'}`}
          aria-hidden="true"
        ></span>
        {transaction.description}
      </div>

      <div className="cell" data-label="Category">
        <span className="category-pill">{transaction.category}</span>
      </div>

      <div className="cell cell-date" data-label="Date">
        {formatDate(transaction.date)}
      </div>

      <div className={`cell cell-amount align-right ${isIncome ? 'income-text' : 'expense-text'}`} data-label="Amount">
        {isIncome ? '+' : '-'}
        {formatCurrency(transaction.amount)}
      </div>

      <div className="cell align-right">
        <button
          type="button"
          className="delete-btn"
          onClick={() => onDelete(transaction.id)}
          aria-label={`Delete ${transaction.description}`}
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default TransactionItem
