import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <Image alt="Hero" height={300} src="/hero.png" width={600} />
      <Link className="link" href="/about">
        About
      </Link>
    </main>
  )
}
