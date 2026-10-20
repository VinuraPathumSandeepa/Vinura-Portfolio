import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1] as const

export function HeroIntro() {
  const reduceMotion = useReducedMotion()
  const fadeUp = (delay: number) => reduceMotion ? {} : {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease },
  }
  const revealLine = (delay: number) => reduceMotion ? {} : {
    initial: { opacity: 0, y: '105%' },
    animate: { opacity: 1, y: '0%' },
    transition: { duration: 0.72, delay, ease },
  }

  return (
    <div className="hero-copy">
      <motion.p className="eyebrow" {...fadeUp(0.04)}><span className="eyebrow-line" /> Undergraduate Software Engineer</motion.p>
      <h1 id="hero-title" aria-label="Practical software, from backend to interface.">
        <span className="hero-line"><motion.span {...revealLine(0.13)}>Practical software,</motion.span></span>
        <span className="hero-line"><motion.span {...revealLine(0.22)}>from backend to</motion.span></span>
        <span className="hero-line"><motion.em {...revealLine(0.31)}>interface.</motion.em></span>
      </h1>
      <motion.p className="hero-intro" {...fadeUp(0.45)}>
        I’m Vinura Pathum Sandeepa, an Undergraduate Software Engineer pursuing my degree
        at the Sri Lanka Institute of Information Technology (SLIIT). My project work spans backend
        development, REST APIs, databases, and full-stack applications.
      </motion.p>
      <div className="hero-actions">
        <motion.a className="button button--primary" href="#projects" {...fadeUp(0.57)}>Explore my work <ArrowUpRight size={18} aria-hidden="true" /></motion.a>
        <motion.a className="button button--text" href="mailto:vpsvinura@gmail.com" {...fadeUp(0.64)}>Get in touch <ArrowRight size={18} aria-hidden="true" /></motion.a>
      </div>
    </div>
  )
}
