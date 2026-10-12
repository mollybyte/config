import { useState } from 'react'
import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  disabled?: boolean
  onPress: () => void
}

function Button({ children, disabled, onPress }: ButtonProps) {
  return (
    <button disabled={disabled} type="button" onClick={onPress}>
      {children}
    </button>
  )
}

export function Card({ title }: { title: string }) {
  const [count, setCount] = useState(0)
  return (
    <div className="card">
      <img alt={title} src="/a.png" />
      <Button disabled onPress={() => setCount(count + 1)}>
        {title} {count}
      </Button>
    </div>
  )
}
