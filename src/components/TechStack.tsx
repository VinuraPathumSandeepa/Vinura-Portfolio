import { useEffect, useRef, useState, type ComponentType, type CSSProperties, type PointerEvent } from 'react'
import { Braces, Workflow } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { FaCss3Alt, FaJava } from 'react-icons/fa'
import { SiDotnet, SiFlutter, SiGit, SiGithub, SiGooglegemini, SiHibernate, SiHtml5, SiJavascript, SiMysql, SiPostgresql, SiReact, SiSpringboot, SiTypescript } from 'react-icons/si'
import { TbBrandCSharp } from 'react-icons/tb'
import { skillGroups, type Technology, type TechnologyIconId } from '../data/portfolio'
import { motionEase } from '../motion'
import { Reveal } from './Reveal'

const technologyIcons = {
  react: SiReact,
  typescript: SiTypescript,
  javascript: SiJavascript,
  html5: SiHtml5,
  css3: FaCss3Alt,
  java: FaJava,
  springboot: SiSpringboot,
  dotnet: SiDotnet,
  rest: Braces,
  csharp: TbBrandCSharp,
  hibernate: SiHibernate,
  gemini: SiGooglegemini,
  integration: Workflow,
  flutter: SiFlutter,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  git: SiGit,
  github: SiGithub,
} satisfies Record<TechnologyIconId, ComponentType<{ size?: number; 'aria-hidden'?: boolean }>>

const technologies = skillGroups.flatMap((group) =>
  group.technologies.map((technology) => ({ technology, category: group.title })),
)

// Two grid columns per tile allow each shorter row to step inward by half a tile.
const wallSlots = [6, 5, 4, 3].flatMap((count, row) =>
  Array.from({ length: count }, (_, position) => ({ row: row + 1, column: row + position * 2 + 1 })),
)

function wallSlotAt(index: number) {
  if (index < wallSlots.length) return wallSlots[index]
  const extra = index - wallSlots.length
  return { row: 5 + Math.floor(extra / 6), column: 1 + (extra % 6) * 2 }
}

const wallVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.08, staggerChildren: 0.035 } },
}

const tileVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.52, ease: motionEase } },
}

const stageMotionQuery = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)'
const stageDataQuery = '(prefers-reduced-data: reduce)'

function stageMotionAllowed() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  return window.matchMedia(stageMotionQuery).matches && !window.matchMedia(stageDataQuery).matches && !connection?.saveData
}

function TechnologyCard({ technology, category, slot, reduceMotion }: {
  technology: Technology
  category: string
  slot: { row: number; column: number }
  reduceMotion: boolean
}) {
  const Icon = technologyIcons[technology.icon]

  return (
    <motion.li
      className="technology-card"
      data-icon={technology.icon}
      style={{
        '--technology-color': technology.color,
        '--tile-column': `${slot.column} / span 2`,
        '--tile-row': slot.row,
      } as CSSProperties}
      variants={reduceMotion ? undefined : tileVariants}
      whileHover={reduceMotion ? undefined : { y: -4, scale: 1.015, transition: { duration: 0.22, ease: motionEase } }}
    >
      <span className="technology-icon" aria-hidden="true"><Icon size={32} aria-hidden="true" /></span>
      <span className="technology-name">{technology.name}</span>
      <span className="technology-category">{category}</span>
    </motion.li>
  )
}

export function TechStack() {
  const reduceMotion = Boolean(useReducedMotion())
  const stageRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [canAnimate, setCanAnimate] = useState(stageMotionAllowed)
  const [stageVisible, setStageVisible] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)

  useEffect(() => {
    const motion = window.matchMedia(stageMotionQuery)
    const reducedData = window.matchMedia(stageDataQuery)
    const update = () => setCanAnimate(stageMotionAllowed())
    motion.addEventListener('change', update)
    reducedData.addEventListener('change', update)
    return () => {
      motion.removeEventListener('change', update)
      reducedData.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => {
      setStageVisible(entry.isIntersecting)
      if (entry.isIntersecting) setHasEntered(true)
    }, { threshold: 0.05 })
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !canAnimate || videoFailed) return
    const syncPlayback = () => {
      if (!stageVisible || document.hidden) video.pause()
      else void video.play().catch(() => { /* The matching poster remains visible if autoplay is blocked. */ })
    }
    document.addEventListener('visibilitychange', syncPlayback)
    syncPlayback()
    return () => {
      document.removeEventListener('visibilitychange', syncPlayback)
      video.pause()
    }
  }, [canAnimate, stageVisible, hasEntered, videoFailed])

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--spot-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`)
    event.currentTarget.style.setProperty('--spot-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`)
    event.currentTarget.style.setProperty('--spot-opacity', '1')
  }

  return (
    <>
      <Reveal className="tech-heading" variant="heading">
        <p className="tech-eyebrow"><span>02</span> / TOOLS &amp; TECHNOLOGIES</p>
        <h2 id="skills-title">TECH <em>STACK</em></h2>
        <p className="tech-intro">The languages, frameworks, platforms, and tools I use in project work.</p>
      </Reveal>

      <div ref={stageRef} className="tech-stage" onPointerMove={handlePointerMove} onPointerLeave={(event) => event.currentTarget.style.setProperty('--spot-opacity', '0')}>
        <div className="tech-stage-media" aria-hidden="true">
          {canAnimate && hasEntered && !videoFailed && (
            <video
              ref={videoRef}
              className="tech-stage-video"
              muted
              loop
              playsInline
              preload="none"
              poster="/images/techstack-atmosphere-poster.webp"
              disablePictureInPicture
              onError={() => setVideoFailed(true)}
            >
              <source src="/media/techstack-atmosphere.webm" type="video/webm" />
              <source src="/media/techstack-atmosphere.mp4" type="video/mp4" />
            </video>
          )}
        </div>
        <div className="tech-stage-spotlight" aria-hidden="true" />
        <div className="tech-stage-meta" aria-hidden="true"><span>TECHNOLOGY INDEX</span><span>{technologies.length} TECHNOLOGIES · {String(skillGroups.length).padStart(2, '0')} DISCIPLINES</span></div>
        <motion.ul
          className="technology-wall"
          aria-label="Technologies grouped by discipline"
          initial={reduceMotion ? false : 'hidden'}
          whileInView={reduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.16 }}
          variants={reduceMotion ? undefined : wallVariants}
        >
          {technologies.map(({ technology, category }, index) => (
            <TechnologyCard technology={technology} category={category} slot={wallSlotAt(index)} reduceMotion={reduceMotion} key={technology.name} />
          ))}
        </motion.ul>
        <div className="tech-stage-baseline" aria-hidden="true"><span>FRONTEND / BACKEND / MOBILE / DATA / TOOLS</span><span>SLIIT · SOFTWARE ENGINEERING</span></div>
      </div>
    </>
  )
}
