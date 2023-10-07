import Marquee from "react-fast-marquee";

import styles from './styles.module.css'


export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Marquee autoFill pauseOnHover>
      <div className={styles.footer__content}>We’re based in Upstate New York. Time Zone EST. <a href="mailto:hello@13milliseconds.com" target='_blank'>hello@13milliseconds.com</a></div>  
      </Marquee>

    </footer>
  )
}
