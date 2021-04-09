import React from 'react'
import { testVar } from './vars'

export default () => {
  const handleClick = () => testVar(testVar() + 1)
  return <button onClick={handleClick}>Click!</button>
}
