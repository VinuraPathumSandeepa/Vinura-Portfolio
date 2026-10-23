import { useEffect, useRef, useState } from 'react'

const motionQuery = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)'
const dataQuery = '(prefers-reduced-data: reduce)'

function motionAllowed() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  return window.matchMedia(motionQuery).matches && !window.matchMedia(dataQuery).matches && !connection?.saveData
}

export function AmbientBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [canAnimate, setCanAnimate] = useState(motionAllowed)
  const [videoFailed, setVideoFailed] = useState(false)

  useEffect(() => {
    const motion = window.matchMedia(motionQuery)
    const reducedData = window.matchMedia(dataQuery)
    const update = () => setCanAnimate(motionAllowed())
    motion.addEventListener('change', update)
    reducedData.addEventListener('change', update)
    return () => {
      motion.removeEventListener('change', update)
      reducedData.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !canAnimate || videoFailed) return

    const visibleSections = new Set<Element>()
    let watchingSections = false
    const syncPlayback = () => {
      if (document.hidden || (watchingSections && visibleSections.size === 0)) video.pause()
      else void video.play().catch(() => { /* The poster remains visible if autoplay is blocked. */ })
    }
    const sections = document.querySelectorAll('.hero-track, #skills, #education, #contact')
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visibleSections.add(entry.target)
        else visibleSections.delete(entry.target)
      }
      syncPlayback()
    }, { rootMargin: '-90px 0px 0px 0px' }) : null
    if (observer) {
      sections.forEach((section) => observer.observe(section))
      watchingSections = true
    }
    document.addEventListener('visibilitychange', syncPlayback)
    if (observer) video.pause()
    else syncPlayback()
    return () => {
      document.removeEventListener('visibilitychange', syncPlayback)
      observer?.disconnect()
      video.pause()
    }
  }, [canAnimate, videoFailed])

  return (
    <div className="ambient-background" aria-hidden="true">
      {canAnimate && !videoFailed && (
        <video
          ref={videoRef}
          className="ambient-background-video"
          muted
          loop
          playsInline
          preload="none"
          poster="/images/ambient-teal-poster.webp"
          disablePictureInPicture
          onError={() => setVideoFailed(true)}
        >
          <source src="/media/ambient-teal.webm" type="video/webm" />
          <source src="/media/ambient-teal.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  )
}
