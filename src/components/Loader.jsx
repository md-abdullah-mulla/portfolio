import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    let frame
    let value = 0
    const start = performance.now()

    const tick = (now) => {
      const elapsed = now - start
      const target = Math.min(100, (elapsed / 1600) * 100)
      value += (target - value) * 0.12
      const shown = Math.min(100, Math.round(value))
      setProgress(shown)

      if (shown >= 100 && elapsed > 1700) {
        setLeaving(true)
        window.setTimeout(() => onDone?.(), 700)
        return
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [onDone])

  return (
    <AnimatePresence>
      {!leaving ? (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-ink px-6 py-7 md:px-10 md:py-9"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-start justify-between">
            <span className="logo">AM</span>
            <span className="kicker">Dhaka · Barisal · The Web</span>
          </div>

          <div>
            <p className="kicker mb-6">Initializing digital experience</p>
            <div className="display text-[18vw] leading-none text-paper">
              {String(progress).padStart(3, '0')}
            </div>
            <div className="mt-6 h-px w-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-mist"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'linear', duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
