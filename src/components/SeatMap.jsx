import React from 'react'
import { motion } from 'framer-motion'
import { Info, ArrowLeft } from 'lucide-react'
import { ROWS, COLS } from '../data/mockData'
import { useBookingStore } from '../store/useBookingStore'

export default function SeatMap({ onPreview, onBack }) {
  const { seats, selected, toggleSeat, activeShowtime, setShowtime, total } = useBookingStore()
  const price = total()
  return <motion.main className="screen-page" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
    <header className="theatre-header">
      <button className="icon-button" aria-label="Back" onClick={onBack}><ArrowLeft size={19}/></button>
      <div className="text-center"><h1>PVR Lulu Mall</h1><p>Audi 3 · Sat 14 Nov</p></div>
      <button className="icon-button" aria-label="Theatre information"><Info size={18}/></button>
    </header>
    <div className="showtime-row">{['1730','1945','2215'].map((id, i) => {
      const t = [{time:'17:30',type:'2D'},{time:'19:45',type:'IMAX'},{time:'22:15',type:'2D'}][i]
      return <button key={id} onClick={() => setShowtime(id)} className={`showtime ${activeShowtime===id?'active':''}`}><b>{t.time}</b><small>{t.type}</small></button>
    })}</div>
    <div className="screen-arc-wrap"><div className="screen-arc"/><span>SCREEN</span></div>
    <section className="seat-layout" aria-label="Cinema seat map">
      {ROWS.map(row => <div className="seat-row" key={row}>
        <span className="row-label">{row}</span>
        <div className="seat-group">
          {Array.from({length:COLS},(_,i)=> {
            const col=i+1, id=`${row}${col}`, seat=seats.find(s=>s.id===id), isSelected=selected.includes(id)
            const gap = col===8
            return <React.Fragment key={id}>{gap && <span className="aisle"/>}
              <motion.button whileTap={{scale:.82}} aria-label={`Row ${row}, seat ${col}, ${seat.status}${seat.kind==='recliner'?', recliner':''}`} aria-pressed={isSelected} disabled={seat.status==='taken'}
                onClick={()=>toggleSeat(id)}
                className={`seat ${seat.status==='taken'?'taken':''} ${seat.kind==='recliner'?'recliner':''} ${isSelected?'selected':''}`}>
                {isSelected ? col : ''}
              </motion.button>
            </React.Fragment>
          })}
        </div>
      </div>)}
    </section>
    <div className="legend">
      <span><i className="dot available"/>Available</span><span><i className="dot taken-dot"/>Taken</span>
      <span><i className="dot recliner-dot"/>Recliner</span><span><i className="dot selected-dot"/>Selected</span>
    </div>
    <div className="map-hint">Select up to 6 seats · Tap a seat to preview your view</div>
    <div className="sticky-book">
      <div><strong>{selected.length ? selected.join(', ') : 'Choose seats'}</strong><small>{selected.length} {selected.length===1?'seat':'seats'} selected</small></div>
      <div className="price-action"><b>₹{price.toFixed(2)}</b><button className="mint-button" disabled={!selected.length} onClick={onPreview}>Continue</button></div>
    </div>
  </motion.main>
}