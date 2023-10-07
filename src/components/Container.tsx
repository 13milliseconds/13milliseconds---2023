import Link from 'next/link'

import Footer from './Footer'
import Header from './Header'

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <>
      
      <main>{children}</main>
      <Footer />
    </>
  )
}
