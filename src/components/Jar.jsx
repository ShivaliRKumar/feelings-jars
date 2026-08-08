import { BALL_DIAMETER, JAR_LABEL, JAR_EMPTY } from '../tokens.js'
import { ballColorFor, ballRotationFor, ballJitterFor, oklch } from '../utils.js'

const SIZE_ORDER = { big: 0, medium: 1, little: 2 }

export default function Jar({ jarKey, entries, palette, accent, tilt, onAdd, onView }) {
  const palColors = jarKey === 'happy' ? palette.happyBalls : palette.hurtfulBalls
  const sorted = [...entries].sort((a, b) => SIZE_ORDER[a.size] - SIZE_ORDER[b.size])

  return (
    <div className={`jar-wrap ${tilt === 'neg' ? 'jar-tilt-neg' : 'jar-tilt-pos'}`}>
      <div className="jar-lid" style={{ background: oklch(accent) }} />
      <div className="jar-neck" />
      <div className="jar-body">
        <div className="jar-shine" />
        <div className="jar-label-pin" />
        <div className="jar-label" style={{ background: oklch(accent) }}>
          {JAR_LABEL[jarKey]} ({entries.length})
        </div>
        <div className="jar-balls">
          {sorted.length === 0 && <p className="jar-empty">{JAR_EMPTY[jarKey]}</p>}
          {sorted.map((entry) => {
            const d = BALL_DIAMETER[entry.size]
            return (
              <div
                key={entry.id}
                className="ball"
                title={`${entry.description} — ${entry.date}`}
                style={{
                  width: d,
                  height: d,
                  background: ballColorFor(entry.id, palColors, entry.size),
                  transform: `rotate(${ballRotationFor(entry.id)}deg) translateY(-${ballJitterFor(entry.id)}px)`,
                }}
              />
            )
          })}
        </div>
      </div>
      <button className="pill-btn jar-add-btn" onClick={onAdd}>
        + Add {jarKey === 'happy' ? 'happy' : 'hurtful'} moment
      </button>
    </div>
  )
}
