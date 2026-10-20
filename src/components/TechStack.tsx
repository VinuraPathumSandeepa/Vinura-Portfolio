import type { ComponentType, CSSProperties } from 'react'
import { Braces, Workflow } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { FaCss3Alt, FaJava } from 'react-icons/fa'
import { SiDotnet, SiFlutter, SiGit, SiGithub, SiGooglegemini, SiHibernate, SiHtml5, SiJavascript, SiMysql, SiPostgresql, SiReact, SiSpringboot, SiTypescript } from 'react-icons/si'
import { TbBrandCSharp } from 'react-icons/tb'
import { skillGroups, type Technology, type TechnologyIconId } from '../data/portfolio'
import { motionDuration, motionEase } from '../motion'
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

function TechnologyCard({ technology, index, reduceMotion }: { technology: Technology; index: number; reduceMotion: boolean }) {
  const Icon = technologyIcons[technology.icon]

  return (
    <motion.li
      className="technology-card"
      style={{ '--technology-color': technology.color } as CSSProperties}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, transition: { duration: motionDuration.detail, delay: index * 0.055, ease: motionEase } }}
      whileHover={reduceMotion ? undefined : { y: -4, transition: { duration: 0.22 } }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <span className="technology-icon" role="img" aria-label={`${technology.name} icon`}>
        <Icon size={34} aria-hidden="true" />
      </span>
      <span className="technology-name">{technology.name}</span>
    </motion.li>
  )
}

export function TechStack() {
  const reduceMotion = Boolean(useReducedMotion())

  return (
    <div className="skills-groups">
      {skillGroups.map((group, groupIndex) => (
        <section className={`skill-group skill-group--${group.id}`} aria-labelledby={`skill-group-${group.id}`} key={group.id}>
          <Reveal className="skill-group-heading">
            <span className="skill-group-number">0{groupIndex + 1}</span>
            <h3 id={`skill-group-${group.id}`}>{group.title}</h3>
            <span className="skill-group-count">{String(group.technologies.length).padStart(2, '0')} {group.technologies.length === 1 ? 'TECHNOLOGY' : 'TECHNOLOGIES'}</span>
          </Reveal>
          <ul className="technology-grid">
            {group.technologies.map((technology, index) => <TechnologyCard technology={technology} index={index} reduceMotion={reduceMotion} key={technology.name} />)}
          </ul>
        </section>
      ))}
    </div>
  )
}
