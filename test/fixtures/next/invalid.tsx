import Link from 'next/link'
import fs from 'node:fs'

export function Gallery({ items }: { items: any[] }) {
  ;[1, 2].forEach(n => console.log(n, fs))
  return (
    <div>
      <img src="/hero.png" alt="Hero" />
      <input type="image" src="/button.png" />
      <Link href="/about" className={'link'}>
        About {items.length}
      </Link>
    </div>
  )
}
