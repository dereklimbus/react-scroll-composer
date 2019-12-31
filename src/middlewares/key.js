/**
 * Process KeyboardEvent.
 * @param {{index: number}}
 * @returns {{index: boolean, callback: function(Object): Object}}
 */
const key = ({ index } = {}) => ({
  index,
  callback: ({ trigger, delta }) => {
    if (trigger.type === 'keydown') {
      if (trigger.code === 'ArrowDown') {
        return { x: 0, y: 20 }
      } else if (trigger.code === 'ArrowUp') {
        return { x: 0, y: -20 }
      } else if (trigger.code === 'ArrowRight') {
        return { x: 20, y: 0 }
      } else if (trigger.code === 'ArrowLeft') {
        return { x: -20, y: 0 }
      }
    }

    return delta
  },
})
export default key
