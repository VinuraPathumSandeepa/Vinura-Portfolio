import { useEffect, useRef, useState, type FocusEvent } from 'react'
import { ArrowDownRight } from 'lucide-react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { projects, type Project } from '../data/portfolio'
import { ProjectCard } from './ProjectCard'
import { SectionHeading } from './SectionHeading'

const cinematicQuery = '(min-width: 1101px) and (min-height: 850px) and (prefers-reduced-motion: no-preference)'

function useCinematicLayout() {
  const [enabled, setEnabled] = useState(() => window.matchMedia(cinematicQuery).matches)

  useEffect(() => {
    const media = window.matchMedia(cinematicQuery)
    const update = () => setEnabled(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return enabled
}

function ShowcasePanel({ project, index, progress, travel, viewportWidth, start, cinematic }: {
  project: Project
  index: number
  progress: MotionValue<number>
  travel: number
  viewportWidth: number
  start: number
  cinematic: boolean
}) {
  const reveal = useTransform(progress, (value) => {
    if (!cinematic || !travel || !viewportWidth) return 1
    const visibleWidth = viewportWidth - (start - travel * value)
    return Math.max(0, Math.min(1, visibleWidth / (viewportWidth * 0.43)))
  })
  const visualClip = useTransform(reveal, (value) => `inset(0 ${(1 - value) * 6}% 0 0)`)
  const contentY = useTransform(reveal, (value) => (1 - value) * 10)
  const contentOpacity = useTransform(reveal, (value) => 0.8 + value * 0.2)
  const numberOpacity = useTransform(reveal, (value) => 0.4 + value * 0.6)

  return (
    <div className="project-showcase-panel" data-project={project.id}>
      <motion.span className="project-showcase-number" style={{ opacity: cinematic ? numberOpacity : 1 }} aria-hidden="true">0{index + 1}</motion.span>
      <ProjectCard project={project} index={index} showcase visualClip={cinematic ? visualClip : undefined} contentY={cinematic ? contentY : undefined} contentOpacity={cinematic ? contentOpacity : undefined} />
    </div>
  )
}

export function ProjectShowcase() {
  const cinematic = useCinematicLayout()
  const sectionRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [travel, setTravel] = useState(0)
  const [scrollDistance, setScrollDistance] = useState(0)
  const [viewportWidth, setViewportWidth] = useState(0)
  const [panelStarts, setPanelStarts] = useState<number[]>([])
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel])

  useEffect(() => {
    if (!cinematic) return

    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return

    const measure = () => {
      const nextTravel = Math.max(0, track.scrollWidth - viewport.clientWidth)
      setTravel(nextTravel)
      setViewportWidth(viewport.clientWidth)
      const trackLeft = track.getBoundingClientRect().left
      setPanelStarts([...track.children].map((panel) => panel.getBoundingClientRect().left - trackLeft))
      // The journey is tied to the actual horizontal overflow, with a compact pace.
      setScrollDistance(Math.round(nextTravel * 0.78))
    }

    const observer = new ResizeObserver(measure)
    observer.observe(viewport)
    observer.observe(track)
    measure()
    return () => observer.disconnect()
  }, [cinematic])

  const revealFocusedPanel = (event: FocusEvent<HTMLDivElement>) => {
    if (!cinematic || !travel || !scrollDistance) return
    const panel = (event.target as HTMLElement).closest<HTMLElement>('.project-showcase-panel')
    const viewport = viewportRef.current
    const section = sectionRef.current
    if (!panel || !viewport || !section) return

    const panelBox = panel.getBoundingClientRect()
    const viewportBox = viewport.getBoundingClientRect()
    if (panelBox.left >= viewportBox.left + 16 && panelBox.right <= viewportBox.right - 16) return

    const centeredTravel = Math.max(0, Math.min(travel, panel.offsetLeft + panel.offsetWidth / 2 - viewport.clientWidth / 2))
    const sectionTop = section.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: sectionTop + (centeredTravel / travel) * scrollDistance, behavior: 'smooth' })
  }

  return (
    <section
      className={`section section--projects project-showcase${cinematic ? ' project-showcase--cinematic' : ''}`}
      id="projects"
      aria-labelledby="projects-title"
      ref={sectionRef}
      style={cinematic ? { height: `calc(100svh + ${scrollDistance}px)` } : undefined}
    >
      <div className="project-showcase-stage">
        <div className="section-shell project-showcase-shell">
          <div className="projects-heading">
            <SectionHeading number="03" label="Selected work" title="Ideas, made tangible." id="projects-title" description="Individual and group projects, with my role made clear in each." />
            <div className="projects-heading-aside">
              <span className="projects-count">SELECTED PROJECTS / {String(projects.length).padStart(2, '0')}</span>
              {cinematic && <a className="projects-skip" href="#education">Skip showcase <ArrowDownRight size={15} aria-hidden="true" /></a>}
            </div>
          </div>

          <div className="project-showcase-viewport" ref={viewportRef}>
            <motion.div className="projects-track" ref={trackRef} style={{ x: cinematic ? x : 0 }} onFocusCapture={revealFocusedPanel}>
              {projects.map((project, index) => <ShowcasePanel key={project.id} project={project} index={index} progress={scrollYProgress} travel={travel} viewportWidth={viewportWidth} start={panelStarts[index] ?? 0} cinematic={cinematic} />)}
            </motion.div>
          </div>

          <div className="project-showcase-footer" aria-hidden="true">
            <span>{cinematic ? 'SCROLL TO EXPLORE' : 'FOUR SELECTED PROJECTS'}</span>
            <div className="project-showcase-progress"><motion.span style={cinematic ? { scaleX: scrollYProgress } : undefined} /></div>
            <span>01 — 0{projects.length}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
