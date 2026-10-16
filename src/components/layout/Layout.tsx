import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const previous = useRef(pathname)

  useEffect(() => {
    if (previous.current !== pathname) {
      previous.current = pathname
      window.scrollTo(0, 0)
      mainRef.current?.focus()
    }
  }, [pathname])

  return (
    <>
      <a href="#contenu" className="skip-link">Aller au contenu</a>
      <p className="demo-bar">Contenu de démonstration : les lieux présentés sont fictifs.</p>
      <Header />
      <main id="contenu" ref={mainRef} tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}