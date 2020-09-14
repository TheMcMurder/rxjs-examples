import React, {useEffect, useState, useRef} from 'react'
import { fromEvent } from 'rxjs'

export default function ButtonClicksExample() {
  const [clicks, setClicks] = useState([])
  const buttonRef = useRef()
  useEffect(
    () => {
      const button$ = fromEvent(buttonRef.current, 'click')
      const sub = button$.subscribe(
        () => {
          setClicks((existing) => [...existing, `click-${existing.length+1}`])
        }
      )
      return () => sub.unsubscribe()
    },
    []
  )

  return (
    <div>
      <button 
        style={{margin: '2rem', fontSize: '1.25rem'}}
        ref={buttonRef}
      >
        Click me
      </button>
      <div style={{fontSize: '1.25rem'}}>
        Clicks: {JSON.stringify(clicks)}
      </div>
    </div>
  )
}