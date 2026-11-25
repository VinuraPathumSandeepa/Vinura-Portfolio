import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, ImageOff, Maximize2, X } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { projects, skylinkScreenshotGroups, skylinkScreenshots, skylinkWorkflow, type SkylinkScreenshot } from '../data/portfolio'
import { Reveal } from './Reveal'
import './SkylinkCaseStudy.css'

const project = projects.find((item) => item.id === 'airline-reservation')!

function useAvailableScreenshots() {
  const [available, setAvailable] = useState<Set<string>>(new Set())
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    let active = true
    Promise.all(skylinkScreenshots.map((screenshot) => new Promise<string | null>((resolve) => {
      const image = new Image()
      image.onload = () => resolve(screenshot.id)
      image.onerror = () => resolve(null)
      image.src = screenshot.src
    }))).then((results) => {
      if (!active) return
      setAvailable(new Set(results.filter((id): id is string => id !== null)))
      setChecked(true)
    })
    return () => { active = false }
  }, [])

  return { available, checked }
}

function BrowserShot({ screenshot, className = '' }: { screenshot: SkylinkScreenshot; className?: string }) {
  return (
    <div className={`skylink-browser ${className}`}>
      <div className="case-browser-bar" aria-hidden="true"><span className="case-browser-dots"><i /><i /><i /></span><span>SKYLINK / REAL APPLICATION</span></div>
      <img src={screenshot.src} alt={screenshot.alt} loading="lazy" decoding="async" style={{ objectPosition: screenshot.position }} />
    </div>
  )
}

export function SkylinkCaseStudy() {
  const { available, checked } = useAvailableScreenshots()
  const reduceMotion = useReducedMotion()
  const [stageIndex, setStageIndex] = useState(0)
  const [previewIndex, setPreviewIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const galleryImages = skylinkScreenshots.filter((screenshot) => available.has(screenshot.id))
  const stage = skylinkWorkflow[stageIndex]
  const stageImage = skylinkScreenshots.find((screenshot) => screenshot.id === stage.screenshotId)!
  const selectedImage = previewIndex === null ? null : galleryImages[previewIndex]

  useEffect(() => {
    document.title = 'Skylink Case Study | Vinura Pathum Sandeepa'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Explore Vinura Pathum Sandeepa’s Booking and Payment work in Skylink, a collaborative airline reservation project, through real application screenshots.')
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', 'Skylink Case Study | Vinura Pathum Sandeepa')
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', 'A documented Skylink booking and payment journey with verified group project contributions and genuine screenshots.')
  }, [])

  useEffect(() => {
    if (previewIndex !== null && !dialogRef.current?.open) dialogRef.current?.showModal()
  }, [previewIndex])

  function closePreview() {
    dialogRef.current?.close()
  }

  function changePreview(direction: number) {
    if (!galleryImages.length) return
    setPreviewIndex((current) => current === null ? 0 : (current + direction + galleryImages.length) % galleryImages.length)
  }

  function backToProjects(event: MouseEvent<HTMLAnchorElement>) {
    if (!document.referrer) return
    const previous = new URL(document.referrer)
    if (previous.origin === window.location.origin && previous.pathname === '/' && previous.search === '') {
      event.preventDefault()
      window.history.back()
    }
  }

  return (
    <div className="case-study skylink-case">
      <section className="case-hero section-shell" aria-labelledby="skylink-title">
        <Reveal className="case-hero-copy">
          <a className="case-back-link" href="/#projects" onClick={backToProjects}><ArrowLeft size={16} aria-hidden="true" /> Back to projects</a>
          <p className="section-kicker"><span>PROJECT CASE STUDY</span> / GROUP PROJECT</p>
          <h1 id="skylink-title">Sky<span>link.</span></h1>
          <p className="case-hero-subtitle">Airline Ticket Reservation System</p>
          <p className="case-hero-intro">A collaborative airline reservation application supporting flight discovery, passenger booking, payment submission, and traveler reservation management.</p>
          <div className="case-actions">{project.repositoryUrl && <a className="button button--primary" href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">View group repository <ArrowUpRight size={17} aria-hidden="true" /></a>}</div>
        </Reveal>
        <Reveal className="case-hero-media" delay={0.1}>
          {available.has('home') ? <BrowserShot screenshot={skylinkScreenshots[0]} /> : <div className="skylink-missing" role="img" aria-label="Skylink homepage screenshot unavailable"><ImageOff aria-hidden="true" /><span>Skylink application screenshot</span></div>}
          <p>{available.has('home') ? 'GENUINE SKYLINK APPLICATION SCREENSHOT' : 'SCREENSHOT UNAVAILABLE'}</p>
        </Reveal>
      </section>

      <div className="case-meta"><div className="section-shell case-meta-inner">
        <div><span>PROJECT TYPE</span><strong>Collaborative university project</strong></div>
        <div><span>MY FOCUS</span><strong>Booking & Payment modules</strong></div>
        <div><span>APPLICATION</span><strong>Java web experience</strong></div>
      </div></div>

      <section className="case-section section-shell" aria-labelledby="skylink-overview-title">
        <Reveal className="case-section-heading"><p className="section-kicker"><span>01</span> / OVERVIEW</p><h2 id="skylink-overview-title">A journey from search to submission.</h2><p>Skylink connects flight discovery, passenger information, booking review, and payment submission. The screenshots document a single fictional journey captured from the real application in an isolated demo environment.</p></Reveal>
        <div className="case-two-column">
          <Reveal className="case-editorial-card"><span className="case-card-label">THE GROUP PROJECT</span><h3>A connected traveler flow.</h3><p>The team built the wider airline reservation experience, including flight discovery and traveler reservation management. The discovery screens below provide context for the work I contributed.</p></Reveal>
          <Reveal className="case-editorial-card" delay={0.08}><span className="case-card-label">MY RESPONSIBILITY</span><h3>Booking and Payment.</h3><p>I developed the passenger booking flow, review and reservation operations, checkout interface, payment submission options, fare presentation, and post-submission status experience.</p></Reveal>
        </div>
      </section>

      <section className="case-section case-section--soft" aria-labelledby="skylink-stack-title"><div className="section-shell">
        <Reveal className="case-section-heading"><p className="section-kicker"><span>02</span> / TECHNOLOGY</p><h2 id="skylink-stack-title">The verified stack.</h2><p>Technologies documented by the Skylink project. H2 was used only for the isolated screenshot capture; the normal project configuration supports MySQL 8.</p></Reveal>
        <Reveal className="case-technology-list"><h3>Application technologies</h3><ul>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></Reveal>
      </div></section>

      <section className="case-section section-shell" aria-labelledby="skylink-workflow-title">
        <Reveal className="case-section-heading"><p className="section-kicker"><span>03</span> / BOOKING WORKFLOW</p><h2 id="skylink-workflow-title">Follow the documented journey.</h2><p>Select a stage to see the genuine application screen and how it fits into the booking and payment experience.</p></Reveal>
        <div className="skylink-workflow">
          <div className="skylink-stage-list" aria-label="Booking journey stages">{skylinkWorkflow.map((item, index) => (
            <button key={item.title} type="button" className={`skylink-stage-button${stageIndex === index ? ' skylink-stage-button--active' : ''}`} aria-pressed={stageIndex === index} onClick={() => setStageIndex(index)}><span>{String(index + 1).padStart(2, '0')}</span>{item.title}<ArrowRight size={16} aria-hidden="true" /></button>
          ))}</div>
          <motion.div key={stageIndex} className="skylink-stage-detail" initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} aria-live="polite">
            <div className="skylink-stage-copy"><span className="case-card-label">STAGE {String(stageIndex + 1).padStart(2, '0')} / 05</span><h3>{stage.title}</h3><p>{stage.description}</p>{stage.contribution && <div className="skylink-stage-contribution"><strong>MY CONTRIBUTION</strong><p>{stage.contribution}</p></div>}</div>
            {available.has(stageImage.id) ? <BrowserShot screenshot={stageImage} className="skylink-stage-shot" /> : <div className="skylink-missing" role="img" aria-label={`${stageImage.title} screenshot unavailable`}><ImageOff aria-hidden="true" /><span>{checked ? 'Screenshot unavailable' : 'Loading screenshot…'}</span></div>}
            <p className="skylink-stage-caption">{stageImage.caption}</p>
          </motion.div>
        </div>
      </section>

      <section className="case-section case-section--contribution" aria-labelledby="skylink-contribution-title"><div className="section-shell case-contribution-grid">
        <Reveal><p className="section-kicker"><span>04</span> / MY ROLE</p><h2 id="skylink-contribution-title">Two modules, one continuous flow.</h2><p>These were my verified responsibilities within the group project.</p></Reveal>
        <Reveal className="case-contribution-list" delay={0.1}><ol><li><span>01</span>Passenger booking forms and multi-step review</li><li><span>02</span>Selected extras, fare, and reservation operations</li><li><span>03</span>Payment checkout and submission options</li><li><span>04</span>Post-submission pending status experience</li></ol></Reveal>
      </div></section>

      <section className="case-section section-shell" aria-labelledby="skylink-demo-title">
        <Reveal className="case-section-heading"><p className="section-kicker"><span>05</span> / LOCAL DEMO DATA</p><h2 id="skylink-demo-title">The example fare, in context.</h2><p>This is fictional demonstration data from a disposable local H2 database. A fictional eZ Cash payment was submitted; no real transaction, finance approval, or ticket issuance occurred.</p></Reveal>
        <Reveal className="skylink-fare"><div><span>ROUTE / FLIGHT</span><strong>Colombo → Singapore <small>SL101</small></strong></div><div><span>FLIGHT FARE</span><strong>LKR 42,500</strong></div><div><span>SELECTED EXTRAS</span><strong>LKR 6,000</strong></div><div><span>BOOKING SUBTOTAL</span><strong>LKR 48,500</strong></div><div><span>PROCESSING FEE</span><strong>LKR 45</strong></div><div className="skylink-fare-total"><span>SUBMITTED AMOUNT</span><strong>LKR 48,545</strong></div><p>Payment: <strong>PENDING</strong> · Booking: <strong>PENDING</strong> · Finance review outstanding</p></Reveal>
      </section>

      <section className="case-section case-section--soft" aria-labelledby="skylink-gallery-title"><div className="section-shell">
        <Reveal className="case-section-heading"><p className="section-kicker"><span>06</span> / APPLICATION GALLERY</p><h2 id="skylink-gallery-title">Inside Skylink.</h2><p>Seven real application captures, grouped by discovery, my Booking module, and my Payment module. Select any image to inspect its full original screenshot.</p></Reveal>
        <p className="skylink-evidence-note">Screenshots were captured from the real application using isolated fictional demo data. Payment submissions remain pending finance approval.</p>
        {galleryImages.length > 0 ? <div className="case-gallery-groups">{skylinkScreenshotGroups.map((group, groupIndex) => {
          const images = galleryImages.filter((screenshot) => screenshot.group === group.id)
          if (!images.length) return null
          return <section className="case-gallery-group" aria-labelledby={`skylink-gallery-${group.id}`} key={group.id}>
            <Reveal className="case-gallery-group-heading"><span>0{groupIndex + 1} / 03</span><div><h3 id={`skylink-gallery-${group.id}`}>{group.title}</h3><p>{group.description}</p></div><span>{String(images.length).padStart(2, '0')} IMAGES</span></Reveal>
            <div className={`case-gallery skylink-gallery skylink-gallery--${group.id}`}>{images.map((screenshot) => <Reveal className="case-gallery-item" key={screenshot.id}><figure>
              <button className="case-gallery-trigger" type="button" aria-label={`Enlarge ${screenshot.title} screenshot`} onClick={(event) => { triggerRef.current = event.currentTarget; setPreviewIndex(galleryImages.indexOf(screenshot)) }}><BrowserShot screenshot={screenshot} /><span className="case-gallery-zoom"><Maximize2 size={15} aria-hidden="true" /> Enlarge</span></button>
              <figcaption><strong>{screenshot.title}</strong><span>{screenshot.caption}</span></figcaption>
            </figure></Reveal>)}</div>
          </section>
        })}</div> : <div className="case-gallery-empty"><ImageOff size={26} aria-hidden="true" /><p>{checked ? 'Project screenshots are unavailable.' : 'Checking project screenshots…'}</p></div>}
      </div></section>

      <dialog className="case-lightbox skylink-lightbox" ref={dialogRef} aria-labelledby="skylink-lightbox-title" onClose={() => { setPreviewIndex(null); triggerRef.current?.focus() }} onClick={(event) => { if (event.target === event.currentTarget) closePreview() }} onKeyDown={(event) => { if (event.key === 'ArrowLeft') { event.preventDefault(); changePreview(-1) } else if (event.key === 'ArrowRight') { event.preventDefault(); changePreview(1) } }}>
        {selectedImage && <div className="case-lightbox-content"><div className="case-lightbox-header"><div><span>SKYLINK / IMAGE {String(previewIndex! + 1).padStart(2, '0')} OF {String(galleryImages.length).padStart(2, '0')}</span><h2 id="skylink-lightbox-title">{selectedImage.title}</h2></div><button type="button" className="case-lightbox-close" onClick={closePreview} aria-label="Close image preview"><X size={22} aria-hidden="true" /></button></div>
          <div className="skylink-lightbox-image"><img src={selectedImage.original} alt={selectedImage.alt} /></div><div className="skylink-lightbox-footer"><p>{selectedImage.caption}</p><div><button type="button" onClick={() => changePreview(-1)} aria-label="Previous screenshot"><ChevronLeft size={20} aria-hidden="true" /></button><button type="button" onClick={() => changePreview(1)} aria-label="Next screenshot"><ChevronRight size={20} aria-hidden="true" /></button></div></div>
        </div>}
      </dialog>

      <section className="case-section case-section--end" aria-labelledby="skylink-end-title"><div className="section-shell case-end-inner"><Reveal><p className="section-kicker"><span>EXPLORE SKYLINK</span></p><h2 id="skylink-end-title">See the group project.</h2><p>Read the source repository or return to the selected projects showcase.</p><div className="case-actions">{project.repositoryUrl && <a className="button button--primary" href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">Group repository <ArrowUpRight size={17} aria-hidden="true" /></a>}</div></Reveal><a className="case-back-link" href="/#projects" onClick={backToProjects}><ArrowLeft size={16} aria-hidden="true" /> Back to projects</a></div></section>
    </div>
  )
}
