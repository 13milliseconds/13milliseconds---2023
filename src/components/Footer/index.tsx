import styles from './styles.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__title}>Contact us</div>
      <div className={styles.footer__content}>We’re based in Upstate New York. Time Zone EST.
        <a href="mailto:hello@13milliseconds.com" target='_blank'>hello@13milliseconds.com</a></div>
    </footer>
  )
}
