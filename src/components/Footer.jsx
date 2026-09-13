import { nav, socials, site } from '../utils/data'

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-10 md:px-12" role="contentinfo">
      <div className="section-wide flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="logo">AM</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-paper-dim">
            {site.name} — Software Developer &amp; Web Developer from Barguna, Bangladesh.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
            {nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
            <li>
              <a href={socials.github} rel="me noopener noreferrer" target="_blank">
                GitHub
              </a>
            </li>
            <li>
              <a href={`mailto:${socials.email}`}>Email</a>
            </li>
          </ul>
        </nav>
      </div>
      <p className="section-wide mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </p>
    </footer>
  )
}
