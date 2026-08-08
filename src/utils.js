// Simple deterministic string hash (djb2), used so a given entry id
// always produces the same color/rotation/jitter — no randomness on re-render.
export function hashStr(str) {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i)
  }
  return Math.abs(hash)
}

export function oklch({ l, c, h }) {
  return `oklch(${l}% ${c} ${h})`
}

// Apply the size-based lightness/chroma adjustment described in the
// design tokens, clamped to 40-94% lightness.
export function adjustForSize(base, size) {
  let { l, c, h } = base
  if (size === 'little') {
    l = l + 8
    c = c * 0.72
  } else if (size === 'big') {
    l = l - 15
    c = c * 1.25
  }
  l = Math.min(94, Math.max(40, l))
  return { l: Math.round(l), c: Number(c.toFixed(3)), h }
}

export function ballColorFor(entryId, palette, size) {
  const idx = hashStr(entryId) % palette.length
  const base = palette[idx]
  return oklch(adjustForSize(base, size))
}

export function ballRotationFor(entryId) {
  // -7deg to +7deg, deterministic
  return (hashStr(entryId + 'rot') % 15) - 7
}

export function ballJitterFor(entryId) {
  // 0px to 4px, deterministic
  return hashStr(entryId + 'jit') % 5
}

export function tagColor(tag) {
  const hueMap = { Us: 25, Work: 230, Family: 100, Money: 145 }
  const h = hueMap[tag] ?? hashStr(tag) % 360
  return `oklch(85% 0.08 ${h})`
}

export function formatDateLong(dateStr) {
  // dateStr = 'YYYY-MM-DD'
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function todayStr() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function newId() {
  return crypto.randomUUID()
}

// Piggy bank: amounts are always stored EUR-equivalent internally.
// INR display is a fixed illustrative rate (x100), not live FX.
export const INR_RATE = 100

export function toDisplay(amountEUR, currency) {
  return currency === 'INR' ? amountEUR * INR_RATE : amountEUR
}

export function toStorage(amountDisplay, currency) {
  return currency === 'INR' ? amountDisplay / INR_RATE : amountDisplay
}

export function currencySymbol(currency) {
  return currency === 'INR' ? '₹' : '€'
}
