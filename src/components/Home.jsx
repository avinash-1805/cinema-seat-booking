import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { movies } from '../data/mockData'
export default function Home({ onBook, movie, setMovie }) {
  const active=movies.find(m=>m.id===movie) || movies[0]
  return <motion.main className="home-screen" initial={{opacity:0}} animate={{opacity:1}}>
    <div className="home-top"><div className="brand-mark">SV<span>•</span></div><span className="location-pill">CHENNAI · PVR LULU MALL</span></div>
    <section className={`hero-poster bg-gradient-to-br ${active.accent}`}>
      <div className="poster-grain"/><span className="poster-tag">{active.tag}</span>
      <div className="poster-copy"><span>AN IMMERSIVE CINEMA EXPERIENCE</span><h2>{active.title}</h2><p>{active.genre} · {active.duration}</p><div className="rating">{active.rating}</div></div>
      <div className="poster-orb"/><div className="poster-play"><Play fill="currentColor" size={18}/></div>
    </section>
    <h1 className="home-heading">Best seat to watch<br/>in theatre.</h1>
    <p className="home-sub">Don't just book a seat. See the view before you choose.</p>
    <div className="movie-list">{movies.map(m=><button key={m.id} onClick={()=>setMovie(m.id)} className={`movie-option ${movie===m.id?'chosen':''}`}><span className={`movie-thumb bg-gradient-to-br ${m.accent}`}>{m.title.slice(0,1)}</span><span><b>{m.title}</b><small>{m.genre}</small></span><i>{movie===m.id?'●':'○'}</i></button>)}</div>
    <button className="home-book" onClick={onBook}>Book tickets <ArrowRight size={18}/></button>
    <p className="home-foot">A better view starts with your seat.</p>
  </motion.main>
}