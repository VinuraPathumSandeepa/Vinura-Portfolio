import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Download, ImageOff, Layers3, Maximize2, ScanSearch, ShieldCheck, Smartphone, X } from 'lucide-react'
import { gemoraScreenshotGroups, gemoraScreenshots, projects, type GemoraScreenshot } from '../data/portfolio'
import { ProjectVisual } from './ProjectVisual'
import { Reveal } from './Reveal'
import { useGemoraScreenshots } from './useGemoraScreenshots'

const project = projects.find((item) => item.id === 'gemora-ai')!

function ProjectActions({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`case-actions ${compact ? 'case-actions--compact' : ''}`}>
      {project.demoUrl && <a className="button button--primary" href={project.demoUrl} target="_blank" rel="noopener noreferrer">Visit live website <ArrowUpRight size={17} aria-hidden="true" /></a>}
      {project.apkUrl && <a className="button case-button--outline" href={project.apkUrl} download="GemoraAI.apk">Download Android APK <Download size={17} aria-hidden="true" /></a>}
      {project.repositoryUrl && <a className="button case-button--text" href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">GitHub repository <ArrowUpRight size={17} aria-hidden="true" /></a>}
    </div>
  )
}

function ScreenshotFrame({ id, available }: { id: string; available: Set<string> }) {
  const screenshot = gemoraScreenshots.find((item) => item.id === id)
  if (!screenshot) return null
  const mobile = screenshot.device === 'mobile'

  return (
    <div className={`case-screenshot ${mobile ? 'case-screenshot--mobile' : ''}`}>
      {available.has(id) ? (
        mobile ? <img src={screenshot.src} alt={screenshot.alt} loading="lazy" /> : (
          <div className="case-browser-window">
            <div className="case-browser-bar" aria-hidden="true"><span className="case-browser-dots"><i /><i /><i /></span><span>GEMORAAI / WEB APPLICATION</span></div>
            <img src={screenshot.src} alt={screenshot.alt} loading="lazy" />
          </div>
        )
      ) : (
        <div className="case-screenshot-placeholder" role="img" aria-label={`${screenshot.title} screenshot is not yet available`}>
          <ImageOff size={26} strokeWidth={1.4} aria-hidden="true" />
          <span>{mobile ? 'Mobile app preview' : 'Project screenshot'}</span>
          <small>Genuine project image coming soon</small>
        </div>
      )}
    </div>
  )
}

export function GemoraCaseStudy() {
  const { available, checked } = useGemoraScreenshots()
  const galleryImages = gemoraScreenshots.filter((screenshot) => available.has(screenshot.id))
  const webScreenshot = available.has('homepage') ? 'homepage' : 'web-buyer-marketplace'
  const [selectedScreenshot, setSelectedScreenshot] = useState<GemoraScreenshot | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (selectedScreenshot && !dialogRef.current?.open) dialogRef.current?.showModal()
  }, [selectedScreenshot])

  function closePreview() {
    dialogRef.current?.close()
  }

  useEffect(() => {
    document.title = 'GemoraAI Case Study | Vinura Pathum Sandeepa'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'A case study of GemoraAI, a group-built AI-assisted gemstone marketplace, with Vinura Pathum Sandeepa’s seller-facing React and Flutter contributions.')
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', 'GemoraAI Case Study | Vinura Pathum Sandeepa')
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', 'Explore the GemoraAI group project, its verified technologies, and Vinura Pathum Sandeepa’s seller-facing contributions.')
  }, [])

  return (
    <div className="case-study">
      <section className="case-hero section-shell" aria-labelledby="case-title">
        <Reveal className="case-hero-copy">
          <a className="case-back-link" href="/#projects"><ArrowLeft size={16} aria-hidden="true" /> Back to projects</a>
          <p className="section-kicker"><span>FEATURED CASE STUDY</span> / GROUP PROJECT</p>
          <h1 id="case-title">Gemora<span>AI.</span></h1>
          <p className="case-hero-subtitle">AI-Assisted Gemstone Marketplace</p>
          <p className="case-hero-intro">A cross-platform academic project bringing gemstone listings, supporting documents, review workflows, and marketplace experiences together across web and mobile.</p>
          <ProjectActions />
        </Reveal>
        <Reveal className="case-hero-media" delay={0.1}>
          {available.has('homepage') ? <ScreenshotFrame id="homepage" available={available} /> : <ProjectVisual variant="gemora" />}
          <p>{available.has('homepage') ? 'GEMORAAI WEB APPLICATION' : 'ILLUSTRATIVE INTERFACE CONCEPT'}</p>
        </Reveal>
      </section>

      <div className="case-meta">
        <div className="section-shell case-meta-inner">
          <div><span>PROJECT TYPE</span><strong>Group academic project</strong></div>
          <div><span>PLATFORMS</span><strong>Web & Android</strong></div>
          <div><span>MY FOCUS</span><strong>Seller features & testing</strong></div>
        </div>
      </div>

      <section className="case-section section-shell" aria-labelledby="case-context-title">
        <Reveal className="case-section-heading"><p className="section-kicker"><span>01</span> / CONTEXT</p><h2 id="case-context-title">The project at a glance.</h2></Reveal>
        <div className="case-two-column">
          <Reveal className="case-editorial-card"><span className="case-card-label">THE PROBLEM</span><h3>More than a listing.</h3><p>A gemstone marketplace needs space for seller details, images, certificates, and review steps. Those pieces must remain understandable to buyers and the people reviewing potential issues.</p></Reveal>
          <Reveal className="case-editorial-card" delay={0.08}><span className="case-card-label">THE SOLUTION</span><h3>One connected workflow.</h3><p>GemoraAI brings seller listings, authenticated dashboards, REST API integration, and AI-assisted flags into a cross-platform marketplace. Shipping and export compliance workflows are part of the wider team project.</p></Reveal>
        </div>
      </section>

      <section className="case-section case-section--soft" aria-labelledby="case-web-title">
        <div className="section-shell case-showcase-grid">
          <Reveal className="case-showcase-copy"><p className="section-kicker"><span>02</span> / WEB APPLICATION</p><h2 id="case-web-title">A marketplace built for the web.</h2><p>The React application presents the marketplace and seller-facing flows, with REST API integration connecting the interface to the wider platform. My work focused on seller-facing features and listing-related workflows.</p><span className="case-tech-note">REACT · REST API INTEGRATION</span></Reveal>
          <Reveal className="case-showcase-media" delay={0.1}><ScreenshotFrame id={webScreenshot} available={available} /><span>{available.has(webScreenshot) ? 'REAL WEB APPLICATION SCREENSHOT' : 'WEB APPLICATION SCREENSHOT PENDING'}</span></Reveal>
        </div>
      </section>

      <section className="case-section section-shell" aria-labelledby="case-mobile-title">
        <div className="case-showcase-grid case-showcase-grid--mobile">
          <Reveal className="case-showcase-media case-showcase-media--phone"><ScreenshotFrame id="mobile-marketplace" available={available} /><span>{available.has('mobile-marketplace') ? 'REAL FLUTTER APPLICATION SCREENSHOT' : 'FLUTTER APPLICATION SCREENSHOT PENDING'}</span></Reveal>
          <Reveal className="case-showcase-copy" delay={0.1}><p className="section-kicker"><span>03</span> / MOBILE APPLICATION</p><h2 id="case-mobile-title">Seller workflows on Android.</h2><p>The Flutter app extends the marketplace to mobile. I contributed seller-facing Flutter features and gemstone listing-related flows as part of the group’s cross-platform work.</p><span className="case-tech-note">FLUTTER · ANDROID</span></Reveal>
        </div>
      </section>

      <section className="case-section case-section--soft" aria-labelledby="case-architecture-title">
        <div className="section-shell">
          <Reveal className="case-section-heading"><p className="section-kicker"><span>04</span> / TECHNOLOGY</p><h2 id="case-architecture-title">A connected stack.</h2><p>The high-level technology map reflects the verified web, mobile, API, database, and AI tools used by the group.</p></Reveal>
          <Reveal className="case-technology-list"><h3>Main technologies</h3><ul>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></Reveal>
          <Reveal className="case-architecture">
            <div className="case-architecture-node"><span>INTERFACES</span><strong>React <small>web</small></strong><strong>Flutter <small>Android</small></strong></div>
            <ArrowRight className="case-architecture-arrow" size={22} aria-hidden="true" />
            <div className="case-architecture-node"><span>BACKEND</span><strong>ASP.NET Core <small>C#</small></strong><small>REST APIs</small></div>
            <ArrowRight className="case-architecture-arrow" size={22} aria-hidden="true" />
            <div className="case-architecture-node"><span>DATA</span><strong>PostgreSQL</strong></div>
          </Reveal>
        </div>
      </section>

      <section className="case-section case-section--ai" aria-labelledby="case-ai-title">
        <div className="section-shell case-ai-grid">
          <Reveal><p className="section-kicker"><span>05</span> / HUMAN-IN-THE-LOOP REVIEW</p><h2 id="case-ai-title">AI assists. Gemologists decide.</h2><p>Inside the Gemologist Dashboard’s Verification Details page, the Gemora Verification Agent presents advisory findings, visual observations and risk flags. The human gemologist makes the final review decision. The AI output does not provide official gemstone certification.</p></Reveal>
          <Reveal className="case-ai-flow" delay={0.1}><div><ScanSearch size={24} aria-hidden="true" /><span>GEMINI API</span><strong>AI-assisted issue flags</strong></div><ArrowRight size={20} aria-hidden="true" /><div><ShieldCheck size={24} aria-hidden="true" /><span>HUMAN REVIEW</span><strong>Gemologist decision</strong></div></Reveal>
        </div>
      </section>

      <section className="case-section section-shell" aria-labelledby="case-features-title">
        <Reveal className="case-section-heading"><p className="section-kicker"><span>06</span> / PLATFORM CAPABILITIES</p><h2 id="case-features-title">What the team built.</h2><p>These describe the broader GemoraAI platform. My own work is listed separately below.</p></Reveal>
        <div className="case-feature-grid">
          <Reveal className="case-feature"><Layers3 size={24} aria-hidden="true" /><h3>Marketplace listings</h3><p>Seller gemstone listings with image and certificate uploads.</p></Reveal>
          <Reveal className="case-feature" delay={0.06}><ShieldCheck size={24} aria-hidden="true" /><h3>Authenticated workflows</h3><p>Dashboards and REST API integration for marketplace activity.</p></Reveal>
          <Reveal className="case-feature" delay={0.12}><ScanSearch size={24} aria-hidden="true" /><h3>AI-assisted review</h3><p>Potential issues are flagged for review by a human gemologist.</p></Reveal>
          <Reveal className="case-feature" delay={0.18}><Smartphone size={24} aria-hidden="true" /><h3>Cross-platform reach</h3><p>Web and Android experiences, plus shipping and export compliance workflows.</p></Reveal>
        </div>
      </section>

      <section className="case-section case-section--contribution" aria-labelledby="case-contribution-title">
        <div className="section-shell case-contribution-grid">
          <Reveal><p className="section-kicker"><span>07</span> / MY ROLE</p><h2 id="case-contribution-title">My personal contributions.</h2><p>This was a group project. My responsibility was concentrated on seller-facing experiences and testing.</p></Reveal>
          <Reveal className="case-contribution-list" delay={0.1}><ol><li><span>01</span>Seller-facing features in React and Flutter</li><li><span>02</span>Gemstone listing-related workflows</li><li><span>03</span>Software testing</li></ol></Reveal>
        </div>
      </section>

      <section className="case-section section-shell" aria-labelledby="case-gallery-title">
        <Reveal className="case-section-heading"><p className="section-kicker"><span>08</span> / SCREENSHOT GALLERY</p><h2 id="case-gallery-title">Inside the project.</h2><p>Explore real web and Android screens from the group-built platform. My personal contributions are identified in the section above.</p></Reveal>
        {galleryImages.length > 0 ? (
          <div className="case-gallery-groups">{gemoraScreenshotGroups.map((group, groupIndex) => {
            const images = galleryImages.filter((screenshot) => screenshot.group === group.id)
            if (images.length === 0) return null
            return (
              <section className="case-gallery-group" aria-labelledby={`case-gallery-${group.id}`} key={group.id}>
                <Reveal className="case-gallery-group-heading"><span>0{groupIndex + 1} / 04</span><div><h3 id={`case-gallery-${group.id}`}>{group.title}</h3><p>{group.description}</p></div><span>{String(images.length).padStart(2, '0')} IMAGES</span></Reveal>
                <div className={`case-gallery ${group.id === 'mobile' ? 'case-gallery--mobile' : ''}`}>
                  {images.map((screenshot) => (
                    <Reveal className="case-gallery-item" key={screenshot.id}>
                      <figure>
                        <button className="case-gallery-trigger" type="button" aria-label={`Enlarge ${screenshot.title} screenshot`} onClick={(event) => { triggerRef.current = event.currentTarget; setSelectedScreenshot(screenshot) }}>
                          <ScreenshotFrame id={screenshot.id} available={available} />
                          <span className="case-gallery-zoom"><Maximize2 size={15} aria-hidden="true" /> Enlarge</span>
                        </button>
                        <figcaption><strong>{screenshot.title}</strong><span>{screenshot.caption}</span></figcaption>
                      </figure>
                    </Reveal>
                  ))}
                </div>
              </section>
            )
          })}</div>
        ) : (
          <Reveal className="case-gallery-empty"><ImageOff size={26} aria-hidden="true" /><p>{checked ? 'Project screenshots are being prepared.' : 'Checking project screenshots…'}</p></Reveal>
        )}
      </section>

      <dialog className="case-lightbox" ref={dialogRef} aria-labelledby="case-lightbox-title" onClose={() => { setSelectedScreenshot(null); triggerRef.current?.focus() }} onClick={(event) => { if (event.target === event.currentTarget) closePreview() }}>
        {selectedScreenshot && (
          <div className="case-lightbox-content">
            <div className="case-lightbox-header"><div><span>GEMORAAI / PROJECT SCREENSHOT</span><h2 id="case-lightbox-title">{selectedScreenshot.title}</h2></div><button type="button" className="case-lightbox-close" onClick={closePreview} aria-label="Close image preview"><X size={22} aria-hidden="true" /></button></div>
            <img src={selectedScreenshot.src} alt={selectedScreenshot.alt} />
            <p>{selectedScreenshot.caption}</p>
          </div>
        )}
      </dialog>

      <section className="case-section case-section--end" aria-labelledby="case-end-title">
        <div className="section-shell case-end-inner"><Reveal><p className="section-kicker"><span>EXPLORE GEMORAAI</span></p><h2 id="case-end-title">See the project in action.</h2><p>Explore the deployed web application or download the existing Android APK.</p><ProjectActions compact /></Reveal><a className="case-back-link" href="/#projects"><ArrowLeft size={16} aria-hidden="true" /> Back to projects</a></div>
      </section>
    </div>
  )
}
