import { motion, useMotionValue, useTransform } from 'framer-motion'
import { seatMetrics, seatPrice, seatType, viewLabel } from '../utils/seatMath'
import { ROWS, COLS } from '../data/mockData'

function MiniMap({ seatId, onSelect }) {
  return <div className="mini-map" aria-label="Mini seat map">
    {ROWS.map(row=><div className="mini-row" key={row}>{Array.from({length:COLS},(_,i)=>{
      const id=`${row}${i+1}`
      return <button key={id} aria-label={`Preview ${id}`} className={id===seatId?'mini-selected':row>='H'?'mini-recliner':'mini-seat'} onClick={()=>onSelect(id)}/>
    })}</div>)}
  </div>
}
export default function BottomSheet({ seatId, onChange, onPick, onBook }) {
  const y=useMotionValue(0)
  const opacity=useTransform(y,[0,120],[1,.85])
  const m=seatMetrics(seatId)
  return <motion.section className="bottom-sheet" drag="y" dragConstraints={{top:0,bottom:90}} style={{y,opacity}} dragElastic={.08}>
    <div className="sheet-handle"/>
    <div className="sheet-top">
      <div><span className="view-label">{viewLabel(seatId)}</span><h2>Row {seatId[0]}, Seat {seatId.slice(1)}</h2><p>{seatType(seatId)} · ₹{seatPrice(seatId)}</p></div>
      <MiniMap seatId={seatId} onSelect={onPick}/>
    </div>
    <div className="stats">
      <div><strong>{m.distance.toFixed(1)}<small>m</small></strong><span>SCREEN DISTANCE</span></div>
      <div><strong>{m.fov.toFixed(0)}<small>°</small></strong><span>FIELD OF VIEW</span></div>
      <div><strong>{Math.abs(m.offset).toFixed(1)}<small>m</small></strong><span>{m.offset<0?'LEFT':'RIGHT'} OFFSET</span></div>
    </div>
    <div className="sheet-actions"><button className="outline-button" onClick={()=>onChange()}>Change seat</button><button className="book-button" onClick={onBook}>Book · ₹{seatPrice(seatId)}</button></div>
    <p className="drag-note">Drag to adjust · Swipe the scene to look around</p>
  </motion.section>
}