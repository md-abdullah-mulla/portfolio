import { useEffect } from 'react'
import { site } from '../utils/data'

const titles = {
  home: site.title,
  about: 'About — Md Abdullah Mulla, Software Developer',
  skills: 'Skills — Md Abdullah Mulla',
  projects: 'Selected Work — Md Abdullah Mulla',
  journey: 'Journey — Md Abdullah Mulla',
  education: 'Education — Md Abdullah Mulla',
  contact: 'Contact — Md Abdullah Mulla',
}

export function Seo() {
  useEffect(() => {
    const ids = Object.keys(titles)
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return undefined

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting)
        if (!visible) return
        const next = titles[visible.target.id] || site.title
        if (document.title !== next) document.title = next
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return null
}
