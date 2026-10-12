import { useState } from 'react'
import type { ReactNode } from 'react'

function Button(props: { disabled?: boolean; children: ReactNode; onPress: () => void }) {
  return <button type="button" onClick={props.onPress} disabled={props.disabled}>{props.children}</button>
}

export function Card({ title, data }: { title: string; data: any }) {
  const [count, setCount] = useState(0)
  return (
    <div className={'card'}>
      <img src="/a.png" />
      <Button onPress={() => setCount(count + 1)} disabled={true}>
        {title} {String(data)}
      </Button>
    </div>
  )
}

export function Conditional({ enabled }: { enabled: boolean }) {
  if (enabled) {
    useState(1)
  }
  return null
}
