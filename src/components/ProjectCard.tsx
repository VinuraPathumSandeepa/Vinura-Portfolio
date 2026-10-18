import { ArrowRight, ArrowUpRight, Download } from 'lucide-react'
import type { Project } from '../data/portfolio'
import { gemoraScreenshots } from '../data/portfolio'
import { ProjectVisual } from './ProjectVisual'
import { useGemoraScreenshots } from './useGemoraScreenshots'

const featuredScreenshotIds = new Set(['homepage'])

function FeaturedVisual() {
  const { available } = useGemoraScreenshots(featuredScreenshotIds)
  const homepage = gemoraScreenshots[0]

  if (available.has(homepage.id)) {
    return <div className="project-visual project-visual--real"><img src={homepage.src} alt="GemoraAI web homepage" /><span className="visual-note">ACTUAL PROJECT SCREENSHOT</span></div>
  }

  return <ProjectVisual variant="gemora" />
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`project-card ${project.featured ? 'project-card--featured' : ''} ${project.wide ? 'project-card--wide' : ''}`}>
      <div className="project-visual-wrap">{project.id === 'gemora-ai' ? <FeaturedVisual /> : <ProjectVisual variant={project.visual} />}</div>
      <div className="project-content">
        <div className="project-topline">
          <span>0{index + 1} / {project.featured ? 'FEATURED PROJECT' : 'PROJECT'}</span>
          {project.type && <span className="project-type">{project.type}</span>}
        </div>
        <div>
          {project.subtitle && <p className="project-subtitle">{project.subtitle}</p>}
          <h3>{project.title}</h3>
          <p className="project-summary">{project.summary}</p>
          <ul className="project-detail-list">
            {project.details.map((detail) => <li key={detail}>{detail}</li>)}
          </ul>
          {project.contribution && (
            <div className="project-contribution">
              <span>MY CONTRIBUTION</span>
              <p>{project.contribution}</p>
            </div>
          )}
        </div>
        <div className="project-bottom">
          <ul className="tech-list" aria-label="Technologies used">{project.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul>
          {(project.repositoryUrl || project.demoUrl || project.apkUrl || project.caseStudyUrl) && (
            <div className="project-actions">
              {project.caseStudyUrl && <a className="project-link project-link--case-study" href={project.caseStudyUrl}>View case study <ArrowRight size={15} aria-hidden="true" /></a>}
              {project.demoUrl && <a className="project-link" href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title} live website in a new tab`}>{project.featured ? 'Visit live website' : 'Live demo'} <ArrowUpRight size={15} aria-hidden="true" /></a>}
              {project.apkUrl && <a className="project-link" href={project.apkUrl} download="GemoraAI.apk">Download Android APK <Download size={15} aria-hidden="true" /></a>}
              {project.repositoryUrl && <a className="project-link" href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} repository in a new tab`}>GitHub repository <ArrowUpRight size={15} aria-hidden="true" /></a>}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
