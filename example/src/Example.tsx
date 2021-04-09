import React from 'react'
import { useReactiveVar } from 'react-reactive-var'
import Button from './Button'
import { testVar } from './vars'

export default () => {
  const example = useReactiveVar(testVar)
  return (
    <div>
      <div>{example}</div>
      <Button />
    </div>
  )
}
