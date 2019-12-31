import { useRef, useEffect } from 'react'

/**
 * Call middlewares and scroll.
 * @param {{native: boolean, triggers: Object, callbacks: Object}}
 */

const useComposition = ({ native, triggers, callbacks }) => {
  const value = useRef({
    x: window ? window.scrollX : 0,
    y: window ? window.scrollY : 0,
  })
  useEffect(() => {
    let requestID
    const update = () => {
      triggers.current.forEach(trigger => {
        const delta = callbacks.current.reduce(
          (prevDelta, callback) => {
            const currDelta = callback({
              value: value.current,
              trigger,
              delta: prevDelta,
            })

            if (
              !currDelta ||
              currDelta.x === undefined ||
              currDelta.y === undefined
            ) {
              throw new Error('Middleware must return a delta')
            } else {
              return currDelta
            }
          },
          { x: 0, y: 0 },
        )

        if (!native) {
          // Bound by the edges of the window.
          value.current = {
            x: Math.max(
              Math.min(
                value.current.x + delta.x,
                document.documentElement.offsetWidth - window.innerWidth,
              ),
              0,
            ),
            y: Math.max(
              Math.min(
                value.current.y + delta.y,
                document.documentElement.offsetHeight - window.innerHeight,
              ),
              0,
            ),
          }
        }
      })

      if (native) {
        value.current = {
          x: window.scrollX,
          y: window.scrollY,
        }
      } else {
        window.scrollTo(value.current.x, value.current.y)
      }

      triggers.current = []

      requestID = window.requestAnimationFrame(update)
    }

    update()

    return () => window.cancelAnimationFrame(requestID)
  }, [native, triggers, callbacks])
}

export default useComposition
