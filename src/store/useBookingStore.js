import { create } from 'zustand'
import { initialSeats } from '../data/mockData'

export const useBookingStore = create((set, get) => ({
  seats: initialSeats,
  selected: ['F8'],
  activeShowtime: '1945',
  screen: 'home',
  movie: 'scene',
  setScreen: screen => set({ screen }),
  setMovie: movie => set({ movie }),
  setShowtime: activeShowtime => set({ activeShowtime }),
  toggleSeat: id => set(state => {
    const seat = state.seats.find(s => s.id === id)
    if (!seat || seat.status === 'taken') return {}
    const selected = state.selected.includes(id)
      ? state.selected.filter(x => x !== id)
      : state.selected.length < 6 ? [...state.selected, id] : state.selected
    return { selected }
  }),
  setSelectedSeat: id => set({ selected: [id] }),
  clearSelection: () => set({ selected: [] }),
  total: () => get().selected.reduce((sum, id) => {
    const seat = get().seats.find(s => s.id === id)
    return sum + (seat?.kind === 'recliner' ? 650 : 280)
  }, 0)
}))
