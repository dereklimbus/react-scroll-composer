import { useEffect } from 'react'

/**
 * Configurate the composer
 * @param {{native: boolean}}
 */
const useConfig = ({ native }) => {
  useEffect(() => {
    if (!native) {
      document.documentElement.style.overflow = 'hidden'

      return () => {
        document.documentElement.style.overflow = 'initial'
      }
    }
  }, [native])
}

export default useConfig
