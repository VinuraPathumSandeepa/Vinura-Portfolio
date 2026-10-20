import { useEffect, useRef, useState } from 'react'
import { ArrowDown } from 'lucide-react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { gemoraScreenshots } from '../data/portfolio'
import { HeroIntro } from './HeroIntro'
import { HeroPortrait } from './HeroPortrait'
import { useGemoraScreenshots } from './useGemoraScreenshots'

const sceneScreenshotIds = new Set(['homepage', 'seller-dashboard', 'mobile-marketplace'])
const noScreenshotIds = new Set<string>()

export function HeroScene() {
  const trackRef = useRef<HTMLElement>(null)
  const copyInactiveRef = useRef(false)
  const reduceMotion = useReducedMotion()
  const [wideScreen, setWideScreen] = useState(() => window.matchMedia('(min-width: 1024px)').matches)
  const [copyInactive, setCopyInactive] = useState(false)
  const sceneEnabled = wideScreen && !reduceMotion
  const { available } = useGemoraScreenshots(sceneEnabled ? sceneScreenshotIds : noScreenshotIds)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })

  // One timeline drives the shared portrait, departing copy and incoming workspace.
  const copyX = useTransform(scrollYProgress, [0, 0.18, 0.28, 0.4], [0, 0, -30, -180])
  const copyY = useTransform(scrollYProgress, [0, 0.18, 0.28, 0.4], [0, 0, -20, -95])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.18, 0.28, 0.38], [1, 1, 0.7, 0])
  const portraitX = useTransform(scrollYProgress, [0, 0.18, 0.52, 0.72, 1], ['0vw', '0vw', '-13vw', '-13vw', '5vw'])
  const portraitY = useTransform(scrollYProgress, [0, 0.18, 0.52, 0.72, 1], ['0vh', '0vh', '-5vh', '-5vh', '-32vh'])
  const portraitScale = useTransform(scrollYProgress, [0, 0.18, 0.52, 0.72, 1], [1, 1, 0.78, 0.78, 0.4])
  const backdropOpacity = useTransform(scrollYProgress, [0.12, 0.5, 0.78, 1], [0, 1, 1, 0.35])
  const workspaceOpacity = useTransform(scrollYProgress, [0.3, 0.48, 0.72, 1], [0, 1, 1, 0.2])
  const workspaceY = useTransform(scrollYProgress, [0.3, 0.5, 0.75, 1], [85, 0, 0, -55])
  const workspaceScale = useTransform(scrollYProgress, [0.3, 0.5, 0.75, 1], [0.92, 1, 1, 0.89])
  const supportingX = useTransform(scrollYProgress, [0.24, 0.56, 0.75, 1], [130, 0, 0, 200])
  const mobileY = useTransform(scrollYProgress, [0.24, 0.56, 0.75, 1], [125, 0, 0, 130])
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const nextInactive = progress >= 0.38
    if (copyInactiveRef.current !== nextInactive) {
      copyInactiveRef.current = nextInactive
      setCopyInactive(nextInactive)
    }
  })

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)')
    const update = () => setWideScreen(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const homepage = gemoraScreenshots.find((item) => item.id === 'homepage')
  const seller = gemoraScreenshots.find((item) => item.id === 'seller-dashboard')
  const mobile = gemoraScreenshots.find((item) => item.id === 'mobile-marketplace')

  return (
    <section className={`hero-track ${sceneEnabled ? 'hero-track--cinematic' : ''}`} aria-labelledby="hero-title" ref={trackRef}>
      <div className="hero hero-stage section-shell">
        {sceneEnabled && (
          <>
            <motion.div className="hero-scene-backdrop" style={{ opacity: backdropOpacity }} aria-hidden="true">
              <span className="hero-scene-orbit hero-scene-orbit--one" />
              <span className="hero-scene-orbit hero-scene-orbit--two" />
              <span className="hero-scene-crosshair" />
            </motion.div>
            <motion.div className="hero-workspace" style={{ opacity: workspaceOpacity, y: workspaceY, scale: workspaceScale }} aria-hidden="true">
              <div className="hero-workspace-heading"><span>SELECTED PROJECT / GEMORAAI</span><strong>Ideas into interfaces.</strong><span>REACT · FLUTTER · ASP.NET CORE</span></div>
              {homepage && available.has(homepage.id) && <div className="hero-workspace-browser hero-workspace-browser--primary"><div className="hero-workspace-chrome"><i /><i /><i /><span>GemoraAI / buyer web</span></div><img src={homepage.src} alt="" decoding="async" /></div>}
              {seller && available.has(seller.id) && <motion.div className="hero-workspace-browser hero-workspace-browser--seller" style={{ x: supportingX }}><div className="hero-workspace-chrome"><i /><i /><i /><span>Seller dashboard</span></div><img src={seller.src} alt="" decoding="async" /></motion.div>}
              {mobile && available.has(mobile.id) && <motion.div className="hero-workspace-mobile" style={{ y: mobileY }}><img src={mobile.src} alt="" decoding="async" /><span>FLUTTER / MOBILE</span></motion.div>}
              <span className="hero-workspace-coordinate">WEB / API / MOBILE</span>
            </motion.div>
          </>
        )}
        <HeroIntro sceneX={sceneEnabled ? copyX : undefined} sceneY={sceneEnabled ? copyY : undefined} sceneOpacity={sceneEnabled ? copyOpacity : undefined} sceneInactive={sceneEnabled && copyInactive} />
        <HeroPortrait sceneX={sceneEnabled ? portraitX : undefined} sceneY={sceneEnabled ? portraitY : undefined} sceneScale={sceneEnabled ? portraitScale : undefined} pointerEnabled={sceneEnabled} />
        <a className="scroll-cue" href="#about" aria-label="Scroll to about section"><span>Scroll to explore</span><ArrowDown size={16} aria-hidden="true" /></a>
        {sceneEnabled && <motion.span className="hero-handoff" style={{ scaleX: progressScale }} aria-hidden="true" />}
      </div>
    </section>
  )
}
