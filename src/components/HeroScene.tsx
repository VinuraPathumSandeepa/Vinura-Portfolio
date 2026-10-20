import { useEffect, useRef, useState } from 'react'
import { ArrowDown } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { HeroIntro } from './HeroIntro'
import { HeroPortrait } from './HeroPortrait'

export function HeroScene() {
  const heroRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const [desktopPointer, setDesktopPointer] = useState(() => window.matchMedia('(min-width: 761px) and (hover: hover) and (pointer: fine)').matches)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const copyY = useTransform(scrollYProgress, [0, 0.85], [0, -38])
  const portraitY = useTransform(scrollYProgress, [0, 0.85], [0, 24])
  const portraitScale = useTransform(scrollYProgress, [0, 0.85], [1, 0.975])
  const handoffScale = useTransform(scrollYProgress, [0.48, 0.9], [0, 1])
  const depthEnabled = desktopPointer && !reduceMotion

  useEffect(() => {
    const media = window.matchMedia('(min-width: 761px) and (hover: hover) and (pointer: fine)')
    const update = () => setDesktopPointer(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return (
    <section className="hero section-shell" aria-labelledby="hero-title" ref={heroRef}>
      <HeroIntro scrollY={depthEnabled ? copyY : undefined} />
      <HeroPortrait scrollY={depthEnabled ? portraitY : undefined} scrollScale={depthEnabled ? portraitScale : undefined} pointerEnabled={depthEnabled} />
      <a className="scroll-cue" href="#about" aria-label="Scroll to about section"><span>Scroll to explore</span><ArrowDown size={16} aria-hidden="true" /></a>
      {depthEnabled && <motion.span className="hero-handoff" style={{ scaleX: handoffScale }} aria-hidden="true" />}
    </section>
  )
}
