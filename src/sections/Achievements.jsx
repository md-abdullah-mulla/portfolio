import { useEffect, useRef, useState } from 'react'
import { experience, proof } from '../utils/data'
import { Reveal } from '../components/Reveal'

function CountUp({ value }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(value)
  const numeric = /^\d+/.test(value)

  useEffect(() => {
    if (!numeric) return undefined
    const el = ref.current
    if (!el) return undefined
    const target = parseInt(value, 10)
    const suffix = value.replace(/^\d+/, '')
    let started = false

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return
        started = true
        const start = performance.now()
        const tick = (now) => {
          const p = Math.min(1, (now - start) / 1400)
          const eased = 1 - Math.pow(1 - p, 3)
          setShown(`${Math.round(target * eased)}${suffix}`)
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [numeric, value])

  return (
    <span ref={ref} className="stat-num text-paper">
      {shown}
    </span>
  )
}

export function Achievements() {
  return (
    <section id="proof" className="section border-t border-white/5" aria-labelledby="proof-title">
      <div className="section-wide">
        <p className="section-index">06 — Proof of work</p>
        <h2 id="proof-title" className="display mt-4 text-[11vw] text-paper md:text-[5.4rem]">
          IN MOTION
        </h2>

        <div className="mt-16 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {proof.map((item) => (
            <div key={item.label} className="bg-ink p-6 md:p-8">
              <CountUp value={item.value} />
              <p className="mt-6 text-sm uppercase tracking-[0.16em] text-paper">{item.label}</p>
              <p className="mt-2 text-sm text-mute">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {experience.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.04} className="border border-white/10 p-6">
              <p className="font-mono text-[11px] tracking-[0.2em] text-steel">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-4 font-display text-2xl tracking-tight text-paper">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-paper-dim">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
