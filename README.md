# @react-terra

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-brightgreen.svg?maxAge=2592000)](https://conventionalcommits.org)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![TypeScript>=4](https://img.shields.io/badge/TypeScript-%E2%89%A54-%233178c6)

---

[comment]: <> (![@react-terra]&#40;react-terra.svg | width = 200&#41;)
<img src="react-terra.svg" width='240' alt='react-terra logo'>

---

⚠️Warning! This library is in a highly experimental state. It is 
not currently recommended for production use. 

Furthermore, react-terra **has not been updated for Terra 2.0** and is currently in broken state due to outdated dependencies. 

However, contributions are welcome and encouraged 🚀⚠️

**👉 Visit [react-terra.dev](https://react-terra.dev) for full docs**

---

## Installation

[**Hooks only at the moment.** Component library coming soon]

```shell
  yarn add @react-terra/hooks @terra-money/terra.js 
  @terra-money/wallet-provider rxjs
```

Follow the instructions from https://github.com/terra-money/wallet-provider
to wrap your app in the wallet provider:

```jsx
import {
  NetworkInfo,
  WalletProvider,
  WalletStatus,
  getChainOptions,
} from '@terra-money/wallet-provider';
import React from 'react';
import ReactDOM from 'react-dom';

// getChainOptions(): Promise<{ defaultNetwork, walletConnectChainIds }>
getChainOptions().then((chainOptions) => {
  ReactDOM.render(
    <WalletProvider {...chainOptions}>
      <YOUR_APP />
    </WalletProvider>,
    document.getElementById('root'),
  );
});
```

## Run in Dev Mode

_n.b. you need to have the [Terra Station extension for Chrome/Brave](https://chrome.google.com/webstore/detail/terra-station/aiifbnbfobpmeekipheeijimdpnlpgpp?hl=en) 
installed, along with a wallet address._

- From the root directory, run `yarn`
- In a terminal window, run the following command: 
  > yarn start:hooks

- Then, in a second terminal:

  cd into `example`;

  Run the following command:
  > yarn start
