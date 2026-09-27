import './Header.css'

// Simple presentational component — receives no props.
// It exists purely to keep the page title/branding out of App.jsx.
function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-mark">SW</div>
        <div>
          <h1 className="header-title">SpendWise</h1>
          <p className="header-subtitle">Track your money. Understand your spending.</p>
        </div>
      </div>
    </header>
  )
}

export default Header
