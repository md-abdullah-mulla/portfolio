import { useEffect, useRef } from 'react'
import { useIsTouch } from '../hooks/useMedia'

export function Cursor() {
  const touch = useIsTouch()
  const dot = useRef(null)
  const ring = useRef(null)
  const label = useRef(null)
  const pos = useRef({ x: 0, y: 0, rx: 0, ry: 0 })

  useEffect(() => {
    if (touch) return undefined
    document.body.classList.add('has-custom-cursor')

    const onMove = (e) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
    }

    const onOver = (e) => {
      const target = e.target.closest('[data-cursor]')
      const kind = target?.getAttribute('data-cursor') || ''
      if (!ring.current || !label.current) return
      ring.current.classList.toggle('is-hover', Boolean(kind) || Boolean(e.target.closest('a, button')))
      ring.current.classList.toggle('is-view', kind === 'view')
      ring.current.classList.toggle('is-explore', kind === 'explore')
      if (kind === 'view' || kind === 'explore') {
        label.current.textContent = kind === 'view' ? 'VIEW' : 'EXPLORE'
        label.current.classList.add('is-on')
      } else {
        label.current.classList.remove('is-on')
      }
    }

    let raf = 0
    const loop = () => {
      pos.current.rx += (pos.current.x - pos.current.rx) * 0.18
      pos.current.ry += (pos.current.y - pos.current.ry) * 0.18
      if (dot.current) {
        dot.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${pos.current.rx}px, ${pos.current.ry}px, 0)`
      }
      if (label.current) {
        label.current.style.transform = `translate3d(${pos.current.rx}px, ${pos.current.ry}px, 0)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver)
    raf = requestAnimationFrame(loop)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [touch])

  if (touch) return null

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
      <div ref={label} className="cursor-label" />
    </>
  )
}
