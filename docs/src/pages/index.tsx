import React, { useState } from 'react'
import useBaseUrl from '@docusaurus/useBaseUrl'
import clsx from 'clsx'
import GitHubButton from 'react-github-btn'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import styles from './index.module.css'
import useThemeContext from '@theme/hooks/useThemeContext'
import { ColorSchemeProvider, Flex } from 'gestalt'
import CodeSandbox from '../components/CodeSandbox'
import { Tabs } from '../components/Tabs'

import 'gestalt/dist/gestalt.css'
import { PreviewSection } from '../components/PreviewSection'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  const { isDarkTheme } = useThemeContext()
  const [itemIndex, setItemIndex] = useState(0)
  return (
    <div
      className={clsx('hero hero--primary', styles.heroBanner)} style={{
      padding: '0',
  transform: 'translateY(-60px)',
      height: '100vH',
      backgroundImage: `url(${useBaseUrl(
        `/img/illustrations/background-${!isDarkTheme
          ? 'light'
          : 'dark'}.png`)})`
    }}
    >
      <div
        className={`${styles.headerStackContainer} md:px-4 w-full h-full`}
        style={{
          background: `rgba(${!isDarkTheme ? '255,255,255' : '0,0,0'},0.7)`
        }}
      >
        <Flex justifyContent='between' alignItems='center'>
          <div className='w-full h-full'>
            <div className='md:mt-8 lg:mt-8 h-full flex items-stretch max-w-7xl mx-auto pb-4 sm:py-24 lg:flex lg:justify-between'>
              <div className='mx-auto lg:m-0 h-full w-full max-w-sm flex flex-col'>
                <Flex
                  alignItems='start'
                  justifyContent='start'
                  direction='column'
                  flex='grow'
                >
                  <Flex
                    width='100%'
                    flex='grow'
                    justifyContent='between'
                    alignItems='center'
                  >
                    <Flex
                      flex='grow'
                      justifyContent='start'
                      alignItems='center'
                    >
                      <h1
                        className='text-4xl font-bold sm:text-5xl
                    sm:tracking-tight lg:text-3xl'
                      >
                        {siteConfig.title}
                      </h1>
                    </Flex>
                    <Flex flex='grow' justifyContent='end' alignItems='center'>
                      <div className='pt-4'>
                        <GitHubButton
                          href='https://github.com/jkhaui/react-terra'
                          data-icon='octicon-star'
                          data-size='large'
                          data-show-count='false'
                          aria-label='Star React-Terra on GitHub'
                        >
                          Star
                        </GitHubButton>
                      </div>
                    </Flex>
                  </Flex>
                  <p
                    className={`mt-1 text-left text-lg text-gray-${isDarkTheme
                      ? '3'
                      : '7'}00`}
                  >
                    Composable hooks and components to build the future of
                    finance. 🚀
                  </p>
                </Flex>
                <div style={{minHeight:226}} className='flex items-center my-5 text-xl text-gray-400'>
                  <Flex flex='grow'>
                    {itemIndex !== 0 ? (
                      <><Flex flex='grow'>
                        <img
                          width={240}
                          src={useBaseUrl('/img/react-terra.svg')}
                          alt='react-terra logo'
                        />
                      </Flex>
                        <Flex direction='column' flex='grow'>
                          <Flex flex='grow'>
                            <img
                              width={108}
                              src={useBaseUrl('/img/illustrations/rocket-1.png')}
                              alt='Rocket Illustration'
                            />
                          </Flex>
                          <Flex flex='grow'>
                            <img
                              width={108}
                              src={useBaseUrl('/img/illustrations/rocket-2.png')}
                              alt='To the Moon Illustration'
                            />
                          </Flex>
                        </Flex>
                      </>
                    ) : (
                      <img
                        height={226}
                        src={useBaseUrl('/img/terra-hooks-preview.png')}
                        alt='Terra Hooks Illustration'
                      />
                    )}
                  </Flex>
                </div>
                <Flex flex='grow'>
                  <Tabs
                    itemIndex={itemIndex}
                    setItemIndex={setItemIndex}
                  />
                </Flex>
              </div>
              <div className='max-w-4xl'>
                <CodeSandbox />
              </div>
            </div>
          </div>
        </Flex>
      </div>
    </div>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <ColorSchemeProvider colorScheme='dark' id='Docs'>
      <Layout
        title={`${siteConfig.title} ${siteConfig.titleDelimiter} ${siteConfig.tagline}`}
        description=''
      >
        <HomepageHeader />
<PreviewSection/>
      </Layout>
    </ColorSchemeProvider>
  )
}
