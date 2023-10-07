import Marquee from "react-fast-marquee";

import styles from './styles.module.css'


export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Marquee autoFill pauseOnHover>
      <div className={styles.footer__content}>
        <span>We’re based in Upstate New York.</span>
        <span>Time Zone EST.</span>
        <a href="mailto:hello@13milliseconds.com" target='_blank'>hello@13milliseconds.com</a></div>  
      </Marquee>

    </footer>
  )
}
