import TransactionItem from './TransactionItem.jsx'
import EmptyState from './EmptyState.jsx'
import './TransactionList.css'

// Receives the already-filtered list from App.jsx and just renders it.
// hasAnyTransactions tells us whether the list is empty because the user
// has no data yet, or because the current filters matched nothing.
function TransactionList({ transactions, onDelete, hasAnyTransactions }) {
  if (transactions.length === 0) {
    return (
      <EmptyState
        title={hasAnyTransactions ? 'No matching transactions' : 'No transactions yet'}
        message={
          hasAnyTransactions
            ? 'Try clearing the search box or switching the filters back to "All".'
            : 'Add your first income or expense using the form to get started.'
        }
      />
    )
  }

  return (
    <div className="transaction-list">
      <div className="transaction-list-header">
        <span>Description</span>
        <span>Category</span>
        <span>Date</span>
        <span className="align-right">Amount</span>
        <span className="align-right">&nbsp;</span>
      </div>

      {/* List rendering with .map() — each item needs a stable, unique key.
          We use the transaction's generated id rather than the array index. */}
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default TransactionList
