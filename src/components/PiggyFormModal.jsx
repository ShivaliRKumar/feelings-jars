import { useState } from 'react'
import { todayStr, newId, currencySymbol, toStorage } from '../utils.js'

export default function PiggyFormModal({ mode, currency, onSave, onClose }) {
  const [date, setDate] = useState(todayStr())
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const num = Number(amount)
    if (!amount || isNaN(num) || num <= 0) {
      setError('Enter an amount greater than 0.')
      return
    }
    const signed = mode === 'remove' ? -num : num
    onSave({
      id: newId(),
      date,
      amount: toStorage(signed, currency),
      note: note.trim(),
    })
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <p className="modal-title">{mode === 'add' ? 'Add to' : 'Remove from'} the piggy bank</p>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="pdate">Date</label>
            <input id="pdate" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="pamount">Amount ({currencySymbol(currency)})</label>
            <input
              id="pamount"
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {error && <p className="error-text">{error}</p>}
          </div>
          <div className="field">
            <label htmlFor="pnote">Note</label>
            <input
              id="pnote"
              type="text"
              placeholder="What's this for?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="pill-btn white" onClick={onClose}>Cancel</button>
            <button type="submit" className="pill-btn tan">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}
