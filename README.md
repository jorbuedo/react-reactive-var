# react-reactive-var

> Reactive variables for react using hooks.

[![NPM](https://img.shields.io/npm/v/react-reactive-var.svg)](https://www.npmjs.com/package/react-reactive-var) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-reactive-var
```

## Usage

```tsx
import * as React from 'react'

import { useMyHook } from 'react-reactive-var'

const Example = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
```

## License

MIT © [jorbuedo](https://github.com/jorbuedo)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
