import { profile } from '../utils/data'
import { Reveal } from '../components/Reveal'

export function About() {
  return (
    <section id="about" className="section border-t border-white/5" aria-labelledby="about-title">
      <div className="section-wide">
        <div className="mb-12 flex items-end justify-between gap-6 md:mb-20">
          <div>
            <p className="section-index">01 — About</p>
            <h2 id="about-title" className="display mt-4 text-[12vw] text-paper md:text-[6.4rem]">
              THE HUMAN
              <br />
              BEHIND
              <br />
              THE CODE
            </h2>
          </div>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <figure className="relative" data-cursor="explore">
              <div className="absolute -left-3 -top-3 font-mono text-[10px] tracking-[0.2em] text-steel">
                FIG. 01
              </div>
              <div className="portrait-frame overflow-hidden border border-white/10 bg-ink-3">
                <img
                  src={profile.portrait}
                  alt="Md Abdullah Mulla, Software Developer from Barguna, Bangladesh"
                  width={900}
                  height={891}
                  fetchPriority="high"
                  decoding="async"
                  itemProp="image"
                  className="aspect-[4/5] w-full object-cover object-[50%_18%]"
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-between text-[11px] tracking-[0.16em] text-mute uppercase font-mono">
                <span>Md Abdullah Mulla</span>
                <span>{profile.location}</span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-7 lg:pt-8">
            <Reveal>
              <p className="max-w-xl text-xl leading-relaxed text-paper md:text-[1.65rem] md:leading-[1.35]">
                {profile.about[0]}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-paper-dim md:text-lg">
                {profile.about[1]}
              </p>
            </Reveal>

            <Reveal delay={0.18} className="mt-12">
              <p className="kicker mb-5">Current focus</p>
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {profile.focus.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-center justify-between py-4 text-[0.95rem] md:text-lg"
                  >
                    <span className="text-paper">{item}</span>
                    <span className="font-mono text-[11px] text-mute">0{i + 1}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
