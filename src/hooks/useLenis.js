import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)

export function useLenis(enabled) {
  useEffect(() => {
    if (!enabled) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.15,
    })

    lenis.on('scroll', ScrollTrigger.update)
    const ticker = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    window.__lenis = lenis
    requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => {
      gsap.ticker.remove(ticker)
      lenis.destroy()
      window.__lenis = null
    }
  }, [enabled])
}

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: 0 })
    return
  }
  el.scrollIntoView({ behavior: 'smooth' })
}
