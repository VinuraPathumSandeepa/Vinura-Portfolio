import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
]

export function Navbar({ fromCaseStudy = false }: { fromCaseStudy?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const homePrefix = fromCaseStudy ? '/' : ''

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
          {navLinks.map((link) => <a key={link.href} href={`${homePrefix}${link.href}`} onClick={() => setMenuOpen(false)}>{link.label}</a>)}
          <a className="nav-contact" href={`${homePrefix}#contact`} onClick={() => setMenuOpen(false)}>Let’s talk <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </nav>
    </header>
  )
}
