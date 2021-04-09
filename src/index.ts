import { useEffect, useState } from 'react'

type ReactiveVar<T> = {
  (newValue?: T): T
  subscribe: (handler: Function) => void
  unsubscribe: (handler: Function) => void
}

export const makeVar = <T extends unknown>(initialValue: T): ReactiveVar<T> => {
  let value = initialValue
  const subscribers = new Set<Function>()

  const reVar = (newValue?: T) => {
    if (newValue !== undefined && newValue !== value) {
      value = newValue
      subscribers.forEach((handler) => handler(value))
    }
    return value
  }

  reVar.subscribe = (handler: Function) => {
    subscribers.add(handler)
  }

  reVar.unsubscribe = (handler: Function) => {
    subscribers.delete(handler)
  }

  return reVar
}

export const useReactiveVar = <T extends unknown>(reVar: ReactiveVar<T>) => {
  const [value, setValue] = useState<T>(reVar())

  useEffect(() => {
    const handler = (v: T) => setValue(v)
    reVar.subscribe(handler)
    return () => {
      reVar.unsubscribe(handler)
    }
  }, [])

  return value
}
