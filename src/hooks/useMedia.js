import { useEffect, useState } from 'react'

export function useMedia(query) {
  const [match, setMatch] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setMatch(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [query])

  return match
}

export function useIsTouch() {
  return useMedia('(hover: none), (pointer: coarse)')
}

export function useReducedMotion() {
  return useMedia('(prefers-reduced-motion: reduce)')
}

export function useIsMobile() {
  return useMedia('(max-width: 768px)')
}

export function useLowPower() {
  const [low, setLow] = useState(false)
  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 8
    const mem = navigator.deviceMemory || 8
    const save =
      navigator.connection?.saveData ||
      navigator.connection?.effectiveType === '2g' ||
      navigator.connection?.effectiveType === 'slow-2g'
    const mobile = window.matchMedia('(max-width: 768px)').matches
    setLow(Boolean(save || cores <= 4 || mem <= 4 || mobile))
  }, [])
  return low
}
