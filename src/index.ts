import { useEffect, useState } from 'react'

export type ReactiveVar<T> = {
  (newValue?: T | ((value: T) => T)): T
  subscribe: (handler: Function) => () => void
  unsubscribe: (handler: Function) => void
}

type EqualsFunc<T> = (a: T, b: T) => boolean

export const makeVar = <T extends unknown>(initialValue: T, equalsFunc?: EqualsFunc<T>): ReactiveVar<T> => {
  let value = initialValue
  const subscribers = new Set<Function>()

  const reactiveVar = (newValue?: T | ((value: T) => T)) => {
    if (newValue !== undefined) {
      let nextValue = value

      if (newValue instanceof Function) {
        nextValue = newValue(value)
      } else {
        nextValue = newValue
      }

      if (equalsFunc? !equalsFunc(nextValue, value) : nextValue !== value) {
        subscribers.forEach((handler) => handler(nextValue))
      }
      value = nextValue
    }
    return value
  }

  reactiveVar.subscribe = (handler: Function) => {
    subscribers.add(handler)
    return () => subscribers.delete(handler)
  }

  reactiveVar.unsubscribe = (handler: Function) => {
    subscribers.delete(handler)
  }

  return reactiveVar
}

export const useReactiveVar = <T extends unknown>(reactiveVar: ReactiveVar<T>) => {
  const [value, setValue] = useState<T>(reactiveVar())

  useEffect(() => {
    const handler = (v: T) => setValue(v)
    reactiveVar.subscribe(handler)
    return () => {
      reactiveVar.unsubscribe(handler)
    }
  }, [])

  return value
}
