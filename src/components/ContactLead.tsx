import { ArrowUpRight, Mail } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { motionDuration, motionEase } from '../motion'

function rise(delay: number, distance = 14, duration: number = motionDuration.detail) {
  return {
    hidden: { opacity: 0, y: distance },
    visible: { opacity: 1, y: 0, transition: { duration, delay, ease: motionEase } },
  }
}

export function ContactLead() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="contact-lead"
      initial={reduceMotion ? false : 'hidden'}
      whileInView={reduceMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.p className="section-kicker" variants={rise(0, 8)}><span>05</span> / LET’S CONNECT</motion.p>
      <h2 id="contact-title" aria-label="Have something in mind?">
        <span className="contact-title-line"><motion.span variants={rise(0.1, 38, motionDuration.heading)}>Have something</motion.span></span>{' '}
        <span className="contact-title-line"><motion.em variants={rise(0.2, 38, motionDuration.heading)}>in mind?</motion.em></span>
      </h2>
      <motion.p className="contact-intro" variants={rise(0.38)}>I’d be glad to hear about opportunities, ideas, or a project worth discussing.</motion.p>
      <motion.a className="contact-email" href="mailto:vpsvinura@gmail.com" variants={rise(0.5)}><Mail size={22} aria-hidden="true" /> vpsvinura@gmail.com <ArrowUpRight size={20} aria-hidden="true" /></motion.a>
    </motion.div>
  )
}
