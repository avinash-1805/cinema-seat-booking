export function seatMetrics(id) {
  const row = id?.[0] || 'F'
  const col = Number(id?.slice(1) || 8)
  const rowIndex = row.charCodeAt(0)-65
  const distance = 17.5 - rowIndex * 1.25
  const offset = (col - 7.5) * 0.62
  const fov = 2 * Math.atan(8.8 / (2 * Math.max(distance, 5))) * 180 / Math.PI
  // Camera position moves to the selected row/column, just above seated eye height.
  const camera = [offset * .62, 1.65 + rowIndex * .12, 6.4 - rowIndex * .85]
  return { distance: Math.max(7.5,distance), offset, fov: Math.min(110,Math.max(35,fov)), camera }
}
export const seatType = id => id?.[0] >= 'H' ? 'Recliner' : 'Standard'
export const seatPrice = id => seatType(id)==='Recliner' ? 650 : 280
export const viewLabel = id => {
  const row = id?.[0] || 'F'
  if (row <= 'C') return 'UP CLOSE'
  if (row <= 'G') return 'SWEET SPOT'
  return 'FULL PICTURE'
}
