import { education } from '../utils/data'
import { Reveal } from '../components/Reveal'

export function Education() {
  return (
    <section id="education" className="section border-t border-white/5" aria-labelledby="edu-title">
      <div className="section-wide">
        <p className="section-index">05 — Study</p>
        <h2 id="edu-title" className="display mt-4 text-[12vw] text-paper md:text-[5.6rem]">
          EDUCATION
        </h2>

        <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
          {education.map((item) => (
            <Reveal key={item.program} className="grid gap-4 py-10 md:grid-cols-12 md:items-end">
              <div className="md:col-span-4">
                <p className="kicker">{item.program}</p>
                <h3 className="mt-3 type-d text-3xl tracking-tight text-paper md:text-4xl">
                  {item.field}
                </h3>
              </div>
              <div className="md:col-span-5">
                <p className="text-lg text-paper">{item.place}</p>
              </div>
              <p className="text-sm leading-relaxed text-paper-dim md:col-span-3 md:text-right">
                {item.note}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
