import './FilterBar.css'

// A "controlled" set of filter inputs. FilterBar holds no state itself —
// every value and every change handler is passed down from App.jsx.
// This keeps the filtered results and the list in sync automatically.
function FilterBar({
  typeFilter,
  onTypeFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  categories,
  searchTerm,
  onSearchTermChange,
  sortOrder,
  onSortOrderChange,
}) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        className="filter-search"
        placeholder="Search description or category..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
      />

      <select value={typeFilter} onChange={(e) => onTypeFilterChange(e.target.value)}>
        <option value="all">All types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select value={categoryFilter} onChange={(e) => onCategoryFilterChange(e.target.value)}>
        <option value="all">All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select value={sortOrder} onChange={(e) => onSortOrderChange(e.target.value)}>
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="highest">Highest amount</option>
        <option value="lowest">Lowest amount</option>
      </select>
    </div>
  )
}

export default FilterBar
