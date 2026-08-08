// All values transcribed from the Claude Design handoff README.
// oklch entries are { l, c, h } — l in percent, c chroma, h hue degrees.

export const INK = '#3d2c22'
export const MUTED = '#8a7362'
export const MUTED_2 = '#b08a63'
export const ACCENT_ACTION = '#c0512f'
export const ACCENT_ACTION_HOVER = '#8f3a1f'
export const CARD_BG = '#fffaf2'
export const PAGE_BG = '#fbf1e6'
export const INPUT_BORDER = '#dccab6'

export const PEOPLE = {
  shivali: {
    label: 'Shivali',
    happyBalls: [
      { l: 82, c: 0.12, h: 25 },
      { l: 76, c: 0.16, h: 18 },
      { l: 85, c: 0.09, h: 48 },
      { l: 70, c: 0.17, h: 8 },
    ],
    happyAccent: { l: 78, c: 0.13, h: 22 },
    hurtfulBalls: [
      { l: 80, c: 0.045, h: 255 },
      { l: 76, c: 0.04, h: 290 },
      { l: 74, c: 0.03, h: 235 },
      { l: 68, c: 0.05, h: 270 },
    ],
    hurtfulAccent: { l: 78, c: 0.045, h: 260 },
    tabAccent: { l: 74, c: 0.15, h: 20 },
  },
  vrushab: {
    label: 'Vrushab',
    happyBalls: [
      { l: 76, c: 0.05, h: 165 },
      { l: 73, c: 0.045, h: 190 },
      { l: 79, c: 0.03, h: 150 },
      { l: 68, c: 0.05, h: 175 },
    ],
    happyAccent: { l: 75, c: 0.045, h: 170 },
    hurtfulBalls: [
      { l: 80, c: 0.13, h: 75 },
      { l: 75, c: 0.15, h: 65 },
      { l: 85, c: 0.10, h: 92 },
      { l: 70, c: 0.16, h: 55 },
    ],
    hurtfulAccent: { l: 76, c: 0.14, h: 68 },
    tabAccent: { l: 74, c: 0.14, h: 70 },
  },
}

export const TAGS = ['Us', 'Work', 'Family', 'Money']
export const TAG_HUES = { Us: 25, Work: 230, Family: 100, Money: 145 }

export const SIZES = [
  { key: 'little', label: 'Little', dot: 14 },
  { key: 'medium', label: 'Medium', dot: 20 },
  { key: 'big', label: 'Big', dot: 28 },
]
export const BALL_DIAMETER = { little: 32, medium: 46, big: 62 }

export const JAR_LABEL = { happy: 'Happy', hurtful: 'Hurtful' }
export const JAR_PLACEHOLDER = {
  happy: 'e.g. Made me laugh so hard at breakfast',
  hurtful: 'e.g. Left the dishes for me again',
}
export const JAR_EMPTY = {
  happy: 'Add your first happy moment',
  hurtful: 'Nothing here yet — good.',
}
