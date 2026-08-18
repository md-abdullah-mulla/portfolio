import { useRef } from 'react'
import { useIsTouch } from '../hooks/useMedia'

export function Magnetic({ children, strength = 0.32, className = '' }) {
  const ref = useRef(null)
  const touch = useIsTouch()

  const onMove = (e) => {
    if (touch || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    ref.current.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`
  }

  const onLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate3d(0,0,0)'
  }

  return (
    <span
      ref={ref}
      className={`magnetic ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </span>
  )
}
