import { useCallback, useEffect, useState } from 'react'
import { api } from '../../shop/api'

// Loads `path` and reloads on demand. Returns { data, error, reload }.
export function useLoad(path) {
  const [state, setState] = useState({ data: null, error: '' })
  const reload = useCallback(
    () =>
      api(path)
        .then((data) => setState({ data, error: '' }))
        .catch((err) => setState((s) => ({ ...s, error: err.message }))),
    [path]
  )
  useEffect(() => {
    reload()
  }, [reload])
  return { ...state, reload }
}
