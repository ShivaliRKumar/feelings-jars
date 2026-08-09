import { useState } from 'react'
import { TAGS, SIZES } from '../tokens.js'
import { formatDateLong, tagColor } from '../utils.js'

export default function ViewEntriesModal({ jarKey, entries, accentColor, onEdit, onDelete, onClose }) {
  const [filter, setFilter] = useState('All')
  const [sizeFilter, setSizeFilter] = useState('All')

  const sorted = [...entries].sort((a, b) => (a.date < b.date ? 1 : -1))
  const visible = sorted
    .filter((e) => filter === 'All' || e.tag === filter)
    .filter((e) => sizeFilter === 'All' || e.size === sizeFilter)

  const counts = { little: 0, medium: 0, big: 0 }
  visible.forEach((e) => { counts[e.size] = (counts[e.size] || 0) + 1 })

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <p className="modal-title">{jarKey === 'happy' ? 'Happy' : 'Hurtful'} entries</p>
        {visible.length > 0 && (
          <p className="modal-subtitle" style={{ marginBottom: 14 }}>
            {counts.little} little · {counts.medium} medium · {counts.big} big
          </p>
        )}

        <div className="filter-row">
          <button
            className={`tag-pill filter-all ${filter === 'All' ? 'active' : ''}`}
            onClick={() => setFilter('All')}
          >
            All
          </button>
          {TAGS.map((t) => (
            <button
              key={t}
              className={`tag-pill ${filter === t ? 'selected' : ''}`}
              style={filter === t ? { background: tagColor(t) } : undefined}
              onClick={() => setFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="filter-row">
          <button
            className={`tag-pill filter-all ${sizeFilter === 'All' ? 'active' : ''}`}
            onClick={() => setSizeFilter('All')}
          >
            All sizes
          </button>
          {SIZES.map((s) => (
            <button
              key={s.key}
              className={`tag-pill ${sizeFilter === s.key ? 'selected' : ''}`}
              onClick={() => setSizeFilter(s.key)}
            >
              {s.label}
            </button>
          ))}
        </div>

        {visible.length === 0 && <p className="empty-note">Nothing logged yet.</p>}

        {visible.map((entry) => (
          <div key={entry.id} className="entry-row">
            <span className="entry-dot" style={{ background: accentColor }} />
            <div className="entry-main">
              <div className="entry-meta">
                <span>{formatDateLong(entry.date)}</span>
                <span className="chip" style={{ background: tagColor(entry.tag) }}>{entry.tag}</span>
                <span>{entry.size}</span>
              </div>
              <p className="entry-desc">{entry.description}</p>
            </div>
            <div className="entry-actions">
              <button className="link-btn" onClick={() => onEdit(entry)}>Edit</button>
              <button className="link-btn" onClick={() => onDelete(entry.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
