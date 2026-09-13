import { lazy, Suspense } from 'react'
import { heroTags, profile } from '../utils/data'
import { Magnetic } from '../components/Magnetic'
import { scrollToId } from '../hooks/useLenis'

const HeroScene = lazy(() =>
  import('../three/HeroScene.jsx').then((m) => ({ default: m.HeroScene })),
)

export function Hero() {
  return (
    <section id="home" className="hero" aria-label="Md Abdullah Mulla, Software Developer">
      <div className="hero-copy">
        <div className="section-wide w-full">
          <h1 className="display hero-name text-paper" itemProp="name">
            MD
            <br />
            ABDULLAH
            <br />
            MULLA
          </h1>
        </div>
      </div>

      <div className="hero-canvas" aria-hidden="true">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      {heroTags.map((tag, i) => (
        <span
          key={tag.label}
          className="orbit-tag hidden lg:inline-flex"
          style={{ left: tag.x, top: tag.y, animationDelay: `${i * 0.4}s` }}
        >
          {tag.label}
        </span>
      ))}

      <div className="hero-ui">
        <div className="section-wide flex w-full flex-col justify-between gap-10 md:min-h-[calc(100svh-8rem)]">
          <p className="kicker">Bangladesh · Software & the Web</p>

          <div className="mt-auto max-w-xl">
            <p className="type-d text-lg tracking-tight text-paper md:text-2xl">
              {profile.role}
            </p>
            <p
              className="mt-4 text-[0.98rem] leading-relaxed text-paper-dim md:text-[1.05rem]"
              itemProp="description"
            >
              {profile.headline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a
                  href="#projects"
                  data-cursor="hover"
                  className="btn btn-solid"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToId('projects')
                  }}
                >
                  <span>Explore My Work</span>
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#contact"
                  data-cursor="hover"
                  className="btn btn-ghost"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToId('contact')
                  }}
                >
                  <span>Let&apos;s Connect</span>
                </a>
              </Magnetic>
            </div>
          </div>

          <button
            className="scroll-hint hidden items-center gap-3 self-center md:flex"
            onClick={() => scrollToId('about')}
          >
            <span className="kicker">Scroll to explore</span>
            <span className="scroll-line" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
