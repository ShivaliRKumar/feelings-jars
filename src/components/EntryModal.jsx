import { useState } from 'react'
import { SIZES, TAGS, JAR_PLACEHOLDER, JAR_LABEL } from '../tokens.js'
import { todayStr, newId, tagColor } from '../utils.js'

export default function EntryModal({ jarKey, personLabel, existing, onSave, onDelete, onClose }) {
  const [date, setDate] = useState(existing?.date ?? todayStr())
  const [description, setDescription] = useState(existing?.description ?? '')
  const [size, setSize] = useState(existing?.size ?? 'medium')
  const [tag, setTag] = useState(existing?.tag ?? '')
  const [errors, setErrors] = useState({})

  function handleSubmit(e) {
    e.preventDefault()
    const errs = {}
    if (!description.trim()) errs.description = 'Description is required.'
    if (!tag) errs.tag = 'Pick a tag.'
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    onSave({
      id: existing?.id ?? newId(),
      date,
      description: description.trim(),
      size,
      tag,
    })
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <i className="ti ti-x" aria-hidden="true">×</i>
        </button>
        <p className="modal-title">
          {existing ? 'Edit' : 'A'} {jarKey === 'happy' ? 'happy' : 'hurtful'} moment for {personLabel}
        </p>
        <p className="modal-subtitle">
          {jarKey === 'happy' ? 'What made things good?' : 'What happened?'}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="date">When</label>
            <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="desc">What happened</label>
            <textarea
              id="desc"
              rows={3}
              placeholder={JAR_PLACEHOLDER[jarKey]}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <p className="error-text">{errors.description}</p>}
          </div>
          <div className="field">
            <label>How big a feeling</label>
            <div className="size-options">
              {SIZES.map((s) => (
                <button
                  type="button"
                  key={s.key}
                  className={`size-option ${size === s.key ? 'selected' : ''}`}
                  onClick={() => setSize(s.key)}
                >
                  <span className="size-dot" style={{ width: s.dot, height: s.dot }} />
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <div className="field">
            <label>Tag *</label>
            <div className="tag-row">
              {TAGS.map((t) => (
                <button
                  type="button"
                  key={t}
                  className={`tag-pill ${tag === t ? 'selected' : ''}`}
                  style={tag === t ? { background: tagColor(t) } : undefined}
                  onClick={() => setTag(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            {errors.tag && <p className="error-text">{errors.tag}</p>}
          </div>
          <div className="modal-actions">
            {existing && (
              <button type="button" className="link-btn spacer-left" onClick={() => onDelete(existing.id)}>
                Delete
              </button>
            )}
            <button type="button" className="pill-btn white" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="pill-btn tan">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
