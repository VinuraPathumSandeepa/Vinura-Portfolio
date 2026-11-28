const siteUrl = 'https://vinura-portfolio-lyart.vercel.app/'

const caseStudies = {
  'gemora-ai': {
    title: 'GemoraAI Case Study | Vinura Pathum Sandeepa',
    description: 'A case study of GemoraAI, a group-built AI-assisted gemstone marketplace, with Vinura Pathum Sandeepa’s seller-facing React and Flutter contributions.',
  },
  skylink: {
    title: 'Skylink Case Study | Vinura Pathum Sandeepa',
    description: 'Explore Vinura Pathum Sandeepa’s Booking and Payment work in Skylink, a collaborative airline reservation project, through real application screenshots.',
  },
} as const

function setMeta(selector: string, content: string) {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content)
}

function setCanonical(url: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.append(link)
  }
  link.href = url
}

export function setHomepageCanonical() {
  setCanonical(siteUrl)
}

export function setCaseStudyMetadata(slug: keyof typeof caseStudies) {
  const { title, description } = caseStudies[slug]
  const url = new URL(`?case-study=${slug}`, siteUrl).href

  document.title = title
  setCanonical(url)
  setMeta('meta[name="description"]', description)
  setMeta('meta[property="og:title"]', title)
  setMeta('meta[property="og:description"]', description)
  setMeta('meta[property="og:url"]', url)
  setMeta('meta[name="twitter:title"]', title)
  setMeta('meta[name="twitter:description"]', description)
}
