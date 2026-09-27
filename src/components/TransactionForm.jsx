import { useState } from 'react'
import './TransactionForm.css'

const CATEGORY_OPTIONS = {
  income: ['Salary', 'Freelance', 'Business', 'Other'],
  expense: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Education', 'Health', 'Other'],
}

// Returns today's date as "YYYY-MM-DD", which is what <input type="date"> expects
function getTodayISODate() {
  return new Date().toISOString().split('T')[0]
}

const EMPTY_FORM = {
  type: 'expense',
  amount: '',
  category: CATEGORY_OPTIONS.expense[0],
  description: '',
  date: getTodayISODate(),
}

// A fully "controlled" form: every input's value comes from state,
// and every change updates that state. Nothing is read from the DOM directly.
function TransactionForm({ onAddTransaction }) {
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [error, setError] = useState('')

  const categoryOptions = CATEGORY_OPTIONS[formData.type]

  const handleChange = (event) => {
    const { name, value } = event.target

    // Switching type resets the category to a valid option for that type
    if (name === 'type') {
      setFormData((prev) => ({
        ...prev,
        type: value,
        category: CATEGORY_OPTIONS[value][0],
      }))
      return
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const amountNumber = parseFloat(formData.amount)

    if (!formData.description.trim()) {
      setError('Please add a short description.')
      return
    }
    if (isNaN(amountNumber) || amountNumber <= 0) {
      setError('Amount must be a number greater than 0.')
      return
    }
    if (!formData.date) {
      setError('Please choose a date.')
      return
    }

    onAddTransaction({
      type: formData.type,
      amount: amountNumber,
      category: formData.category,
      description: formData.description.trim(),
      date: formData.date,
    })

    setError('')
    setFormData({ ...EMPTY_FORM, date: getTodayISODate() })
  }

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Add transaction</h2>

      <div className="form-toggle">
        <button
          type="button"
          className={`toggle-btn ${formData.type === 'income' ? 'active income' : ''}`}
          onClick={() => handleChange({ target: { name: 'type', value: 'income' } })}
        >
          Income
        </button>
        <button
          type="button"
          className={`toggle-btn ${formData.type === 'expense' ? 'active expense' : ''}`}
          onClick={() => handleChange({ target: { name: 'type', value: 'expense' } })}
        >
          Expense
        </button>
      </div>

      <label className="form-field">
        <span>Amount</span>
        <input
          type="number"
          name="amount"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={formData.amount}
          onChange={handleChange}
        />
      </label>

      <label className="form-field">
        <span>Category</span>
        <select name="category" value={formData.category} onChange={handleChange}>
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="form-field">
        <span>Description</span>
        <input
          type="text"
          name="description"
          placeholder="e.g. Groceries at the market"
          value={formData.description}
          onChange={handleChange}
        />
      </label>

      <label className="form-field">
        <span>Date</span>
        <input type="date" name="date" value={formData.date} onChange={handleChange} />
      </label>

      {/* Conditional rendering: the error box only appears if there's an error */}
      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="form-submit">
        Add {formData.type === 'income' ? 'income' : 'expense'}
      </button>
    </form>
  )
}

export default TransactionForm
