import { motion } from 'framer-motion'
import { Check, Ticket } from 'lucide-react'
import { seatPrice, seatType } from '../utils/seatMath'
export default function BookingSuccess({ seats, onHome, onPay }) {
  const first=seats[0] || 'I12'
  return <motion.div className="success-screen" initial={{opacity:0}} animate={{opacity:1}}>
    <motion.div className="success-card" initial={{scale:.85,y:25}} animate={{scale:1,y:0}} transition={{type:'spring',stiffness:180,damping:16}}>
      <motion.div className="success-check" initial={{scale:0,rotate:-30}} animate={{scale:1,rotate:0}} transition={{delay:.2,type:'spring'}}><Check size={38} strokeWidth={3}/></motion.div>
      <span className="success-kicker">PVR LULU MALL</span><h1>Seat booked</h1>
      <p>{seats.join(', ')} · {seats.length===1?seatType(first):`${seats.length} seats`} · ₹{seats.reduce((s,id)=>s+seatPrice(id),0)}</p>
      <div className="ticket-line"><Ticket size={17}/> Your seats are reserved for 10 minutes.</div>
      <button className="mint-button full" onClick={onPay}>Pay now</button>
      <button className="text-button" onClick={onHome}>Back to home</button>
    </motion.div>
  </motion.div>
}
