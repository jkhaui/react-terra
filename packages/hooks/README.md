![img.png](logo-type.png)
![img.png](logo-illustration.png)

## Overview

Terra Hooks is an experimental wrapper over the Terra.js API.

The goal is to provide seamless integration out of the box between React apps
and real-time data from the Terra blockchain.

Terra Hooks is _headless_; that is, its only responsibility is providing
re-usable logic. It's up to the developer to decide how the client handles and
renders the resultant data. However, Terra Hooks is designed to work with its
constituent UI library—Terra Components
(coming soon).

## Installation

```shell
  yarn add @react-terra/hooks @terra-money/terra.js rxjs
```

## Example

```jsx
  import { useLiveBalances } from '@terra-hooks/use-live-balances';
```

## Benefits

- Declarative API with minimal surface area
- World-class UX is the first priority
- Conservation of resources is next (observables are lazily invoked)
- All functionality can be easily consumed by dApps—even if developers have no
  knowledge of RxJS

## Design Principles

Terra hooks relies heavily on RxJS. In this way, it follows best practices for
integrating React with RxJS (of which there aren't many resources) [1][2].

The basic idea is that there are "two worlds": the React world (i.e. the _UI
layer_) and the observable world (i.e. the _services layer_).

The React world consists of typical React components. They are light on logic
and do little more than subscribe to a data stream or communicate events back to
the observable world.

The observable world is where RxJS is used to handle complex async logic. This
logic exists as data streams composed of network requests to the Terra
blockchain & events from the browser. The `observable-hooks` library is used to
combine these worlds together.

We can use the example of rendering a user's wallet with stablecoin balances to
bring everything together. Ostensibly, this may seem like a straightforward
task. However:

- Currently, the Terra API doesn't appear to adequately support websockets.
- This leads to poor UX by default as the latest balance changes aren't
  reflected live.
- The only solution is to constantly poll the Terra endpoint for the latest
  data.
- But this creates a new issue of being wasteful with resources.
- Trying to solve all these issues within `useEffect` would lead to a huge mess,
  etc...

Here's how Terra Hooks solves it:

1. Once the user initialises their wallet, create an observable which polls the
   Terra blockchain every 6 seconds.
2. Ensure that any work done after the data has been fetched is _lazy_. That is,
   do not update any local state if the data fetched from the latest network
   request is identical to the previous request.
3. Additionally minimise resource usage by stopping polling if the browser
   window is hidden (and re-commence polling if the browser comes back into
   view).
4. Make this observable multi-case so any React component can subscribe to it
   and listen for balance state changes.

# References

[1]. https://observable-hooks.js.org/

[2]
. https://betterprogramming.pub/reactive-programming-with-react-and-rxjs-88d2789e408a

[3]
. https://redux.js.org/style-guide/style-guide/#do-not-put-non-serializable-values-in-state-or-actions
