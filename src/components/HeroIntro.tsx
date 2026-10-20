import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { motionDuration, motionEase } from '../motion'

type HeroIntroProps = {
  sceneX?: MotionValue<number>
  sceneY?: MotionValue<number>
  sceneOpacity?: MotionValue<number>
  headlineClip?: MotionValue<string>
  sceneInactive?: boolean
}

export function HeroIntro({ sceneX, sceneY, sceneOpacity, headlineClip, sceneInactive = false }: HeroIntroProps) {
  const reduceMotion = useReducedMotion()
  const fadeUp = (delay: number) => reduceMotion ? {} : {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: motionDuration.detail, delay, ease: motionEase },
  }
  const revealLine = (delay: number) => reduceMotion ? {} : {
    initial: { opacity: 0, y: '105%' },
    animate: { opacity: 1, y: '0%' },
    transition: { duration: motionDuration.heroLine, delay, ease: motionEase },
  }

  return (
    <motion.div className="hero-copy" style={sceneX && sceneY && sceneOpacity ? { x: sceneX, y: sceneY, opacity: sceneOpacity } : undefined}>
      <motion.p className="eyebrow" {...fadeUp(0.04)}><span className="eyebrow-line" /> Undergraduate Software Engineer</motion.p>
      <motion.h1 id="hero-title" aria-label="Practical software, from backend to interface." style={headlineClip ? { clipPath: headlineClip } : undefined}>
        <span className="hero-line"><motion.span {...revealLine(0.13)}>Practical software,</motion.span></span>
        <span className="hero-line"><motion.span {...revealLine(0.22)}>from backend to</motion.span></span>
        <span className="hero-line"><motion.em {...revealLine(0.31)}>interface.</motion.em></span>
      </motion.h1>
      <motion.p className="hero-intro" {...fadeUp(0.45)}>
        I’m Vinura Pathum Sandeepa, an Undergraduate Software Engineer pursuing my degree
        at the Sri Lanka Institute of Information Technology (SLIIT). My project work spans backend
        development, REST APIs, databases, and full-stack applications.
      </motion.p>
      <div className="hero-actions">
        <motion.a className="button button--primary" href="#projects" tabIndex={sceneInactive ? -1 : undefined} {...fadeUp(0.57)}>Explore my work <ArrowUpRight size={18} aria-hidden="true" /></motion.a>
        <motion.a className="button button--text" href="mailto:vpsvinura@gmail.com" tabIndex={sceneInactive ? -1 : undefined} {...fadeUp(0.64)}>Get in touch <ArrowRight size={18} aria-hidden="true" /></motion.a>
      </div>
    </motion.div>
  )
}
