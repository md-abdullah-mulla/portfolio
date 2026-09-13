import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { journey } from '../utils/data'
import { useIsMobile, useReducedMotion } from '../hooks/useMedia'
import { useReady } from '../hooks/useReady'

gsap.registerPlugin(ScrollTrigger)

export function Journey() {
  const pin = useRef(null)
  const track = useRef(null)
  const mobile = useIsMobile()
  const reduced = useReducedMotion()
  const ready = useReady()

  useEffect(() => {
    if (!ready || mobile || reduced || !pin.current || !track.current) return undefined

    const ctx = gsap.context(() => {
      const distance = track.current.scrollWidth - window.innerWidth
      gsap.to(track.current, {
        x: () => -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: pin.current,
          start: 'top top',
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    }, pin)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('resize', refresh)
    const t = window.setTimeout(refresh, 400)

    return () => {
      window.clearTimeout(t)
      window.removeEventListener('resize', refresh)
      ctx.revert()
    }
  }, [ready, mobile, reduced])

  return (
    <section id="journey" ref={pin} className="border-t border-white/5" aria-labelledby="journey-title">
      <div className="section pb-8 md:pb-0">
        <div className="section-wide">
          <p className="section-index">04 — Path</p>
          <h2 id="journey-title" className="display mt-4 text-[13vw] text-paper md:text-[6.5rem]">
            MY JOURNEY
          </h2>
        </div>
      </div>

      {mobile || reduced ? (
        <div className="px-5 pb-20">
          <ol className="relative space-y-10 border-l border-white/10 pl-6">
            {journey.map((item) => (
              <li key={item.year}>
                <p className="type-d text-4xl text-paper">{item.year}</p>
                <h3 className="mt-2 text-lg text-paper">{item.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-paper-dim">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <div className="overflow-hidden pb-24">
          <div ref={track} className="flex w-max items-stretch gap-0 px-[12vw]">
            {journey.map((item, i) => (
              <article
                key={item.year}
                className="relative flex w-[70vw] max-w-[820px] shrink-0 flex-col justify-end border-l border-white/10 px-12 py-10"
              >
                <div className="absolute left-0 top-10 h-2 w-2 -translate-x-1/2 rounded-full bg-mist" />
                <p className="display text-[8rem] leading-none text-paper">{item.year}</p>
                <p className="kicker mt-6">0{i + 1}</p>
                <h3 className="mt-3 type-d text-3xl tracking-tight text-paper">{item.title}</h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-paper-dim">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
