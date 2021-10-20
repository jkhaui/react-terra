import { parse } from 'flatted'

const createStorage = (provider: Storage) => ({
  get(key: string, defaultValue: () => any) {
    const json = provider.getItem(key)
    // eslint-disable-next-line no-nested-ternary
    return json === null || typeof json === 'undefined'
      ? typeof defaultValue === 'function'
        ? defaultValue()
        : defaultValue
      : parse(json)
  },
  set(key: string, value: string) {
    provider.setItem(key, value)
  }
})

export default createStorage
