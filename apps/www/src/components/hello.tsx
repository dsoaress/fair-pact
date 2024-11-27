import { useState } from 'react'

export function Hello(): JSX.Element {
  const [counter, setCounter] = useState(0)

  return (
    <main>
      <h1 className="text-3xl">Divisio</h1>
      <p className="text-lg">{counter}</p>
      <button type="button" onClick={(): void => setCounter(prev => prev + 1)}>
        Increment
      </button>
    </main>
  )
}
