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
                rel={
                  link.href.startsWith('http')
                    ? link.label === 'GitHub'
                      ? 'me noopener noreferrer'
                      : 'noopener noreferrer'
                    : undefined
                }
              >
                <span>{link.label}</span>
                <ArrowUpRight size={14} />
              </a>
            </Magnetic>
          ))}
        </div>

        <address className="mt-20 not-italic font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
          <a href={`mailto:${socials.email}`}>{socials.email}</a>
          <span className="mx-3">·</span>
          Barguna, Bangladesh
        </address>
      </div>
    </section>
  )
}
