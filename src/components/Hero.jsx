import React, { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './Hero.css'
import Navbar from './Navbar'

const Hero = () => {
  const heroRef   = useRef(null)
  const canvasRef = useRef(null)
  const mouseRef  = useRef({ x: -9999, y: -9999 })
  const smoothRef = useRef({ x: -9999, y: -9999 })
  const trailRef  = useRef([])
  const { scrollY } = useScroll()
  const heroScale = useTransform(scrollY, [0, 900], [1, 1.08])
  const heroY = useTransform(scrollY, [0, 900], [0, 90])
  const copyOpacity = useTransform(scrollY, [0, 620], [1, 0])

  useEffect(() => {
    const hero = heroRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: false })
    const maskCanvas = document.createElement('canvas')
    const mask = maskCanvas.getContext('2d')
    const bottom = new Image()
    const top = new Image()
    bottom.src = '/images/twoo.jpg'
    top.src = '/images/one.jpg'

    const trail = trailRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const TRAIL_LENGTH = reducedMotion ? 1 : 34
    let radius = Math.min(window.innerWidth * .14, 190)
    let rafId = 0
    let ready = false
    let active = false
    let visible = true

    const cover = (context, image, width, height) => {
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight)
      const w = image.naturalWidth * scale
      const h = image.naturalHeight * scale
      context.drawImage(image, (width - w) / 2, (height - h) / 2, w, h)
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const width = hero.clientWidth
      const height = hero.clientHeight
      canvas.width = maskCanvas.width = Math.round(width * dpr)
      canvas.height = maskCanvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      mask.setTransform(dpr, 0, 0, dpr, 0, 0)
      radius = Math.min(width * .18, 190)
    }

    const pointer = (clientX, clientY) => {
      const rect = hero.getBoundingClientRect()
      mouseRef.current = { x: clientX - rect.left, y: clientY - rect.top }
      if (!active) smoothRef.current = { ...mouseRef.current }
      active = true
    }
    const onMove = e => pointer(e.clientX, e.clientY)
    const onTouch = e => { if (e.touches[0]) pointer(e.touches[0].clientX, e.touches[0].clientY) }
    const onLeave = () => { active = false; trail.length = 0 }

    const draw = () => {
      if (!ready) return
      const width = hero.clientWidth
      const height = hero.clientHeight
      ctx.clearRect(0, 0, width, height)
      cover(ctx, bottom, width, height)

      if (active) {
        const s = smoothRef.current
        const m = mouseRef.current
        s.x += (m.x - s.x) * .16
        s.y += (m.y - s.y) * .16
        trail.unshift({ x: s.x, y: s.y })
        if (trail.length > TRAIL_LENGTH) trail.length = TRAIL_LENGTH

        mask.clearRect(0, 0, width, height)
        for (let i = trail.length - 1; i >= 0; i--) {
          const t = 1 - i / Math.max(trail.length, 1)
          const r = radius * (.28 + .72 * t)
          const g = mask.createRadialGradient(trail[i].x, trail[i].y, r * .45, trail[i].x, trail[i].y, r)
          g.addColorStop(0, `rgba(0,0,0,${Math.min(1,t*1.25)})`)
          g.addColorStop(1, 'rgba(0,0,0,0)')
          mask.fillStyle = g
          mask.beginPath(); mask.arc(trail[i].x, trail[i].y, r, 0, Math.PI * 2); mask.fill()
        }
        mask.globalCompositeOperation = 'source-in'
        cover(mask, top, width, height)
        mask.globalCompositeOperation = 'source-over'
        ctx.drawImage(maskCanvas, 0, 0, width, height)
      }
      if (visible) rafId = requestAnimationFrame(draw)
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && ready) { cancelAnimationFrame(rafId); draw() }
      else cancelAnimationFrame(rafId)
    }, { threshold: 0.02 })
    observer.observe(hero)

    resize()
    window.addEventListener('resize', resize, { passive: true })
    if (finePointer) hero.addEventListener('pointermove', onMove, { passive: true })
    else hero.addEventListener('touchmove', onTouch, { passive: true })
    hero.addEventListener('pointerleave', onLeave)

    let loaded = 0
    const onLoad = () => { if (++loaded === 2) { ready = true; draw() } }
    bottom.onload = onLoad; top.onload = onLoad
    return () => {
      window.removeEventListener('resize', resize)
      hero.removeEventListener('pointermove', onMove)
      hero.removeEventListener('touchmove', onTouch)
      hero.removeEventListener('pointerleave', onLeave)
      observer.disconnect()
      cancelAnimationFrame(rafId)
    }
  }, [])

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  }

  const item = {
    hidden:  { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70, damping: 12 } },
  }

  const navbarVariant = {
    hidden:  { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 14 } },
  }

  return (
    <div className="hero" id="top" ref={heroRef}>

      <motion.div className="hero-depth" style={{scale:heroScale,y:heroY}}><canvas ref={canvasRef} className="hero-canvas" /></motion.div>

      <motion.div variants={navbarVariant} initial="hidden" animate="visible">
        <Navbar />
      </motion.div>

      <motion.div
        className="hero-content"
        style={{opacity:copyOpacity}}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* LEFT */}
        <motion.div className="left" variants={item}>
          <motion.span className="st-eyebrow" variants={item}
            style={{ fontFamily: "'Cinzel', serif", letterSpacing: '0.25em' }}>
            Gotham City
          </motion.span>
          <h1 className="st-title"
            style={{ fontFamily: "'Bebas Neue', 'Cinzel Decorative', cursive", letterSpacing: '0.05em' }}>
            THE DARK<br />KNIGHT
          </h1>
          <motion.p className="st-desc" variants={item}
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic' }}>
            He is vengeance. He is the night. Born from tragedy, forged in shadow —
            Gotham's last hope wears no badge, carries no gun,
            and fears nothing but the day his city stops fighting back.
          </motion.p>
          <motion.a href="#mission" className="st-btn" variants={item}>Enter the Dark <span>↓</span></motion.a>
        </motion.div>

        {/* RIGHT */}
        <motion.div className="right" variants={item}>
          <motion.span className="st-eyebrow right-eyebrow" variants={item}
            style={{ fontFamily: "'Cinzel', serif", letterSpacing: '0.25em' }}>
            Bruce Wayne
          </motion.span>
          <h1 className="st-title"
            style={{ fontFamily: "'Bebas Neue', 'Cinzel Decorative', cursive", letterSpacing: '0.05em' }}>
            The Man<br />Behind the Mask
          </h1>
          <motion.p className="st-text" variants={item}
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic' }}>
            Billionaire by day. Guardian by night. Every scar a lesson,
            every shadow a weapon. He doesn't kill — but the darkness obeys him.
            Can one man's will hold a city together when evil never sleeps?
          </motion.p>
        </motion.div>
      </motion.div>

    </div>
  )
}

export default Hero