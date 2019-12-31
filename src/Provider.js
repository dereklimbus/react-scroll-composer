import React from 'react'
import PropTypes from 'prop-types'
import { useConfig, useTrigger, useMiddleware, useComposition } from './hooks'
import Context from './Context'

const Provider = ({ native, children }) => {
  useConfig({ native })

  const { triggers, trigger } = useTrigger()

  const {
    callbacks,
    add: addMiddlewares,
    remove: removeMiddlewares,
  } = useMiddleware()

  useComposition({ native, triggers, callbacks })

  return (
    <Context.Provider value={{ trigger, addMiddlewares, removeMiddlewares }}>
      {children}
    </Context.Provider>
  )
}

Provider.propTypes = {
  native: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

Provider.defaultProps = {
  native: false,
}

export default Provider
