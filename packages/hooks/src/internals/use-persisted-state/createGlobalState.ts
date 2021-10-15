import { Dispatch } from 'react'

const globalState = {}

const createGlobalState = (
  key: string | number,
  thisCallback: Dispatch<any>,
  initialValue: any
) => {
  if (!globalState[key]) {
    globalState[key] = { callbacks: [], value: initialValue }
  }
  globalState[key].callbacks.push(thisCallback)
  return {
    deregister() {
      const arr = globalState[key].callbacks
      const index = arr.indexOf(thisCallback)
      if (index > -1) {
        arr.splice(index, 1)
      }
    },
    emit(value: any) {
      if (globalState[key].value !== value) {
        globalState[key].value = value
        globalState[key].callbacks.forEach(
          (callback: { (arg0: any): void; (value: any): void }) => {
            if (thisCallback !== callback) {
              callback(value)
            }
          }
        )
      }
    }
  }
}

export default createGlobalState
