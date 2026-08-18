import { useEffect, useRef } from 'react'

export function Philosophy() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    let raf = 0
    let w = 0
    let h = 0
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const nodes = Array.from({ length: 36 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      s: 0.4 + Math.random() * 0.8,
    }))

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)
      nodes.forEach((n, i) => {
        const px = n.x * w + Math.sin(t * 0.00015 + i) * 18
        const py = n.y * h + Math.cos(t * 0.00012 + i * 0.7) * 14
        ctx.beginPath()
        ctx.arc(px, py, n.s, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(197,208,216,0.35)'
        ctx.fill()
      })
      if (!reduced) raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section
      id="philosophy"
      className="philosophy relative border-t border-white/5 px-5"
      aria-labelledby="philosophy-title"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <h2 id="philosophy-title" className="sr-only">
        Philosophy
      </h2>
      <blockquote className="relative z-[1] mx-auto max-w-5xl text-center">
        <p className="serif text-[9.5vw] leading-[0.95] text-paper italic md:text-[5.4rem]">
          “I don&apos;t just want
          <br />
          to write code.
          <br />
          I want to build things
          <br />
          people remember.”
        </p>
      </blockquote>
    </section>
  )
}
