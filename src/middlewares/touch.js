/**
 * Process TouchEvent.
 * @param {{index: number}}
 * @returns {{index: boolean, callback: function(Object): Object}}
 */
const touch = ({ index } = {}) => {
  let touches = []

  return {
    index,
    callback: ({ trigger, delta }) => {
      if (trigger instanceof window.TouchEvent) {
        if (trigger.type === 'touchmove') {
          // The delta is from the average delta of all changed touches.
          const screenDeltaSum = Array.from(trigger.changedTouches).reduce(
            (sum, { identifier, screenX, screenY }) => {
              const {
                screenX: prevScreenX,
                screenY: prevScreenY,
              } = touches.find(({ identifier: id }) => id === identifier)

              const screenDelta = {
                x: screenX - prevScreenX,
                y: screenY - prevScreenY,
              }

              return {
                x: sum.x + screenDelta.x,
                y: sum.y + screenDelta.y,
              }
            },
            { x: 0, y: 0 },
          )

          const averageScreenDelta = {
            x: screenDeltaSum.x / trigger.changedTouches.length,
            y: screenDeltaSum.y / trigger.changedTouches.length,
          }

          touches = Array.from(trigger.touches)

          return { x: -averageScreenDelta.x * 2, y: -averageScreenDelta.y * 2 }
        }

        touches = Array.from(trigger.touches)
      }

      return delta
    },
  }
}

export default touch
