import { useCallback, useEffect, useRef, useState } from 'react'
import { parse } from 'flatted'
import useEventListener from '@use-it/event-listener'

import createGlobalState from './createGlobalState'

const usePersistedState = (
  initialState: any,
  key: any,
  {
    get,
    set
  }: {
    get(key: any, defaultValue: any): any
    set(key: any, value: any): void
  }
) => {
  const globalState = useRef(null)
  const [state, setState] = useState(() => get(key, initialState))

  // subscribe to `storage` change events
  // @ts-ignore
  useEventListener('storage', ({ key: k, newValue }) => {
    if (k === key) {
      const newState = parse(newValue)
      if (state !== newState) {
        setState(newState)
      }
    }
  })

  // only called on mount
  useEffect(() => {
    // register a listener that calls `setState` when another instance emits
    // @ts-ignore
    globalState.current = createGlobalState(key, setState, initialState)

    return () => {
      // @ts-ignore
      globalState.current.deregister()
    }
  }, [initialState, key])

  const persistentSetState = useCallback(
    (newState) => {
      const newStateValue =
        typeof newState === 'function' ? newState(state) : newState

      // persist to localStorage
      set(key, newStateValue)

      setState(newStateValue)
      // @ts-ignore
      if (globalState.current && globalState.current.emit) {
        // inform all of the other instances in this tab
        // @ts-ignore
        globalState.current.emit(newState)
      }
    },
    [state, set, key]
  )

  return [state, persistentSetState]
}

export default usePersistedState
