import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
]

export function Navbar({ fromCaseStudy = false }: { fromCaseStudy?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const homePrefix = fromCaseStudy ? '/' : ''

  useEffect(() => {
    if (fromCaseStudy) return

    const targets = [document.querySelector('.hero'), ...navLinks.map((link) => document.querySelector(link.href)), document.getElementById('contact')].filter((target): target is Element => Boolean(target))
    const intersecting = new Set<Element>()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) intersecting.add(entry.target)
        else intersecting.delete(entry.target)
      })
      const current = [...intersecting].sort((a, b) => b.getBoundingClientRect().top - a.getBoundingClientRect().top)[0]
      if (current) setActiveSection(current.id || null)
    }, { rootMargin: '-18% 0px -62% 0px' })

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [fromCaseStudy])

  return (
    <header className="site-header">
      <nav className="section-shell nav" aria-label="Main navigation">
        <a className="brand" href={fromCaseStudy ? '/' : '#top'} onClick={() => setMenuOpen(false)} aria-label="Vinura Pathum Sandeepa, home">VP<span>.</span><small>VINURA PATHUM</small></a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-controls="main-menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
        <div className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`} id="main-menu">
          {navLinks.map((link) => <a key={link.href} href={`${homePrefix}${link.href}`} aria-current={activeSection === link.href.slice(1) ? 'location' : undefined} onClick={() => { setMenuOpen(false); setActiveSection(link.href.slice(1)) }}>{link.label}</a>)}
          <a className="nav-contact" href={`${homePrefix}#contact`} aria-current={activeSection === 'contact' ? 'location' : undefined} onClick={() => { setMenuOpen(false); setActiveSection('contact') }}>Let’s talk <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </nav>
    </header>
  )
}
