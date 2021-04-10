# react-reactive-var

> Reactive variables for react using hooks.

[![NPM](https://img.shields.io/npm/v/react-reactive-var.svg)](https://www.npmjs.com/package/react-reactive-var) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [License](#license)

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

[View the example](https://jorbuedo.github.io/react-reactive-var/)

## API

### makeVar

Creates a new reactive variable, which is a tiny evented variable.

**Parameters**

- `initialValue` First parameter sets the initial value of the variable.
- `equalsFunc` *Optional* equals function to compare current value with a new one. Without it a strict equality operation is used.

**Returns** a `ReactiveVar`
### useReactiveVar

A react hook that subscribes to changes in a `ReactiveVar` to rerender the component when the variable changes. Must follow the [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html).

**Parameters**

- `ReactiveVar`

### *type* ReactiveVar
 - It's a function. Call it without parameters to get the value. Call it with a parameter to set the value.
 - `.subscribe` Attribute function. Call it with a handler to be called whenever the variable is updated. Returns an unsuscribe function.
 - `.unsuscribe` Attribute function. Call it with the same handler as the subscribe function to unsuscribe.

## License

MIT © [jorbuedo](https://github.com/jorbuedo)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
