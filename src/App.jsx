import { useCallback, useState } from 'react'
import { Loader } from './components/Loader'
import { Cursor } from './components/Cursor'
import { Grain } from './components/Grain'
import { Navbar } from './components/Navbar'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Journey } from './sections/Journey'
import { Education } from './sections/Education'
import { Achievements } from './sections/Achievements'
import { Philosophy } from './sections/Philosophy'
import { Contact } from './sections/Contact'
import { useLenis } from './hooks/useLenis'

export default function App() {
  const [ready, setReady] = useState(false)
  const onDone = useCallback(() => setReady(true), [])
  useLenis(ready)

  return (
    <>
      <a className="skip-link" href="#home">
        Skip to content
      </a>
      {!ready ? <Loader onDone={onDone} /> : null}
      <Grain />
      {ready ? <Cursor /> : null}
      <div
        className={ready ? 'opacity-100' : 'pointer-events-none h-screen overflow-hidden opacity-0'}
        aria-hidden={!ready}
      >
        {ready ? <Navbar /> : null}
        <main>
          <Hero />
          {ready ? (
            <>
              <About />
              <Skills />
              <Projects />
              <Journey />
              <Education />
              <Achievements />
              <Philosophy />
              <Contact />
            </>
          ) : null}
        </main>
      </div>
    </>
  )
}
