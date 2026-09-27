import { useState, useEffect, useMemo } from 'react'
import Header from './components/Header.jsx'
import SummaryCards from './components/SummaryCards.jsx'
import TransactionForm from './components/TransactionForm.jsx'
import TransactionList from './components/TransactionList.jsx'
import FilterBar from './components/FilterBar.jsx'
import './App.css'

const STORAGE_KEY = 'spendwise-transactions'

function App() {
  // ----- Core transactions state (the "single source of truth") -----
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })

  // ----- Filter / search / sort state -----
  const [typeFilter, setTypeFilter] = useState('all') // all | income | expense
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('newest') // newest | oldest | highest | lowest

  // Save to localStorage every time transactions change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  }, [transactions])

  // ----- Add a new transaction -----
  const addTransaction = (newTransaction) => {
    const transactionWithId = {
      ...newTransaction,
      id: crypto.randomUUID(),
    }
    setTransactions((prev) => [...prev, transactionWithId])
  }

  // ----- Delete a transaction by id -----
  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  // ----- Derived totals (recalculated whenever transactions change) -----
  const totalIncome = useMemo(
    () =>
      transactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  )

  const totalExpenses = useMemo(
    () =>
      transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  )

  const balance = totalIncome - totalExpenses
  const expenseCount = transactions.filter((t) => t.type === 'expense').length

  // All categories currently in use, for the filter dropdown
  const allCategories = useMemo(() => {
    const categories = new Set(transactions.map((t) => t.category))
    return Array.from(categories).sort()
  }, [transactions])

  // ----- Filtering + searching + sorting pipeline -----
  const filteredTransactions = useMemo(() => {
    let result = [...transactions]

    if (typeFilter !== 'all') {
      result = result.filter((t) => t.type === typeFilter)
    }

    if (categoryFilter !== 'all') {
      result = result.filter((t) => t.category === categoryFilter)
    }

    if (searchTerm.trim() !== '') {
      const term = searchTerm.trim().toLowerCase()
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(term) ||
          t.category.toLowerCase().includes(term)
      )
    }

    switch (sortOrder) {
      case 'newest':
        result.sort((a, b) => new Date(b.date) - new Date(a.date))
        break
      case 'oldest':
        result.sort((a, b) => new Date(a.date) - new Date(b.date))
        break
      case 'highest':
        result.sort((a, b) => b.amount - a.amount)
        break
      case 'lowest':
        result.sort((a, b) => a.amount - b.amount)
        break
      default:
        break
    }

    return result
  }, [transactions, typeFilter, categoryFilter, searchTerm, sortOrder])

  return (
    <div className="app">
      <Header />

      <main className="app-main">
        <SummaryCards
          income={totalIncome}
          expenses={totalExpenses}
          balance={balance}
          transactionCount={transactions.length}
          expenseCount={expenseCount}
        />

        <div className="app-grid">
          <section className="app-grid-form">
            <TransactionForm onAddTransaction={addTransaction} />
          </section>

          <section className="app-grid-list">
            <FilterBar
              typeFilter={typeFilter}
              onTypeFilterChange={setTypeFilter}
              categoryFilter={categoryFilter}
              onCategoryFilterChange={setCategoryFilter}
              categories={allCategories}
              searchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
              sortOrder={sortOrder}
              onSortOrderChange={setSortOrder}
            />

            <TransactionList
              transactions={filteredTransactions}
              onDelete={deleteTransaction}
              hasAnyTransactions={transactions.length > 0}
            />
          </section>
        </div>
      </main>
    </div>
  )
}

export default App
