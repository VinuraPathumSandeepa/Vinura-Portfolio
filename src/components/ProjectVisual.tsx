import { Check, Dumbbell, Gem, MessageSquare, Plane, Search, Star, UtensilsCrossed } from 'lucide-react'
import type { Project } from '../data/portfolio'

export function ProjectVisual({ variant }: { variant: Project['visual'] }) {
  if (variant === 'gemora') {
    return (
      <div className="project-visual project-visual--gemora" aria-hidden="true">
        <div className="visual-note">INTERFACE CONCEPT</div>
        <div className="gemora-window">
          <div className="window-bar"><span className="gemora-brand"><Gem size={17} /> gemora<span>AI</span></span><span className="window-nav">Discover&nbsp;&nbsp;&nbsp; Collections&nbsp;&nbsp;&nbsp; About</span><span className="window-avatar" /></div>
          <div className="gemora-body">
            <div className="gemora-copy"><span className="mini-eyebrow">CURATED GEMSTONES</span><strong>Find the extraordinary.</strong><span>Discover remarkable stones with an informed buying experience.</span><span className="mock-button">Explore collection <span>↗</span></span></div>
            <div className="gem-stage"><div className="gem-halo" /><div className="gem-shape"><div className="gem-facet gem-facet--one" /><div className="gem-facet gem-facet--two" /><div className="gem-facet gem-facet--three" /></div><span className="gem-stage-label">SAPPHIRE / CONCEPT</span></div>
          </div>
          <div className="verification-chip"><span className="verification-icon"><Check size={13} /></span><span>AI-assisted review<br /><strong>Human verification step</strong></span></div>
        </div>
      </div>
    )
  }

  if (variant === 'food') {
    return (
      <div className="project-visual project-visual--food" aria-hidden="true">
        <div className="visual-note">INTERFACE CONCEPT</div>
        <div className="mini-app food-app">
          <div className="mini-app-header"><span className="mini-app-logo"><UtensilsCrossed size={15} /> quickbite</span><span className="mini-app-search"><Search size={13} /> Search menu</span></div>
          <div className="food-app-content"><span className="mini-eyebrow">MENU MANAGEMENT</span><strong>Good food,<br />on your terms.</strong><div className="food-tiles"><span className="food-tile food-tile--one">◐</span><span className="food-tile food-tile--two">◌</span><span className="food-tile food-tile--three">✳</span></div><div className="food-order"><span>Order overview</span><span className="order-bars"><i /><i /><i /></span></div></div>
        </div>
      </div>
    )
  }

  if (variant === 'gym') {
    return (
      <div className="project-visual project-visual--gym" aria-hidden="true">
        <div className="visual-note">MODULE CONCEPT</div>
        <div className="mini-app gym-app">
          <div className="mini-app-header"><span className="mini-app-logo"><Dumbbell size={15} /> member feedback</span><span className="gym-header-mark" /></div>
          <div className="gym-app-content">
            <span className="mini-eyebrow">FEEDBACK & RATING</span>
            <strong>Every voice<br />adds value.</strong>
            <div className="gym-review-card">
              <div className="gym-stars"><Star size={13} /><Star size={13} /><Star size={13} /><Star size={13} /><Star size={13} /></div>
              <div className="gym-review-lines"><i /><i /></div>
            </div>
            <div className="gym-summary-row"><MessageSquare size={13} /><span>Feedback summary</span><span>↗</span></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="project-visual project-visual--airline" aria-hidden="true">
      <div className="visual-note">INTERFACE CONCEPT</div>
      <div className="mini-app airline-app">
        <div className="mini-app-header"><span className="mini-app-logo"><Plane size={15} /> altitude</span><span className="airline-header-right">BOOKINGS&nbsp;&nbsp; DASHBOARD</span></div>
        <div className="airline-app-content"><span className="mini-eyebrow">TRAVELER DASHBOARD</span><strong>Your journey<br />starts here.</strong><div className="flight-card"><div><span>FROM</span><strong>CMB</strong></div><div className="flight-path"><Plane size={15} /></div><div><span>TO</span><strong>— — —</strong></div></div><div className="flight-bottom"><span>Bookings</span><span>Payments</span><span>Manage trip ↗</span></div></div>
      </div>
    </div>
  )
}
