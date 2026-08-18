import { ArrowUpRight } from 'lucide-react'
import { projects, socials } from '../utils/data'
import { Reveal } from '../components/Reveal'
import { Magnetic } from '../components/Magnetic'

export function Projects() {
  return (
    <section id="projects" className="section border-t border-white/5" aria-labelledby="projects-title">
      <div className="section-wide">
        <div className="mb-16 md:mb-24">
          <p className="section-index">03 — Selected work</p>
          <h2 id="projects-title" className="display mt-4 text-[13vw] text-paper md:text-[7rem]">
            SELECTED
            <br />
            WORK
          </h2>
        </div>

        <div className="space-y-28 md:space-y-40">
          {projects.map((project, i) => (
            <article
              key={project.id}
              className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14"
            >
              <Reveal className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="project-frame" data-cursor="view">
                  <img
                    src={project.image}
                    alt={`${project.name} interface preview`}
                    width={1600}
                    height={1000}
                    loading="lazy"
                  />
                </div>
              </Reveal>

              <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <Reveal>
                  <p className="kicker">
                    {project.index} / {project.kicker}
                  </p>
                  <h3 className="display mt-4 text-5xl text-paper md:text-6xl">{project.name}</h3>
                  <p className="mt-5 text-[1.02rem] leading-relaxed text-paper-dim">
                    {project.description}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-mute">
                    <span className="text-steel">Problem. </span>
                    {project.problem}
                  </p>
                </Reveal>

                <Reveal delay={0.08} className="mt-7">
                  <p className="kicker mb-3">Stack</p>
                  <p className="font-mono text-xs tracking-[0.14em] uppercase text-paper-dim">
                    {project.stack.join('  ·  ')}
                  </p>
                </Reveal>

                <Reveal delay={0.12} className="mt-7">
                  <p className="kicker mb-3">Key features</p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-paper-dim">
                    {project.features.map((f) => (
                      <li key={f} className="border-l border-white/15 pl-3">
                        {f}
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={0.16} className="mt-8 flex flex-wrap gap-3">
                  <Magnetic>
                    <a
                      className="btn btn-solid"
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="hover"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <a
                      className="btn"
                      href={project.live === '#' ? socials.github : project.live}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="hover"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </Magnetic>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
