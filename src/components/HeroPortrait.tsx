import { useState } from 'react'
import portraitPlaceholder from '../assets/portrait-placeholder.svg'

const portraitUrl = '/images/profile.jpg'

export function HeroPortrait() {
  const [showFallback, setShowFallback] = useState(false)

  return (
    <>
      <div className={`portrait-frame ${showFallback ? '' : 'portrait-frame--photo'}`}>
        <div className="portrait-corner portrait-corner--top" aria-hidden="true" />
        <img
          src={showFallback ? portraitPlaceholder : portraitUrl}
          alt={showFallback ? 'Illustrated portrait placeholder for Vinura' : 'Portrait of Vinura Pathum Sandeepa'}
          width="832"
          height="923"
          fetchPriority="high"
          decoding="async"
          onError={() => setShowFallback(true)}
        />
        <div className="portrait-corner portrait-corner--bottom" aria-hidden="true" />
        <span className="portrait-index" aria-hidden="true">01 / VP</span>
      </div>
      <div className="portrait-caption">
        <span>{showFallback ? 'Portrait placeholder' : 'Vinura Pathum Sandeepa'}</span>
        <span>Undergraduate Software Engineer / SLIIT</span>
      </div>
    </>
  )
}
