import { useEffect, useMemo, useRef, useState } from 'react'
import { skillGroups } from '../utils/data'
import { Reveal } from '../components/Reveal'
import { useIsMobile } from '../hooks/useMedia'

const allSkills = skillGroups.flatMap((g) =>
  g.items.map((item) => ({ ...item, group: g.label })),
)

function fibonacciSphere(n, radius) {
  const pts = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i += 1) {
    const y = 1 - (i / Math.max(n - 1, 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    pts.push({
      x: Math.cos(theta) * r * radius,
      y: y * radius,
      z: Math.sin(theta) * r * radius,
    })
  }
  return pts
}

export function Skills() {
  const mobile = useIsMobile()
  const rot = useRef({ x: 0.18, y: 0 })
  const drag = useRef({ on: false, lx: 0, ly: 0 })
  const nodeRefs = useRef([])
  const [active, setActive] = useState(null)
  const points = useMemo(() => fibonacciSphere(allSkills.length, 1), [])

  useEffect(() => {
    if (mobile) return undefined
    let raf = 0
    const loop = () => {
      if (!drag.current.on) {
        rot.current.y += 0.0022
        rot.current.x += (0.16 - rot.current.x) * 0.02
      }
      const cosY = Math.cos(rot.current.y)
      const sinY = Math.sin(rot.current.y)
      const cosX = Math.cos(rot.current.x)
      const sinX = Math.sin(rot.current.x)
      points.forEach((p, i) => {
        const el = nodeRefs.current[i]
        if (!el) return
        const x1 = p.x * cosY + p.z * sinY
        const z1 = p.z * cosY - p.x * sinY
        const y2 = p.y * cosX - z1 * sinX
        const z2 = z1 * cosX + p.y * sinX
        const persp = 520 / (520 + z2 * 180)
        const hot = el.dataset.hot === '1'
        el.style.transform = `translate3d(${x1 * 210 * persp}px, ${y2 * 210 * persp}px, 0) translate(-50%, -50%) scale(${hot ? 1.18 : 0.72 + persp * 0.45})`
        el.style.opacity = String(0.28 + (z2 + 1.2) * 0.32)
        el.style.zIndex = String(Math.round(20 + z2 * 10))
      })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [mobile, points])

  const onDown = (e) => {
    drag.current = { on: true, lx: e.clientX, ly: e.clientY }
  }
  const onMove = (e) => {
    if (!drag.current.on) return
    rot.current.y += (e.clientX - drag.current.lx) * 0.005
    rot.current.x += (e.clientY - drag.current.ly) * 0.004
    drag.current.lx = e.clientX
    drag.current.ly = e.clientY
  }
  const onUp = () => {
    drag.current.on = false
  }

  return (
    <section id="skills" className="section border-t border-white/5" aria-labelledby="skills-title">
      <div className="section-wide">
        <div className="mb-10 flex flex-col justify-between gap-6 md:mb-6 md:flex-row md:items-end">
          <div>
            <p className="section-index">02 — Capabilities</p>
            <h2 id="skills-title" className="display mt-4 text-[12vw] text-paper md:text-[6.2rem]">
              SKILL
              <br />
              UNIVERSE
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-paper-dim md:text-base">
            A constellation of languages, systems, and habits. Drag the field. Hover a node.
          </p>
        </div>

        {mobile ? (
          <div className="mt-10 grid gap-10">
            {skillGroups.map((group) => (
              <Reveal key={group.id}>
                <p className="kicker mb-4">{group.label}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <button
                      key={item.name}
                      className="rounded-full border border-white/10 px-3 py-2 font-mono text-[11px] tracking-[0.14em] uppercase text-paper-dim"
                      onClick={() => setActive(item)}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </Reveal>
            ))}
            {active ? (
              <p className="text-sm leading-relaxed text-paper-dim">
                <span className="text-paper">{active.name}. </span>
                {active.info}
              </p>
            ) : null}
          </div>
        ) : (
          <div
            className="skill-stage"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerLeave={onUp}
          >
            <div className="skill-core">
              <div className="text-center">
                <div className="kicker">My Stack</div>
                <div className="mt-1 type-d text-lg tracking-tight">AM</div>
              </div>
            </div>

            {allSkills.map((skill, i) => (
              <button
                key={skill.name + skill.group}
                ref={(el) => {
                  nodeRefs.current[i] = el
                }}
                className={`skill-node ${active?.name === skill.name ? 'is-hot' : ''}`}
                data-hot={active?.name === skill.name ? '1' : '0'}
                onMouseEnter={() => setActive(skill)}
                onFocus={() => setActive(skill)}
                onMouseLeave={() => setActive(null)}
              >
                {skill.name}
              </button>
            ))}

            <div className="skill-panel">
              <p className="kicker">{active ? active.group : 'Interact'}</p>
              <p className="mt-2 type-d text-2xl tracking-tight text-paper">
                {active ? active.name : 'Hold a technology'}
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-paper-dim">
                {active
                  ? active.info
                  : 'Each node is a tool I actually use — not a catalogue of logos.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
