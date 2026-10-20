import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import type { MotionValue } from 'motion/react'
import portraitPlaceholder from '../assets/portrait-placeholder.svg'
import { motionDuration, motionEase } from '../motion'

const portraitUrl = '/images/profile.jpg'

type HeroPortraitProps = {
  sceneX?: MotionValue<string>
  sceneY?: MotionValue<string>
  sceneScale?: MotionValue<number>
  sceneOpacity?: MotionValue<number>
  pointerEnabled?: boolean
}

export function HeroPortrait({ sceneX, sceneY, sceneScale, sceneOpacity, pointerEnabled = false }: HeroPortraitProps) {
  const [showFallback, setShowFallback] = useState(false)
  const reduceMotion = useReducedMotion()
  const pointerBounds = useRef<DOMRect | null>(null)
  const pointerActive = useRef(false)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const frameX = useSpring(pointerX, { stiffness: 180, damping: 25, mass: 0.35 })
  const frameY = useSpring(pointerY, { stiffness: 180, damping: 25, mass: 0.35 })

  useEffect(() => {
    if (pointerEnabled) return
    pointerActive.current = false
    pointerX.set(0)
    pointerY.set(0)
  }, [pointerEnabled, pointerX, pointerY])

  function handlePointerEnter(event: PointerEvent<HTMLDivElement>) {
    pointerActive.current = pointerEnabled && event.pointerType === 'mouse' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
    pointerBounds.current = pointerActive.current ? event.currentTarget.getBoundingClientRect() : null
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!pointerActive.current || !pointerBounds.current) return
    const { left, top, width, height } = pointerBounds.current
    pointerX.set(Math.max(-4, Math.min(4, ((event.clientX - left) / width - 0.5) * 8)))
    pointerY.set(Math.max(-4, Math.min(4, ((event.clientY - top) / height - 0.5) * 8)))
  }

  function handlePointerLeave() {
    pointerActive.current = false
    pointerBounds.current = null
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <motion.div
      className="hero-art"
      style={sceneX && sceneY && sceneScale && sceneOpacity ? { x: sceneX, y: sceneY, scale: sceneScale, opacity: sceneOpacity } : undefined}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        className="hero-art-entrance"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.975, y: 12 }}
        animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: motionDuration.portrait, delay: 0.18, ease: motionEase }}
      >
        <motion.div className={`portrait-frame ${showFallback ? '' : 'portrait-frame--photo'}`} style={pointerEnabled ? { x: frameX, y: frameY } : undefined}>
          <div className="portrait-corner portrait-corner--top" aria-hidden="true" />
          <img
            src={showFallback ? portraitPlaceholder : portraitUrl}
            alt={showFallback ? 'Illustrated portrait placeholder for Vinura' : 'Portrait of Vinura Pathum Sandeepa'}
            width="832"
            height="923"
            fetchPriority="high"
            decoding="async"
            onError={() => setShowFallback(true)}
          />
          <div className="portrait-corner portrait-corner--bottom" aria-hidden="true" />
          <span className="portrait-index" aria-hidden="true">01 / VP</span>
        </motion.div>
        <div className="portrait-caption">
          <span>{showFallback ? 'Portrait placeholder' : 'Vinura Pathum Sandeepa'}</span>
          <span>Undergraduate Software Engineer / SLIIT</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
