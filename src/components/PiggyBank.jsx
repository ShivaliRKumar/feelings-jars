import { currencySymbol, toDisplay } from '../utils.js'

export default function PiggyBank({ totalEUR, currency, onToggleCurrency, onAdd, onRemove, onHistory }) {
  const displayAmount = toDisplay(totalEUR, currency)
  const symbol = currencySymbol(currency)

  return (
    <div className="piggy-card">
      <div className="washi-tape" />
      <div className="piggy-top">
       <div className="piggy-icon">
          <div className="piggy-ear left" />
          <div className="piggy-ear right" />
          <div className="piggy-body">
            <div className="piggy-slot" />
          </div>
          <div className="piggy-snout">
            <div className="piggy-nostril n1" />
            <div className="piggy-nostril n2" />
          </div>
          <div className="piggy-eye" />
          <div className="piggy-blush" />
          <div className="piggy-leg l1" />
          <div className="piggy-leg l2" />
        </div>
        <div>
          <p className="piggy-title">Piggy Bank</p>
          <p className="piggy-sub">· Apology Fund</p>
        </div>
      </div>

      <div className="piggy-total-row">
        <p className="piggy-total">
          {symbol}{Math.round(displayAmount).toLocaleString()}
        </p>
        <button className="pill-btn small white" onClick={onToggleCurrency}>
          show {currency === 'INR' ? '€' : '₹'}
        </button>
      </div>

      <div className="piggy-actions">
        <button className="pill-btn tan" onClick={onAdd}>+ Add</button>
        <button className="pill-btn blush" onClick={onRemove}>− Remove</button>
        <button className="pill-btn white" style={{ marginLeft: 'auto' }} onClick={onHistory}>History</button>
      </div>
    </div>
  )
}
