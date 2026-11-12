import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, CircleDot } from 'lucide-react'
import Home from './components/Home'
import SeatMap from './components/SeatMap'
import SeatPreview3D from './components/SeatPreview3D'
import BottomSheet from './components/BottomSheet'
import BookingSuccess from './components/BookingSuccess'
import { useBookingStore } from './store/useBookingStore'
import { seatPrice } from './utils/seatMath'

export default function App() {
  const {screen,setScreen,selected,setSelectedSeat,movie,setMovie,total} = useBookingStore()
  const [previewSeat,setPreviewSeat] = useState('F8')
  const first=selected[0] || previewSeat
  const startPreview=()=>{setPreviewSeat(first);setScreen('preview')}
  const changeSeat=()=>setScreen('map')
  const book=()=>setScreen('success')
  return <div className="app-shell"><div className="phone-frame">
    <AnimatePresence mode="wait">
      {screen==='home' && <Home key="home" movie={movie} setMovie={setMovie} onBook={()=>setScreen('map')}/>}
      {screen==='map' && <SeatMap key="map" onPreview={startPreview} onBack={()=>setScreen('home')}/>}
      {screen==='preview' && <motion.div key="preview" className="preview-screen" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
        <SeatPreview3D seatId={previewSeat}/>
        <div className="preview-top"><button className="icon-button" onClick={changeSeat} aria-label="Back to seat map"><ArrowLeft/></button><span><CircleDot size={9} fill="#4ade80"/> View from {previewSeat}</span><div/></div>
        <BottomSheet seatId={previewSeat} onChange={()=>setScreen('map')} onPick={id=>setPreviewSeat(id)} onBook={book}/>
      </motion.div>}
      {screen==='success' && <BookingSuccess key="success" seats={selected.length?selected:[previewSeat]} onHome={()=>{setScreen('home')}} onPay={()=>alert('Demo only — connect a payment gateway to accept payments.')}/>}
    </AnimatePresence>
  </div></div>
}