import Link from 'next/link'

import styles from './styles.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
        <nav className={styles.header__nav}>
            <ul>
                <li><Link href="/work">Work</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
            </ul>
        </nav>
        <Link className={styles.header__title} href="/">
            13milliseconds
        </Link>
    </header>
  )
}