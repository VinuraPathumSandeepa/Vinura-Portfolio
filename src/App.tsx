import { useEffect } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, BriefcaseBusiness, Code2, Download, Mail } from 'lucide-react'
import { HeroPortrait } from './components/HeroPortrait'
import { GemoraCaseStudy } from './components/GemoraCaseStudy'
import { Navbar } from './components/Navbar'
import { ProjectCard } from './components/ProjectCard'
import { Reveal } from './components/Reveal'
import { SectionHeading } from './components/SectionHeading'
import { projects, resumeUrl, skillGroups, socialLinks, type SocialLink } from './data/portfolio'
import './App.css'

const socialIcons = {
  github: Code2,
  linkedin: BriefcaseBusiness,
  portfolio: ArrowUpRight,
} as const

const currentYear = new Date().getFullYear()
const hasSocialLinks = socialLinks.some((social) => Boolean(social.url))
const isGemoraCaseStudy = new URLSearchParams(window.location.search).get('case-study') === 'gemora-ai'

function Footer({ fromCaseStudy = false }: { fromCaseStudy?: boolean }) {
  const topHref = fromCaseStudy ? '/#top' : '#top'
  return <footer className="footer"><div className="section-shell footer-inner"><a className="footer-brand" href={topHref} aria-label="Vinura Pathum Sandeepa, back to top">VP<span>.</span></a><p>© {currentYear} Vinura Pathum Sandeepa</p><a href={topHref} className="back-to-top">Back to top ↑</a></div></footer>
}

function SocialItem({ social }: { social: SocialLink }) {
  if (!social.url) return null

  const Icon = socialIcons[social.id]

  return (
    <a className="social-link" href={social.url} target="_blank" rel="noopener noreferrer">
      <Icon size={20} aria-hidden="true" />
      <span>{social.label}</span>
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  )
}

function App() {
  useEffect(() => {
    if (isGemoraCaseStudy) return
    // On a fresh deep link, the browser sees the hash before React has mounted its target.
    const frame = window.requestAnimationFrame(() => {
      const id = window.location.hash.slice(1)
      if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [])

  if (isGemoraCaseStudy) {
    return (
      <div className="site-shell" id="top">
        <a className="skip-link" href="#main">Skip to content</a>
        <Navbar fromCaseStudy />
        <main id="main"><GemoraCaseStudy /></main>
        <Footer fromCaseStudy />
      </div>
    )
  }

  return (
    <div className="site-shell" id="top">
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />

      <main id="main">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <Reveal>
              <p className="eyebrow"><span className="eyebrow-line" /> Undergraduate Software Engineer</p>
              <h1 id="hero-title">Practical software, from backend to <em>interface.</em></h1>
              <p className="hero-intro">
                I’m Vinura Pathum Sandeepa, an Undergraduate Software Engineer pursuing my degree
                at the Sri Lanka Institute of Information Technology (SLIIT). My project work spans backend
                development, REST APIs, databases, and full-stack applications.
              </p>
              <div className="hero-actions">
                <a className="button button--primary" href="#projects">Explore my work <ArrowUpRight size={18} aria-hidden="true" /></a>
                <a className="button button--text" href="mailto:vpsvinura@gmail.com">Get in touch <ArrowRight size={18} aria-hidden="true" /></a>
              </div>
            </Reveal>
          </div>

          <Reveal className="hero-art" delay={0.12}>
            <HeroPortrait />
          </Reveal>

          <a className="scroll-cue" href="#about" aria-label="Scroll to about section"><span>Scroll to explore</span><ArrowDown size={16} aria-hidden="true" /></a>
        </section>

        <section className="section section--about" id="about" aria-labelledby="about-title">
          <div className="section-shell about-grid">
            <Reveal><SectionHeading number="01" label="About me" title="Curiosity meets craft." id="about-title" /></Reveal>
            <Reveal className="about-content" delay={0.1}>
              <p className="about-lead">I enjoy turning ideas into useful, considered software.</p>
              <p>I’m pursuing a BSc (Hons) in Information Technology (Software Engineering) at the Sri Lanka Institute of Information Technology (SLIIT). My project experience covers backend development, REST APIs, databases, and full-stack applications.</p>
              <p>Across individual and group projects, I’ve worked with Java, Spring Boot, React, Flutter, and ASP.NET Core. I’m interested in scalable systems and AI-assisted software.</p>
              <a className="inline-link" href="#skills">See what I work with <ArrowUpRight size={17} aria-hidden="true" /></a>
            </Reveal>
          </div>
        </section>

        <section className="section section--skills" id="skills" aria-labelledby="skills-title">
          <div className="section-shell">
            <Reveal><SectionHeading number="02" label="Technical skills" title="Tools of the trade." id="skills-title" description="A growing toolkit for building across the stack." /></Reveal>
            <div className="skills-grid">
              {skillGroups.map((group, index) => (
                <Reveal className="skill-card" delay={index * 0.07} key={group.title}>
                  <div className="skill-card-top"><span className="skill-index">0{index + 1}</span><span className="skill-plus" aria-hidden="true">↗</span></div>
                  <h3>{group.title}</h3>
                  <ul aria-label={`${group.title} skills`}>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--projects" id="projects" aria-labelledby="projects-title">
          <div className="section-shell">
            <Reveal><div className="projects-heading"><SectionHeading number="03" label="Selected work" title="Ideas, made tangible." id="projects-title" description="Individual and group projects, with my role made clear in each." /><span className="projects-count">SELECTED PROJECTS / {String(projects.length).padStart(2, '0')}</span></div></Reveal>
            <div className="projects-list">{projects.map((project, index) => <Reveal className={project.wide ? 'project-grid-item--wide' : undefined} key={project.id} delay={0.06}><ProjectCard project={project} index={index} /></Reveal>)}</div>
          </div>
        </section>

        <section className="section section--education" id="education" aria-labelledby="education-title">
          <div className="section-shell education-grid">
            <Reveal><SectionHeading number="04" label="Education" title="Where I’m growing." id="education-title" /></Reveal>
            <Reveal className="education-card" delay={0.1}>
              <div className="education-mark" aria-hidden="true">S</div>
              <div className="education-copy">
                <span className="education-kicker">UNDERGRADUATE STUDIES</span>
                <h3>BSc (Hons) in Information Technology (Software Engineering)</h3>
                <p>Sri Lanka Institute of Information Technology (SLIIT)</p>
                <div className="education-footer"><strong>SLIIT</strong><span>Undergraduate</span></div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section section--contact" id="contact" aria-labelledby="contact-title">
          <div className="section-shell contact-grid">
            <Reveal>
              <p className="section-kicker"><span>05</span> / LET’S CONNECT</p>
              <h2 id="contact-title">Have something <em>in mind?</em></h2>
              <p className="contact-intro">I’d be glad to hear about opportunities, ideas, or a project worth discussing.</p>
              <a className="contact-email" href="mailto:vpsvinura@gmail.com"><Mail size={22} aria-hidden="true" /> vpsvinura@gmail.com <ArrowUpRight size={20} aria-hidden="true" /></a>
            </Reveal>
            <Reveal className="contact-aside" delay={0.12}>
              {hasSocialLinks && <><p className="aside-label">FIND ME ONLINE</p><div className="social-list">{socialLinks.map((social) => <SocialItem social={social} key={social.id} />)}</div></>}
              <div className={`resume-block ${hasSocialLinks ? '' : 'resume-block--solo'}`}>
                <p className="aside-label">RÉSUMÉ</p>
                {resumeUrl ? <a className="resume-button resume-button--active" href={resumeUrl} download="Vinura_Pathum_Sandeepa_Resume.pdf"><Download size={18} aria-hidden="true" /> Download résumé</a> : <button className="resume-button" type="button" disabled title="Add your resume PDF to enable this download"><Download size={18} aria-hidden="true" /> Download résumé</button>}
                {!resumeUrl && <p>Available once a résumé PDF is added.</p>}
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
