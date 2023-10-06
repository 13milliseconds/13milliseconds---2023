
import Link from 'next/link'

import styles from './styles.module.css'

export default function Header() {

  return (
    <header className={styles.header}>
        <nav className={styles.header__nav}>
            <Link href="/work" className={styles.header__pill}>Work</Link>
            <Link href="/">13milliseconds</Link>
            <Link href="/about" className={styles.header__pill}>About</Link>
        </nav>
    </header>
  )
}