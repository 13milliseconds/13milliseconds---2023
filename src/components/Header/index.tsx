import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import Link from 'next/link'
import { useRouter } from "next/router"
import { useState } from 'react'

import styles from './styles.module.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const menuToggle = () => {
    setMenuOpen(!menuOpen)
  }
  const router = useRouter()
  const isHome = router.pathname == '/'

  const { scrollY } = useScroll();
  const [transitionPercent, setTransitionPercent] = useState(0)
  const transitionThreshold = 250
  useMotionValueEvent(scrollY, "change", (scrollPos) => {
    setTransitionPercent(Math.max((100 - (scrollPos * 100 / transitionThreshold)), 0))
  })

  const mainTitle = <Link href="/" className={`${styles.header__title}`}>13milliseconds</Link>

  return (
    <header className={styles.header}>{
      isHome ? 
      <motion.div 
        className={`${styles.header__title} ${isHome && styles.header__title__home}`} 
        style={{ 
          translateY: -transitionPercent,
          filter: `blur(${transitionPercent * .1}px)`,
          opacity: 1 - transitionPercent / 100,
        }} 
      >{mainTitle}</motion.div> : mainTitle }
        <button className={styles.header__toggle} onClick={menuToggle}>{menuOpen ? 'Close' : 'Menu'}</button>
        <nav className={`${styles.header__nav} ${menuOpen && styles.header__nav__open}`}>
            <Link href="/projects" className={styles.header__pill}>Work</Link>
            <Link href="/about" className={styles.header__pill}>About</Link>
            <Link href="/contact" className={styles.header__pill}>Contact</Link>
        </nav>
    </header>
  )
}