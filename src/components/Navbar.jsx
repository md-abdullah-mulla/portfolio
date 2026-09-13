import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { nav } from '../utils/data'
import { scrollToId } from '../hooks/useLenis'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = nav.map((n) => n.id)
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return undefined
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const go = (id) => {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <a
          href="#home"
          className="logo"
          aria-label="Md Abdullah Mulla — home"
          onClick={(e) => { e.preventDefault(); go('home') }}
          data-cursor="hover"
        >
          AM
        </a>
        <nav className="nav-links" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={active === item.id ? 'is-active' : ''}
              aria-current={active === item.id ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault()
                go(item.id)
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button
          className="md:hidden kicker tracking-[0.22em]"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          Menu
        </button>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="menu-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-start justify-between mb-auto">
              <span className="logo">AM</span>
              <button className="kicker" onClick={() => setOpen(false)} aria-label="Close menu">
                Close
              </button>
            </div>
            <nav className="flex flex-col" aria-label="Mobile">
              {nav.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => {
                    e.preventDefault()
                    go(item.id)
                  }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
