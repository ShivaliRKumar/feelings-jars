import { currencySymbol, toDisplay, formatDateLong } from '../utils.js'

export default function PiggyHistoryModal({ history, currency, onDelete, onClose }) {
  const sorted = [...history].sort((a, b) => (a.date < b.date ? 1 : -1))
  const symbol = currencySymbol(currency)

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <p className="modal-title">Piggy bank history</p>

        {sorted.length === 0 && <p className="empty-note">Nothing logged yet.</p>}

        {sorted.map((h) => {
          const displayAmt = toDisplay(h.amount, currency)
          const positive = displayAmt >= 0
          return (
            <div key={h.id} className="history-row">
              <div>
                <div>{formatDateLong(h.date)}</div>
                {h.note && <div style={{ color: 'var(--muted)', fontSize: 12 }}>{h.note}</div>}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className={`history-amount ${positive ? 'positive' : 'negative'}`}>
                  {positive ? '+' : '−'}{symbol}{Math.abs(Math.round(displayAmt)).toLocaleString()}
                </span>
                <button className="link-btn" onClick={() => onDelete(h.id)}>Delete</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
