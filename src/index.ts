import { useEffect, useState } from 'react'

export type ReactiveVar<T> = {
  (newValue?: T): T
  subscribe: (handler: Function) => () => void
  unsubscribe: (handler: Function) => void
}

type EqualsFunc<T> = (a: T, b: T) => boolean

export const makeVar = <T extends unknown>(initialValue: T, equalsFunc?: EqualsFunc<T>): ReactiveVar<T> => {
  let value = initialValue
  const subscribers = new Set<Function>()

  const reVar = (newValue?: T) => {
    if (newValue !== undefined && (equalsFunc? !equalsFunc(newValue, value) : newValue !== value)) {
      value = newValue
      subscribers.forEach((handler) => handler(value))
    }
    return value
  }

  reVar.subscribe = (handler: Function) => {
    subscribers.add(handler)
    return () => subscribers.delete(handler)
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
