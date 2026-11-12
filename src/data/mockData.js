export const movies = [
  { id: 'scene', title: 'SCENE', genre: 'Action · Thriller', duration: '2h 18m', rating: 'U/A 16+', accent: 'from-rose-950 via-red-900 to-zinc-950', tag: 'NOW SHOWING' },
  { id: 'orbit', title: 'ORBITAL', genre: 'Sci-fi · Adventure', duration: '2h 04m', rating: 'U/A 13+', accent: 'from-indigo-950 via-blue-900 to-zinc-950', tag: 'NEW RELEASE' },
  { id: 'lastlight', title: 'LAST LIGHT', genre: 'Drama · Mystery', duration: '1h 56m', rating: 'U/A 16+', accent: 'from-amber-950 via-orange-900 to-zinc-950', tag: 'CRITICS PICK' }
]
export const showtimes = [
  { id: '1730', time: '17:30', type: '2D' },
  { id: '1945', time: '19:45', type: 'IMAX' },
  { id: '2215', time: '22:15', type: '2D' }
]
export const ROWS = ['A','B','C','D','E','F','G','H','I']
export const COLS = 14
export const seatId = (row, col) => `${row}${col}`
const taken = new Set(['A2','A3','A10','B5','B6','B12','C1','C8','C9','D4','D11','E2','E7','E13','F3','F11','G5','G10','H2','H7','I4','I9'])
export const initialSeats = ROWS.flatMap((row, ri) =>
  Array.from({ length: COLS }, (_, i) => {
    const col = i + 1
    const id = seatId(row, col)
    return { id, row, col, kind: ri >= 7 ? 'recliner' : 'standard', status: taken.has(id) ? 'taken' : 'available' }
  })
)
