import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import './App.css'
import Hero from './components/Hero'

const locations=[
 {name:'WAYNE TOWER',zone:'Financial District',threat:'72%',status:'MONITORED',detail:'Unusual encrypted traffic detected across upper executive floors. Wayne security handshake remains intact.'},
 {name:'ARKHAM',zone:'North Gotham',threat:'CRITICAL',status:'LOCKDOWN',detail:'Perimeter sensors report intermittent blind spots. GCPD tactical response is staged two blocks south.'},
 {name:'CRIME ALLEY',zone:'Park Row',threat:'91%',status:'ACTIVE',detail:'Three incidents in the last hour. Pattern suggests coordinated movement through old service tunnels.'},
 {name:'ACE CHEMICALS',zone:'Industrial',threat:'WATCH',status:'RESTRICTED',detail:'Thermal anomalies on the east processing wing. No scheduled maintenance is registered tonight.'},
 {name:'GCPD',zone:'Old Gotham',threat:'38%',status:'SECURE',detail:'Major Crimes has an open encrypted channel. Gordon beacon protocol is available if escalation is required.'},
 {name:'BATCAVE',zone:'CLASSIFIED',threat:'—',status:'STEALTH',detail:'Primary systems nominal. Vehicle bay, forensic lab and remote surveillance network are standing by.'}
]
const tech=[['01','TACTICAL COWL','Encrypted optics / forensic scan'],['02','GRAPNEL SYSTEM','Rapid vertical traversal'],['03','BATMOBILE','Armored pursuit platform'],['04','REMOTE DRONE','Silent aerial reconnaissance']]
const rogues=[
 {name:'JOKER',identity:'UNKNOWN',profile:'CHAOS',threat:'CRITICAL',case:'GCPD-0001',note:'Behavior remains intentionally non-patterned. Avoid predictive assumptions. Civilian risk escalates rapidly when spectacle becomes the objective.'},
 {name:'RIDDLER',identity:'EDWARD NYGMA',profile:'OBSESSION',threat:'HIGH',case:'GCPD-0187',note:'Compulsion for recognition creates exploitable timing windows. Treat every clue as both message and infrastructure attack vector.'},
 {name:'CATWOMAN',identity:'SELINA KYLE',profile:'AMBIGUOUS',threat:'VARIABLE',case:'GCPD-0322',note:'Highly mobile and selectively cooperative. Objectives are usually specific rather than indiscriminate. Do not confuse alignment with predictability.'},
 {name:'PENGUIN',identity:'OSWALD COBBLEPOT',profile:'ORGANIZED CRIME',threat:'HIGH',case:'GCPD-0419',note:'Leverages legitimate fronts, intermediaries and information markets. Financial tracing is more effective than street-level pressure.'}
]

function Boot({done}){return <motion.div className="boot" initial={{opacity:1}} animate={done?{opacity:0,pointerEvents:'none'}:{opacity:1}} transition={{duration:.65}}><div className="boot-mark">◢</div><div className="boot-copy"><span>WAYNE // TACTICAL OS</span><strong>BATCOMPUTER</strong><div className="boot-bar"><i/></div><small>AUTHENTICATING BIOMETRICS · GOTHAM NODE</small></div></motion.div>}

function TacticalNav({sound,setSound}){
 const [active,setActive]=useState('TOP')
 useEffect(()=>{const ids=['top','mission','gotham','bruce','rogues','signal'];const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)setActive(e.target.dataset.nav||e.target.id.toUpperCase())}),{rootMargin:'-40% 0px -50%'});ids.forEach(id=>{const el=document.getElementById(id);if(el)io.observe(el)});return()=>io.disconnect()},[])
 return <div className="tactical-nav"><span className="tactical-status"><i/> WAYNE OS // {active}</span><div className="tactical-actions"><button onClick={()=>setSound(!sound)} aria-pressed={sound}>SOUND: {sound?'ON':'OFF'}</button><a href="#gotham">CITY GRID</a></div></div>
}

function Reveal({children,className=''}){return <motion.div className={className} initial={{opacity:0,y:55}} whileInView={{opacity:1,y:0}} viewport={{once:false,amount:.2}} transition={{duration:.8,ease:[.22,1,.36,1]}}>{children}</motion.div>}

function App(){
 const [booted,setBooted]=useState(false),[active,setActive]=useState(0),[intelOpen,setIntelOpen]=useState(false),[rogue,setRogue]=useState(null),[sound,setSound]=useState(false)
 const {scrollYProgress}=useScroll(); const progress=useSpring(scrollYProgress,{stiffness:110,damping:28,mass:.25})
 const activeLocation=useMemo(()=>locations[active],[active])
 useEffect(()=>{const t=setTimeout(()=>setBooted(true),1800);return()=>clearTimeout(t)},[])
 useEffect(()=>{if(!sound)return;const AudioCtx=window.AudioContext||window.webkitAudioContext;if(!AudioCtx)return;const ctx=new AudioCtx();const beep=()=>{const o=ctx.createOscillator(),g=ctx.createGain();o.frequency.value=72;o.type='sine';g.gain.setValueAtTime(.018,ctx.currentTime);g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+.14);o.connect(g).connect(ctx.destination);o.start();o.stop(ctx.currentTime+.14)};beep();return()=>ctx.close()},[sound])
 return <main>
  <Boot done={booted}/><motion.div className="mission-progress" style={{scaleX:progress}}/><TacticalNav sound={sound} setSound={setSound}/><Hero />
  <section className="manifesto" id="mission" data-nav="MISSION"><span className="section-code">THE MISSION / 00</span><Reveal><p>Not a symbol of fear <em>for Gotham.</em><br/>A symbol of fear <em>for those who prey on it.</em></p></Reveal><div className="scanline"/><div className="telemetry">SYS.04 // NIGHT PROTOCOL // ACTIVE</div></section>

  <section className="gotham section" id="gotham" data-nav="GOTHAM">
   <Reveal className="section-head"><span className="section-code">CITY SURVEILLANCE / 01</span><h2>GOTHAM<br/><i>UNDER WATCH</i></h2><p>Six priority nodes. Select a target and the Batcomputer will reroute the tactical layer.</p></Reveal>
   <div className="map-shell"><div className="map-grid"/><div className="map-river"/><div className="map-sweep"/>{locations.map((x,i)=><button key={x.name} className={`hotspot h${i} ${active===i?'active':''}`} onClick={()=>{setActive(i);setIntelOpen(false)}} aria-label={`Inspect ${x.name}`}><b>{String(i+1).padStart(2,'0')}</b><span>{x.name}</span></button>)}<div className="target-ring"/><div className="map-coords">42.3601°N // 71.0589°W<br/>ENCRYPTED MUNICIPAL LAYER</div></div>
   <Reveal className="intel"><span>ACTIVE NODE / {String(active+1).padStart(2,'0')}</span><h3>{activeLocation.name}</h3><p>{activeLocation.zone}</p><dl><div><dt>SURVEILLANCE</dt><dd>ONLINE</dd></div><div><dt>THREAT INDEX</dt><dd>{activeLocation.threat}</dd></div><div><dt>UNIT STATUS</dt><dd>{activeLocation.status}</dd></div></dl><button onClick={()=>setIntelOpen(true)}>OPEN INTEL FILE ↗</button></Reveal>
  </section>

  <section className="cave section" id="bruce" data-nav="BATCAVE"><div className="cave-glow"/><div className="hud-orbit"><i/><i/><i/></div><Reveal className="section-head"><span className="section-code">THE CAVE / 02</span><h2>BUILT FOR<br/><i>THE MISSION</i></h2><p>Preparation is the advantage. Every system exists to make one human decision faster, quieter and more precise.</p></Reveal><div className="tech-list">{tech.map((x,i)=><motion.article key={x[0]} initial={{opacity:0,x:45}} whileInView={{opacity:1,x:0}} viewport={{once:false,amount:.6}} transition={{delay:i*.06}}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p><b>+</b></motion.article>)}</div></section>

  <section className="identity section" data-nav="BRUCE WAYNE"><div className="identity-number">02</div><Reveal><span className="section-code">BRUCE WAYNE / IDENTITY</span><h2>THE MASK<br/>ISN'T THE<br/><i>DISGUISE.</i></h2></Reveal><Reveal><blockquote>“Everything impossible is simply waiting for someone willing to prepare for it.”</blockquote></Reveal></section>

  <section className="rogues section" id="rogues" data-nav="ROGUES"><Reveal className="section-head"><span className="section-code">GCPD // BATCOMPUTER / 03</span><h2>ROGUES<br/><i>DATABASE</i></h2><p>Select a subject to decrypt the classified case file.</p></Reveal><div className="rogue-table"><div className="table-head"><span>SUBJECT</span><span>IDENTITY</span><span>PROFILE</span><span>THREAT</span></div>{rogues.map((r,i)=><motion.article key={r.name} role="button" tabIndex="0" onClick={()=>setRogue(r)} onKeyDown={e=>e.key==='Enter'&&setRogue(r)} initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:false,amount:.5}}><b>0{i+1}</b><h3>{r.name}</h3><span>{r.identity}</span><span>{r.profile}</span><strong className={r.threat==='CRITICAL'?'critical':''}>{r.threat}</strong></motion.article>)}</div></section>

  <section className="signal" id="signal" data-nav="SIGNAL"><div className="clouds c1"/><div className="clouds c2"/><div className="beam"/><div className="bat-sigil" aria-hidden="true"><span/><span/><i/></div><Reveal className="signal-copy"><span className="section-code">GOTHAM / 04:17 AM</span><h2>WHEN THE<br/>SIGNAL RISES...</h2><p>...the night answers.</p><a href="#top">RETURN TO THE ROOFTOP ↑</a></Reveal></section>
  <section className="offline"><span>WAYNE // TACTICAL OS</span><h2>SYSTEM<br/>OFFLINE</h2><small>SESSION ENCRYPTED · TRACE PURGED · 04:23:17</small></section>
  <footer><span>THE DARK KNIGHT</span><small>WAYNE SYSTEMS // GOTHAM NODE</small></footer>

  <AnimatePresence>{intelOpen&&<motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setIntelOpen(false)}><motion.aside className="dossier" initial={{opacity:0,scale:.96,y:30}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.98}} onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setIntelOpen(false)}>CLOSE ×</button><span className="section-code">BATCOMPUTER // CITY INTEL</span><h2>{activeLocation.name}</h2><p>{activeLocation.detail}</p><div className="dossier-grid"><span>ZONE<b>{activeLocation.zone}</b></span><span>THREAT<b>{activeLocation.threat}</b></span><span>STATUS<b>{activeLocation.status}</b></span></div><div className="decrypt-line"/></motion.aside></motion.div>}</AnimatePresence>
  <AnimatePresence>{rogue&&<motion.div className="modal-backdrop rogue-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setRogue(null)}><motion.aside className="dossier rogue-dossier" initial={{opacity:0,x:70}} animate={{opacity:1,x:0}} exit={{opacity:0,x:70}} onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setRogue(null)}>CLOSE ×</button><div className="fingerprint"><i/><i/><i/><i/></div><span className="section-code">CLASSIFIED // {rogue.case}</span><h2>{rogue.name}</h2><h4>{rogue.identity}</h4><p>{rogue.note}</p><div className="dossier-grid"><span>PROFILE<b>{rogue.profile}</b></span><span>THREAT<b>{rogue.threat}</b></span><span>CASE<b>OPEN</b></span></div><div className="decrypt-line"/></motion.aside></motion.div>}</AnimatePresence>
 </main>
}
export default App
