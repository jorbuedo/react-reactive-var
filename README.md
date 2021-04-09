# react-reactive-var

> Reactive variables for react using hooks.

[![NPM](https://img.shields.io/npm/v/react-reactive-var.svg)](https://www.npmjs.com/package/react-reactive-var) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-reactive-var
```

## Usage

```ts
// vars.ts

import { makeVar } from 'react-reactive-var'

export const counterVar = makeVar<number>(0)
```

```tsx
// button.tsx

import React from 'react'
import { counterVar } from './vars'

export default () => {
  const handleClick = () => counterVar(counterVar() + 1)
  return <button onClick={handleClick}>Click!</button>
}
```

```tsx
// example.tsx

import React from 'react'
import { useReactiveVar } from 'react-reactive-var'
import Button from './Button'
import { counterVar } from './vars'

export default () => {
  const example = useReactiveVar(counterVar)
  return (
    <div>
      <div>{example}</div>
      <Button />
    </div>
  )
}
```

## License

MIT © [jorbuedo](https://github.com/jorbuedo)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
