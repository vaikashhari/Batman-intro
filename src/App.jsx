import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion'
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
const tech=[
 {id:'01',name:'TACTICAL COWL',short:'Encrypted optics / forensic scan',mode:'FORENSIC',power:'84%',detail:'Multi-spectrum optics, encrypted comms and evidence reconstruction feed directly into the Batcomputer.'},
 {id:'02',name:'GRAPNEL SYSTEM',short:'Rapid vertical traversal',mode:'TRAVERSAL',power:'96%',detail:'Compressed launch system calibrated for rapid elevation changes across Gotham rooftops and service shafts.'},
 {id:'03',name:'BATMOBILE',short:'Armored pursuit platform',mode:'PURSUIT',power:'100%',detail:'Armored high-speed platform with independent navigation, remote recall and tactical countermeasure systems.'},
 {id:'04',name:'REMOTE DRONE',short:'Silent aerial reconnaissance',mode:'RECON',power:'71%',detail:'Low-signature aerial reconnaissance node for thermal mapping, route prediction and remote overwatch.'}
]
const rogues=[
 {name:'JOKER',identity:'UNKNOWN',profile:'CHAOS',threat:'CRITICAL',case:'GCPD-0001',note:'Behavior remains intentionally non-patterned. Avoid predictive assumptions. Civilian risk escalates rapidly when spectacle becomes the objective.'},
 {name:'RIDDLER',identity:'EDWARD NYGMA',profile:'OBSESSION',threat:'HIGH',case:'GCPD-0187',note:'Compulsion for recognition creates exploitable timing windows. Treat every clue as both message and infrastructure attack vector.'},
 {name:'CATWOMAN',identity:'SELINA KYLE',profile:'AMBIGUOUS',threat:'VARIABLE',case:'GCPD-0322',note:'Highly mobile and selectively cooperative. Objectives are usually specific rather than indiscriminate. Do not confuse alignment with predictability.'},
 {name:'PENGUIN',identity:'OSWALD COBBLEPOT',profile:'ORGANIZED CRIME',threat:'HIGH',case:'GCPD-0419',note:'Leverages legitimate fronts, intermediaries and information markets. Financial tracing is more effective than street-level pressure.'}
]

function Boot({done}){return <motion.div className="boot" aria-hidden={done} initial={{opacity:1}} animate={done?{opacity:0,pointerEvents:'none'}:{opacity:1}} transition={{duration:.65}}><div className="boot-mark">◢</div><div className="boot-copy"><span>WAYNE // TACTICAL OS</span><strong>BATCOMPUTER</strong><div className="boot-bar"><i/></div><small>AUTHENTICATING BIOMETRICS · GOTHAM NODE</small></div></motion.div>}

function TacticalNav({sound,setSound}){
 const [active,setActive]=useState('TOP')
 useEffect(()=>{const ids=['top','mission','gotham','bruce','rogues','signal'];const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)setActive(e.target.dataset.nav||e.target.id.toUpperCase())}),{rootMargin:'-40% 0px -50%'});ids.forEach(id=>{const el=document.getElementById(id);if(el)io.observe(el)});return()=>io.disconnect()},[])
 return <div className="tactical-nav"><span className="tactical-status"><i/> WAYNE OS // {active}</span><div className="tactical-actions"><button onClick={()=>setSound(!sound)} aria-pressed={sound}>SOUND: {sound?'ON':'OFF'}</button><a href="#gotham">CITY GRID</a></div></div>
}

function CommandTerminal({open,setOpen,onCommand,history}){
 const [value,setValue]=useState('')
 const submit=e=>{e.preventDefault();const v=value.trim();if(v){onCommand(v);setValue('')}}
 return <AnimatePresence>{open&&<motion.div className="terminal-shell" role="dialog" aria-modal="true" aria-label="Batcomputer command terminal" initial={{opacity:0,y:40,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:30}}><div className="terminal-head"><span>WAYNE TERMINAL // ROOT</span><button onClick={()=>setOpen(false)}>CLOSE ×</button></div><div className="terminal-log" aria-live="polite">{history.map((x,i)=><p key={i} className={x.type}><b>{x.type==='cmd'?'BRUCE@CAVE:~$':'SYS //'}</b> {x.text}</p>)}</div><form onSubmit={submit}><span>›</span><input autoFocus value={value} onChange={e=>setValue(e.target.value)} placeholder="SCAN GOTHAM / OPEN ARKHAM / LOCATE JOKER" aria-label="Batcomputer command"/><button>EXECUTE</button></form><small>TRY: HELP · SCAN GOTHAM · OPEN ARKHAM · LOCATE JOKER · BATMAN</small></motion.div>}</AnimatePresence>
}
function Reveal({children,className=''}){return <motion.div className={className} initial={{opacity:0,y:55}} whileInView={{opacity:1,y:0}} viewport={{once:false,amount:.2}} transition={{duration:.8,ease:[.22,1,.36,1]}}>{children}</motion.div>}

function App(){
 const [booted,setBooted]=useState(false),[active,setActive]=useState(0),[intelOpen,setIntelOpen]=useState(false),[rogue,setRogue]=useState(null),[techOpen,setTechOpen]=useState(null),[sound,setSound]=useState(false),[terminal,setTerminal]=useState(false),[protocol,setProtocol]=useState(false),[tick,setTick]=useState(0),[history,setHistory]=useState([{type:'sys',text:'BATCOMPUTER COMMAND BUS ONLINE. TYPE HELP.'}])
 const {scrollYProgress}=useScroll(); const progress=useSpring(scrollYProgress,{stiffness:110,damping:28,mass:.25}); const depthY=useTransform(scrollYProgress,[0,1],[0,-180]); const depthRotate=useTransform(scrollYProgress,[0,1],[0,18])
 const activeLocation=useMemo(()=>locations[active],[active])
 useEffect(()=>{const t=setTimeout(()=>setBooted(true),1800);return()=>clearTimeout(t)},[])
 useEffect(()=>{const t=setInterval(()=>setTick(x=>(x+1)%1000),2200);return()=>clearInterval(t)},[])
 useEffect(()=>{const key=e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setTerminal(x=>!x)}if(e.key==='Escape'){setTerminal(false);setProtocol(false);setIntelOpen(false);setRogue(null);setTechOpen(null)}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[])
 const runCommand=raw=>{
  const cmd=raw.toUpperCase().trim();let response='COMMAND NOT RECOGNIZED. TYPE HELP.'
  if(cmd==='HELP')response='AVAILABLE: SCAN GOTHAM · OPEN [NODE] · LOCATE [ROGUE] · BATCAVE · ACTIVATE SIGNAL · BATMAN'
  else if(cmd==='SCAN GOTHAM'){document.getElementById('gotham')?.scrollIntoView({behavior:'smooth'});response='CITY GRID ACQUIRED. SIX PRIORITY NODES ONLINE.'}
  else if(cmd.startsWith('OPEN ')){const q=cmd.slice(5);const i=locations.findIndex(x=>x.name.includes(q));if(i>=0){setActive(i);setIntelOpen(true);response=`${locations[i].name} INTEL DECRYPTED.`}}
  else if(cmd.startsWith('LOCATE ')){const q=cmd.slice(7);const r=rogues.find(x=>x.name.includes(q));if(r){setRogue(r);response=`${r.name} CASE FILE ACQUIRED // THREAT ${r.threat}.`}}
  else if(cmd==='BATCAVE'){document.getElementById('bruce')?.scrollIntoView({behavior:'smooth'});response='BATCAVE SYSTEMS LINKED.'}
  else if(cmd==='ACTIVATE SIGNAL'){document.getElementById('signal')?.scrollIntoView({behavior:'smooth'});response='GORDON PROTOCOL ACCEPTED. SIGNAL POWERING UP.'}
  else if(cmd==='BATMAN'){setProtocol(true);response='PROTOCOL KNIGHTFALL // IDENTITY LOCK ENGAGED.'}
  setHistory(h=>[...h.slice(-7),{type:'cmd',text:raw},{type:'sys',text:response}])
 }
 useEffect(()=>{
  const dialogOpen=terminal||protocol||intelOpen||Boolean(rogue)||Boolean(techOpen)
  if(!dialogOpen)return
  const dialog=document.querySelector('[role="dialog"]:not([aria-hidden="true"])')
  if(!dialog)return
  const previous=document.activeElement
  const focusable=()=>Array.from(dialog.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),[tabindex]:not([tabindex="-1"])')).filter(el=>el.getAttribute('aria-hidden')!=='true')
  const first=focusable()[0]
  first?.focus()
  const trap=e=>{if(e.key!=='Tab')return;const items=focusable();if(!items.length){e.preventDefault();return}const firstItem=items[0],lastItem=items[items.length-1];if(e.shiftKey&&document.activeElement===firstItem){e.preventDefault();lastItem.focus()}else if(!e.shiftKey&&document.activeElement===lastItem){e.preventDefault();firstItem.focus()}}
  dialog.addEventListener('keydown',trap)
  return()=>{dialog.removeEventListener('keydown',trap);if(previous&&typeof previous.focus==='function')previous.focus()}
 },[terminal,protocol,intelOpen,rogue,techOpen])
 useEffect(()=>{if(!sound)return;const AudioCtx=window.AudioContext||window.webkitAudioContext;if(!AudioCtx)return;const ctx=new AudioCtx();const o=ctx.createOscillator(),g=ctx.createGain();o.frequency.value=72;o.type='sine';g.gain.setValueAtTime(.018,ctx.currentTime);g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+.14);o.connect(g).connect(ctx.destination);o.start();o.stop(ctx.currentTime+.14);return()=>ctx.close()},[sound])
 return <main>
  <a className="skip-link" href="#mission">Skip intro</a>
  <Boot done={booted}/><div className="live-telemetry" aria-hidden="true"><span>GOTHAM NET <b>LIVE</b></span><i>INCIDENTS {String(17+(tick%6)).padStart(2,'0')}</i><i>DRONES {4+(tick%3)}/7</i><i>GRID {96-(tick%4)}%</i></div><button className="terminal-trigger" onClick={()=>setTerminal(true)} aria-label="Open Batcomputer command terminal">⌘ COMMAND</button><motion.div className="mission-progress" style={{scaleX:progress}}/><motion.div className="world-depth" aria-hidden="true" style={{y:depthY,rotate:depthRotate}}><i/><i/><i/></motion.div><div className="cinema-noise" aria-hidden="true"/><TacticalNav sound={sound} setSound={setSound}/><Hero />
  <section className="manifesto" id="mission" data-nav="MISSION"><span className="section-code">THE MISSION / 00</span><Reveal><p>Not a symbol of fear <em>for Gotham.</em><br/>A symbol of fear <em>for those who prey on it.</em></p></Reveal><div className="scanline"/><div className="telemetry">SYS.04 // NIGHT PROTOCOL // ACTIVE</div></section>
  <section className="gotham section" id="gotham" data-nav="GOTHAM"><Reveal className="section-head"><span className="section-code">CITY SURVEILLANCE / 01</span><h2>GOTHAM<br/><i>UNDER WATCH</i></h2><p>Six priority nodes. Select a target and the Batcomputer will reroute the tactical layer.</p></Reveal><div className="map-shell"><div className="map-grid"/><div className="city-blocks"><i/><i/><i/><i/><i/><i/><i/><i/></div><div className="map-river"/><div className="map-sweep"/><div className="map-route"><i/><i/><i/></div>{locations.map((x,i)=><button key={x.name} className={`hotspot h${i} ${active===i?'active':''}`} onClick={()=>{setActive(i);setIntelOpen(false)}} aria-label={`Inspect ${x.name}`}><b>{String(i+1).padStart(2,'0')}</b><span>{x.name}</span></button>)}<div className="target-ring"/><div className="map-coords">42.3601°N // 71.0589°W<br/>ENCRYPTED MUNICIPAL LAYER</div></div><Reveal className="intel"><span>ACTIVE NODE / {String(active+1).padStart(2,'0')}</span><h3>{activeLocation.name}</h3><p>{activeLocation.zone}</p><dl><div><dt>SURVEILLANCE</dt><dd>ONLINE</dd></div><div><dt>THREAT INDEX</dt><dd>{activeLocation.threat}</dd></div><div><dt>UNIT STATUS</dt><dd>{activeLocation.status}</dd></div></dl><button onClick={()=>setIntelOpen(true)}>OPEN INTEL FILE ↗</button></Reveal></section>
  <section className="cave section" id="bruce" data-nav="BATCAVE"><div className="cave-glow"/><div className="hud-orbit"><i/><i/><i/></div><div className="cave-core"><span>CORE</span><b>98.7</b><small>OPERATIONAL</small></div><Reveal className="section-head"><span className="section-code">THE CAVE / 02</span><h2>BUILT FOR<br/><i>THE MISSION</i></h2><p>Preparation is the advantage. Every system exists to make one human decision faster, quieter and more precise.</p></Reveal><div className="tech-list">{tech.map((x,i)=><motion.article key={x.id} role="button" tabIndex="0" onClick={()=>setTechOpen(x)} onKeyDown={e=>e.key==='Enter'&&setTechOpen(x)} initial={{opacity:0,x:45}} whileInView={{opacity:1,x:0}} viewport={{once:false,amount:.6}} transition={{delay:i*.06}}><span>{x.id}</span><h3>{x.name}</h3><p>{x.short}</p><b>+</b></motion.article>)}</div></section>
  <section className="identity section" data-nav="BRUCE WAYNE"><div className="identity-number">02</div><Reveal><span className="section-code">BRUCE WAYNE / IDENTITY</span><h2>THE MASK<br/>ISN'T THE<br/><i>DISGUISE.</i></h2></Reveal><Reveal><blockquote>“Everything impossible is simply waiting for someone willing to prepare for it.”</blockquote></Reveal></section>
  <section className="rogues section" id="rogues" data-nav="ROGUES"><Reveal className="section-head"><span className="section-code">GCPD // BATCOMPUTER / 03</span><h2>ROGUES<br/><i>DATABASE</i></h2><p>Select a subject to decrypt the classified case file.</p></Reveal><div className="rogue-table"><div className="table-head"><span>SUBJECT</span><span>IDENTITY</span><span>PROFILE</span><span>THREAT</span></div>{rogues.map((r,i)=><motion.article key={r.name} role="button" tabIndex="0" onClick={()=>setRogue(r)} onKeyDown={e=>e.key==='Enter'&&setRogue(r)} initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:false,amount:.5}}><b>0{i+1}</b><h3>{r.name}</h3><span>{r.identity}</span><span>{r.profile}</span><strong className={r.threat==='CRITICAL'?'critical':''}>{r.threat}</strong></motion.article>)}</div></section>
  <section className="signal" id="signal" data-nav="SIGNAL"><div className="signal-charge"><i/><i/><i/></div><div className="clouds c1"/><div className="clouds c2"/><div className="beam"/><div className="bat-sigil" aria-hidden="true"><span/><span/><i/></div><Reveal className="signal-copy"><span className="section-code">GOTHAM / 04:17 AM</span><h2>WHEN THE<br/>SIGNAL RISES...</h2><p>...the night answers.</p><a href="#top">RETURN TO THE ROOFTOP ↑</a></Reveal></section>
  <section className="offline"><span>WAYNE // TACTICAL OS</span><h2>SYSTEM<br/>OFFLINE</h2><small>SESSION ENCRYPTED · TRACE PURGED · 04:23:17</small></section><footer><span>THE DARK KNIGHT</span><small>WAYNE SYSTEMS // GOTHAM NODE</small></footer>
  <CommandTerminal open={terminal} setOpen={setTerminal} onCommand={runCommand} history={history}/>
  <AnimatePresence>{protocol&&<motion.div className="knightfall" role="dialog" aria-modal="true" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setProtocol(false)}><motion.div initial={{scale:.6,opacity:0}} animate={{scale:1,opacity:1}}><span>RESTRICTED // PROTOCOL</span><h2>KNIGHTFALL</h2><p>IDENTITY: BRUCE WAYNE<br/>STATUS: THE BATMAN<br/>ACCESS: ABSOLUTE</p><small>CLICK OR ESC TO PURGE</small></motion.div></motion.div>}</AnimatePresence>
  <AnimatePresence>{techOpen&&<motion.div className="modal-backdrop equipment-backdrop" role="dialog" aria-modal="true" onClick={()=>setTechOpen(null)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><motion.aside className="dossier equipment-dossier" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setTechOpen(null)}>CLOSE ×</button><span className="section-code">BATCAVE // EQUIPMENT {techOpen.id}</span><div className="equipment-visual"><div className="equipment-ring"/><strong>{techOpen.id}</strong></div><h2>{techOpen.name}</h2><p>{techOpen.detail}</p><div className="dossier-grid"><span>MODE<b>{techOpen.mode}</b></span><span>POWER<b>{techOpen.power}</b></span><span>LINK<b>SECURE</b></span></div></motion.aside></motion.div>}</AnimatePresence>
  <AnimatePresence>{intelOpen&&<motion.div className="modal-backdrop" role="dialog" aria-modal="true" onClick={()=>setIntelOpen(false)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><motion.aside className="dossier" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setIntelOpen(false)}>CLOSE ×</button><span className="section-code">BATCOMPUTER // CITY INTEL</span><h2>{activeLocation.name}</h2><p>{activeLocation.detail}</p><div className="dossier-grid"><span>ZONE<b>{activeLocation.zone}</b></span><span>THREAT<b>{activeLocation.threat}</b></span><span>STATUS<b>{activeLocation.status}</b></span></div></motion.aside></motion.div>}</AnimatePresence>
  <AnimatePresence>{rogue&&<motion.div className="modal-backdrop rogue-backdrop" role="dialog" aria-modal="true" onClick={()=>setRogue(null)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><motion.aside className="dossier rogue-dossier" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setRogue(null)}>CLOSE ×</button><div className="fingerprint"><i/><i/><i/><i/></div><span className="section-code">CLASSIFIED // {rogue.case}</span><h2>{rogue.name}</h2><h4>{rogue.identity}</h4><p>{rogue.note}</p><div className="dossier-grid"><span>PROFILE<b>{rogue.profile}</b></span><span>THREAT<b>{rogue.threat}</b></span><span>CASE<b>OPEN</b></span></div></motion.aside></motion.div>}</AnimatePresence>
 </main>
}
export default App
