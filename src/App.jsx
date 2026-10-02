import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './App.css'
import Hero from './components/Hero'

const locations=[['WAYNE TOWER','Financial District','72%'],['ARKHAM','North Gotham','CRITICAL'],['CRIME ALLEY','Park Row','91%'],['ACE CHEMICALS','Industrial','WATCH']]
const tech=[['01','TACTICAL COWL','Encrypted optics / forensic scan'],['02','GRAPNEL SYSTEM','Rapid vertical traversal'],['03','BATMOBILE','Armored pursuit platform'],['04','REMOTE DRONE','Silent aerial reconnaissance']]
const rogues=[['JOKER','UNKNOWN','CHAOS','CRITICAL'],['RIDDLER','EDWARD NYGMA','OBSESSION','HIGH'],['CATWOMAN','SELINA KYLE','AMBIGUOUS','VARIABLE'],['PENGUIN','OSWALD COBBLEPOT','ORGANIZED CRIME','HIGH']]

function Boot({done}){return <motion.div className="boot" initial={{opacity:1}} animate={done?{opacity:0,pointerEvents:'none'}:{opacity:1}} transition={{duration:.65}}><div className="boot-mark">◢</div><div className="boot-copy"><span>WAYNE // TACTICAL OS</span><strong>BATCOMPUTER</strong><div className="boot-bar"><i/></div><small>AUTHENTICATING BIOMETRICS · GOTHAM NODE</small></div></motion.div>}

function App(){
 const [booted,setBooted]=useState(false); const [active,setActive]=useState(0)
 useEffect(()=>{const t=setTimeout(()=>setBooted(true),1800);return()=>clearTimeout(t)},[])
 return <main>
  <Boot done={booted}/><Hero />
  <section className="manifesto" id="mission"><span className="section-code">THE MISSION / 00</span><p>Not a symbol of fear <em>for Gotham.</em><br/>A symbol of fear <em>for those who prey on it.</em></p><div className="scanline"/></section>

  <section className="gotham section" id="gotham">
   <header className="section-head"><span className="section-code">CITY SURVEILLANCE / 01</span><h2>GOTHAM<br/><i>UNDER WATCH</i></h2><p>Four priority zones. One city that never really sleeps. Select a node to inspect the live tactical layer.</p></header>
   <div className="map-shell"><div className="map-grid"/><div className="map-river"/>{locations.map((x,i)=><button key={x[0]} className={`hotspot h${i} ${active===i?'active':''}`} onClick={()=>setActive(i)} aria-label={`Inspect ${x[0]}`}><b>{String(i+1).padStart(2,'0')}</b><span>{x[0]}</span></button>)}<div className="target-ring"/></div>
   <aside className="intel"><span>ACTIVE NODE / {String(active+1).padStart(2,'0')}</span><h3>{locations[active][0]}</h3><p>{locations[active][1]}</p><dl><div><dt>SURVEILLANCE</dt><dd>ONLINE</dd></div><div><dt>THREAT INDEX</dt><dd>{locations[active][2]}</dd></div><div><dt>UNIT STATUS</dt><dd>STANDBY</dd></div></dl><button>OPEN INTEL FILE ↗</button></aside>
  </section>

  <section className="cave section" id="bruce"><div className="cave-glow"/><header className="section-head"><span className="section-code">THE CAVE / 02</span><h2>BUILT FOR<br/><i>THE MISSION</i></h2><p>Preparation is the advantage. Every system exists to make one human decision faster, quieter and more precise.</p></header><div className="tech-list">{tech.map((x)=><article key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p><b>+</b></article>)}</div></section>

  <section className="identity section"><div className="identity-number">02</div><div><span className="section-code">BRUCE WAYNE / IDENTITY</span><h2>THE MASK<br/>ISN'T THE<br/><i>DISGUISE.</i></h2></div><blockquote>“Everything impossible is simply waiting for someone willing to prepare for it.”</blockquote></section>

  <section className="rogues section" id="rogues"><header className="section-head"><span className="section-code">GCPD // BATCOMPUTER / 03</span><h2>ROGUES<br/><i>DATABASE</i></h2></header><div className="rogue-table"><div className="table-head"><span>SUBJECT</span><span>IDENTITY</span><span>PROFILE</span><span>THREAT</span></div>{rogues.map((r,i)=><article key={r[0]}><b>0{i+1}</b><h3>{r[0]}</h3><span>{r[1]}</span><span>{r[2]}</span><strong className={r[3]==='CRITICAL'?'critical':''}>{r[3]}</strong></article>)}</div></section>

  <section className="signal"><div className="beam"/><div className="signal-mark">◢</div><div className="signal-copy"><span className="section-code">GOTHAM / 04:17 AM</span><h2>WHEN THE<br/>SIGNAL RISES...</h2><p>...the night answers.</p><a href="#top">RETURN TO THE ROOFTOP ↑</a></div></section>
  <footer><span>THE DARK KNIGHT</span><small>WAYNE SYSTEMS // SESSION ENCRYPTED</small></footer>
 </main>
}
export default App
