import { useEffect, useState } from 'react'
import { gemoraScreenshots } from '../data/portfolio'

export function useGemoraScreenshots(requestedIds?: ReadonlySet<string>) {
  const [available, setAvailable] = useState<Set<string>>(new Set())
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    let active = true

    const screenshots = requestedIds ? gemoraScreenshots.filter((screenshot) => requestedIds.has(screenshot.id)) : gemoraScreenshots

    Promise.all(screenshots.map((screenshot) => new Promise<string | null>((resolve) => {
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
  }, [requestedIds])

  return { available, checked }
}
