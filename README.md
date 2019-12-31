# React Scroll Composer

## Installation

```sh
npm install react-scroll-composer
```

## Concept

A scroll is composed of three steps:

1. Trigger: an `Event` or a custom trigger.
2. Middleware: Middlewares are assembled into a pipeline. Each middleware receives the delta from the previous one, and returns a new delta.
3. Scroll

> If you keep the native scroll, the delta will be ignored, because the scroll is controled by the browser. But you can still use middlewares to add some scroll effects.

## API

### `Provider`

```jsx
import { Provider } from 'react-scroll-composer'

const App = () => <Provider native={false}>{/* ... */}</Provider>
```

### `useComposer`

```jsx
import { useComposer } from 'react-scroll-composer'
import { key, touch, wheel } from 'react-scroll-composer/lib/middlewares'

const Component = () => {
  const trigger = useComposer([
    key({ order: 0 }),
    touch({ order: 1 }),
    wheel({ order: 2 }),
  ])

  useEffect(() => {
    trigger(/* ... */)
  }, [])
}
```

The argument of `useComposer` can be `undefined`, one middleware, or an array of middlewares.

The value passed to `trigger` will be consumed by the middlewares. If the scroll is native, this will NOT scroll the page.

## Middleware

```js
const middleware = {
  index: 0,
  callback: ({ value, trigger, delta }) => {
    // ...
    return { x, y }
  },
}
```

`index` defines the position of the middleware in the pipeline.

In `callback`:

- `value` is the current scroll position, which has properties `x` and `y`.
- `trigger` can be an event of type `keydown`, `touchstart`, `touchmove`, `touchend`, `touchcancel`, or `wheel`. It can also be an object provided in `trigger`.
- `delta` has properties `x` and `y`.

React Scroll Composer provides three middlewares to handle the three types of events:

- `key`: `KeyboardEvent`
- `touch`: `TouchEvent`
- `wheel`: `WheelEvent`
