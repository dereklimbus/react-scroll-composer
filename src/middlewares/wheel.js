/**
 * Process WheelEvent.
 * @param {{index: number}}
 * @returns {{index: boolean, callback: function(Object): Object}}
 */
const wheel = ({ index } = {}) => ({
  index,
  callback: ({ trigger, delta }) => {
    if (trigger.type === 'wheel') {
      return {
        x: Math.floor(trigger.deltaX / 2),
        y: Math.floor(trigger.deltaY / 2),
      }
    }

    return delta
  },
})

export default wheel
