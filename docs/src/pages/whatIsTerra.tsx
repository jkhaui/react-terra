import React from 'react'
import Layout from '@theme/Layout'
import { Icon } from 'gestalt'
import clsx from 'clsx'
import styles from './whatIsTerra.module.css'
import useThemeContext from '@theme/hooks/useThemeContext'
import useBaseUrl from '@docusaurus/core/lib/client/exports/useBaseUrl'

export default function WhatIsTerraPage(): JSX.Element {
  return (
    <Layout title='What Is Terra'>
      <WhatIsTerra />
    </Layout>
  )
}
const WhatIsTerra = () => {
  const { isDarkTheme } = useThemeContext()
  return (
    <div
      className={clsx('hero hero--primary', styles.heroBanner)} style={{
      padding: '0',
      transform: 'translateY(-60px)',
      minHeight: 'calc(100vH + 60px)',
      backgroundImage: `url(${useBaseUrl(
        `/img/illustrations/background-${!isDarkTheme
          ? 'light'
          : 'dark'}.png`)})`
    }}
    >
      <div
        className={`${styles.headerStackContainer} md:px-4 w-full h-full`}
        style={{
          background: `rgba(${!isDarkTheme ? '255,255,255' : '0,0,0'},0.7)`,
          minHeight: 'calc(100vH + 60px)'
        }}
      >
        <div
          className='w-full h-full'
          style={{ minHeight: 'calc(100vH + 60px)' }}
        >
          {/*<div><Icon accessibilityLabel='arrow-back' /></div>*/}
          <div className='mt-16 relative py-16 overflow-hidden'>
            <div className='relative px-4 sm:px-6 lg:px-8'>
              <div className='text-lg max-w-prose mx-auto'>
                <h1>
            <span className='block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase'>
              What Is The
            </span>
                  <span className='mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
                Terra Network
            </span>
                </h1>
                <p className='text-left mt-8 mx-auto text-xl text-gray-100 leading-8'>
                  Terra is a next-generation blockchain payments network and
                  DeFi ecosystem. Powered by its native staking asset—Luna—and a
                  basket of synthetic stablecoins, this is what the future of
                  finance looks like.
                </p>
              </div>
              <div className='mt-6 prose prose-indigo prose-lg text-gray-100 mx-auto'>
                <p className='font-bold text-left mx-auto'>
                  Reasons to build on Terra
                </p>
                <ul className='text-left mx-auto' role='list'>
                  <li>
                    Proven Scalability: Terra processes the most transactions
                    of any blockchain after Bitcoin and Ethereum.
                  </li>
                  <li>Future-Proof Tech Stack: The Terra Network is built from
                      the Cosmos SDK and inherits future-proof features,
                      including WebAssembly and smart contracts written in Rust.
                  </li>
                  <li>Build for a passionate & growing community: Terra's
                      community is always enthusiastic about supporting new
                      Dapps
                      launched within the ecosystem, as evidence by over $7
                      billion currently locked within the network's protocols
                      [1].
                  </li>
                </ul>
                <p className='text-left mt-16 mx-auto'>
                  [1]. <a
                  href='https://www.apollocap.io/2021/09/defi-tvl-boom/'
                  rel='noopener noreferrer'
                  target='_blank'
                >https://www.apollocap.io/2021/09/defi-tvl-boom/</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
