import './EmptyState.css'

// A small reusable component for "nothing to show" situations.
// TransactionList decides *what* text to show; this component just
// handles *how* it looks. That separation makes it reusable elsewhere.
function EmptyState({ title, message }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">◐</div>
      <h3 className="empty-title">{title}</h3>
      <p className="empty-message">{message}</p>
    </div>
  )
}

export default EmptyState
