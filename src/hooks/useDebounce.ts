import * as React from 'react'

export const useDebounce = <T,>(value: T, delayMs = 300) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value)

  React.useEffect(() => {
    const handle = window.setTimeout(() => setDebouncedValue(value), delayMs)
    return () => window.clearTimeout(handle)
  }, [value, delayMs])

  return debouncedValue
}
