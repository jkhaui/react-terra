import { useEffect } from 'react'

export const useDebouncedEffect = (
  effect: () => void,
  deps: any,
  delay: number | undefined
) => {
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay)

    return () => clearTimeout(handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps || [], delay])
}
