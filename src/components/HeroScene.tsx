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
  const copyX = useTransform(scrollYProgress, [0, 0.24, 0.38], [0, 0, -110])
  const copyY = useTransform(scrollYProgress, [0, 0.24, 0.38], [0, 0, -50])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.24, 0.33, 0.37], [1, 1, 0.06, 0])
  const headlineClip = useTransform(scrollYProgress, [0, 0.27, 0.37], ['inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 0%)', 'inset(0% 0% 100% 0%)'])
  const portraitX = useTransform(scrollYProgress, [0, 0.2, 0.54, 0.76, 1], ['0vw', '0vw', '-13vw', '-13vw', '-16vw'])
  const portraitY = useTransform(scrollYProgress, [0, 0.2, 0.54, 0.76, 1], ['0vh', '0vh', '-5vh', '-5vh', '-9vh'])
  const portraitScale = useTransform(scrollYProgress, [0, 0.2, 0.54, 0.76, 1], [1, 1, 0.78, 0.78, 0.65])
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.77, 0.9, 1], [1, 1, 0.55, 0])
  const backdropOpacity = useTransform(scrollYProgress, [0.14, 0.5, 0.82, 1], [0, 1, 1, 0.45])
  const workspaceOpacity = useTransform(scrollYProgress, [0.28, 0.47, 0.76, 0.9, 1], [0, 1, 1, 0.5, 0])
  const workspaceY = useTransform(scrollYProgress, [0.28, 0.52, 0.78, 1], [85, 0, 0, -18])
  const workspaceScale = useTransform(scrollYProgress, [0.28, 0.52, 0.78, 1], [0.92, 1, 1, 0.98])
  const workspaceTitleOpacity = useTransform(scrollYProgress, [0, 0.38, 0.48, 0.78, 0.98], [0, 0, 1, 1, 0])
  const workspaceTitleY = useTransform(scrollYProgress, [0.38, 0.48, 0.78, 1], [18, 0, 0, -12])
  const supportingX = useTransform(scrollYProgress, [0.28, 0.56, 0.78, 1], [130, 0, 0, 60])
  const mobileY = useTransform(scrollYProgress, [0.28, 0.56, 0.78, 1], [125, 0, 0, 40])
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
              <motion.div className="hero-workspace-heading" style={{ opacity: workspaceTitleOpacity, y: workspaceTitleY }}><span>SELECTED PROJECT / GEMORAAI</span><strong>Ideas into interfaces.</strong><span>REACT · FLUTTER · ASP.NET CORE</span></motion.div>
              {homepage && available.has(homepage.id) && <div className="hero-workspace-browser hero-workspace-browser--primary"><div className="hero-workspace-chrome"><i /><i /><i /><span>GemoraAI / buyer web</span></div><img src={homepage.src} alt="" decoding="async" /></div>}
              {seller && available.has(seller.id) && <motion.div className="hero-workspace-browser hero-workspace-browser--seller" style={{ x: supportingX }}><div className="hero-workspace-chrome"><i /><i /><i /><span>Seller dashboard</span></div><img src={seller.src} alt="" decoding="async" /></motion.div>}
              {mobile && available.has(mobile.id) && <motion.div className="hero-workspace-mobile" style={{ y: mobileY }}><img src={mobile.src} alt="" decoding="async" /><span>FLUTTER / MOBILE</span></motion.div>}
              <span className="hero-workspace-coordinate">WEB / API / MOBILE</span>
            </motion.div>
          </>
        )}
        <HeroIntro sceneX={sceneEnabled ? copyX : undefined} sceneY={sceneEnabled ? copyY : undefined} sceneOpacity={sceneEnabled ? copyOpacity : undefined} headlineClip={sceneEnabled ? headlineClip : undefined} sceneInactive={sceneEnabled && copyInactive} />
        <HeroPortrait sceneX={sceneEnabled ? portraitX : undefined} sceneY={sceneEnabled ? portraitY : undefined} sceneScale={sceneEnabled ? portraitScale : undefined} sceneOpacity={sceneEnabled ? portraitOpacity : undefined} pointerEnabled={sceneEnabled} />
        <a className="scroll-cue" href="#about" aria-label="Scroll to about section"><span>Scroll to explore</span><ArrowDown size={16} aria-hidden="true" /></a>
        {sceneEnabled && <motion.span className="hero-handoff" style={{ scaleX: progressScale }} aria-hidden="true" />}
      </div>
    </section>
  )
}
