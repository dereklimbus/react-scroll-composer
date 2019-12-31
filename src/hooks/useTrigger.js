import { useRef, useEffect } from 'react'

const events = [
  'keydown',
  'touchstart',
  'touchmove',
  'touchend',
  'touchcancel',
  'wheel',
]

/**
 * Manage triggers.
 * @returns {{triggers: Object, trigger: Object}}
 */
const useTrigger = () => {
  const triggers = useRef([])
  const trigger = object => triggers.current.push(object)
  useEffect(() => {
    events.forEach(event => {
      window.addEventListener(event, trigger)
    })

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, trigger)
      })
    }
  }, [])

  return { triggers, trigger }
}

export default useTrigger
