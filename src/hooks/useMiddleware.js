import { useRef } from 'react'

/**
 * @param {[Object]} middlewares
 * @return {[Object]}
 */
const sortCallbacks = middlewares =>
  middlewares.sort((a, b) => a.index - b.index).map(({ callback }) => callback)

/**
 * Manage middlewares
 * @returns {{callbacks: Object, add: function(Object): undefined, remove: function(Object): undefined}}
 */
const useMiddleware = () => {
  const middlewares = useRef([])
  const callbacks = useRef([])

  const add = array => {
    const valid = array.reduce(
      (result, middleware) => result && middleware && middleware.callback,
      true,
    )

    if (valid) {
      middlewares.current = [...middlewares.current, ...array]
      callbacks.current = sortCallbacks(middlewares.current)
    } else {
      throw new Error('Middleware must have a callback')
    }
  }

  const remove = array => {
    middlewares.current = middlewares.current.filter(
      middleware => !array.includes(middleware),
    )
    callbacks.current = sortCallbacks(middlewares.current)
  }

  return { callbacks, add, remove }
}

export default useMiddleware
