import { ArrowUpRight } from 'lucide-react'
import { socials } from '../utils/data'
import { Magnetic } from '../components/Magnetic'
import { Reveal } from '../components/Reveal'

const links = [
  { label: 'Email Me', href: `mailto:${socials.email}` },
  { label: 'GitHub', href: socials.github },
  { label: 'LinkedIn', href: socials.linkedin },
  { label: 'Facebook', href: socials.facebook },
]

export function Contact() {
  return (
    <section id="contact" className="section border-t border-white/5" aria-labelledby="contact-title">
      <div className="section-wide">
        <p className="section-index">07 — Contact</p>
        <Reveal>
          <h2 id="contact-title" className="display mt-4 text-[13vw] leading-[0.86] text-paper md:text-[7.4rem]">
            LET&apos;S BUILD
            <br />
            SOMETHING
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper-dim md:text-2xl">
            Have an idea, project, collaboration, or opportunity?
            <br />
            Let&apos;s turn it into something real.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-wrap gap-3">
          {links.map((link) => (
            <Magnetic key={link.label}>
              <a
                href={link.href}
                className="btn"
                data-cursor="hover"
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              >
                <span>{link.label}</span>
                <ArrowUpRight size={14} />
              </a>
            </Magnetic>
          ))}
        </div>

        <div className="mt-20 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-[11px] uppercase tracking-[0.18em] text-mute md:flex-row">
          <p>Md Abdullah Mulla — Software Developer</p>
          <p>{socials.email}</p>
          <p>© {new Date().getFullYear()} · Built as an experience</p>
        </div>
      </div>
    </section>
  )
}
