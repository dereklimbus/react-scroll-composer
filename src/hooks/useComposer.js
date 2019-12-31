import { useContext, useEffect } from 'react'
import Context from '../Context'

/**
 * @param {(undefined|Object|[Object])} middlewares
 * @returns {function(Object): undefined}
 */
const useComposer = middlewares => {
  const { trigger, addMiddlewares, removeMiddlewares } = useContext(Context)

  useEffect(() => {
    if (middlewares) {
      const array = Array.isArray(middlewares) ? middlewares : [middlewares]
      addMiddlewares(array)

      return () => removeMiddlewares(array)
    }
  }, [middlewares, addMiddlewares, removeMiddlewares])

  return trigger
}

export default useComposer
