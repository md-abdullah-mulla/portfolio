import { useCallback, useEffect, useState } from 'react'
import { Loader } from './components/Loader'
import { Cursor } from './components/Cursor'
import { Grain } from './components/Grain'
import { Navbar } from './components/Navbar'
import { Seo } from './components/Seo'
import { Footer } from './components/Footer'
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
import { ReadyContext } from './hooks/useReady'

export default function App() {
  const [ready, setReady] = useState(false)
  const onDone = useCallback(() => setReady(true), [])
  useLenis(ready)

  useEffect(() => {
    document.body.style.overflow = ready ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [ready])

  return (
    <ReadyContext.Provider value={ready}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {!ready ? <Loader onDone={onDone} /> : null}
      <Grain />
      {ready ? <Cursor /> : null}
      <div className={ready ? 'opacity-100' : ''}>
        <Navbar />
        <Seo />
        <main id="main" itemScope itemType="https://schema.org/ProfilePage">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Journey />
          <Education />
          <Achievements />
          <Philosophy />
          <Contact />
        </main>
        <Footer />
      </div>
    </ReadyContext.Provider>
  )
}
