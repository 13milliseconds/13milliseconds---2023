
import Link from 'next/link'
import { useState } from 'react'

import styles from './styles.module.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const menuToggle = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header className={styles.header}>
        <Link href="/" className={styles.header__title}>13milliseconds</Link>
        <button className={styles.header__toggle} onClick={menuToggle}>{menuOpen ? 'Close' : 'Menu'}</button>
        <nav className={`${styles.header__nav} ${menuOpen && styles.header__nav__open}`}>
            <Link href="/projects" className={styles.header__pill}>Work</Link>
            <Link href="/about" className={styles.header__pill}>About</Link>
        </nav>
    </header>
  )
}