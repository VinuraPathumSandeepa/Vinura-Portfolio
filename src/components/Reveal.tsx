import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { motionDuration, motionEase } from '../motion'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  variant?: 'default' | 'heading'
}

export function Reveal({ children, className, delay = 0, variant = 'default' }: RevealProps) {
  const reduceMotion = useReducedMotion()
  const heading = variant === 'heading'

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: heading ? 30 : 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: heading ? motionDuration.heading : motionDuration.section, ease: motionEase, delay }}
    >
      {children}
    </motion.div>
  )
}
