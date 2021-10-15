import React, { useCallback } from 'react'
import {
  createTheme,
  IStackTokens,
  Stack,
  ThemeProvider
} from '@fluentui/react'
import { useHistory } from 'react-router-dom'
import useBaseUrl from '@docusaurus/useBaseUrl'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import styles from './index.module.css'
import useThemeContext from '@theme/hooks/useThemeContext'
import HomepageFeatures from '../components/HomepageFeatures'
import 'gestalt/dist/gestalt.css'
import { Button } from 'gestalt'

export interface IButtonGroupProps {
  disabled?: boolean;
  checked?: boolean;
}

const stackTokens: IStackTokens = { childrenGap: 40 }
const ButtonGroup: React.FunctionComponent<IButtonGroupProps> = ({
                                                                   disabled,
                                                                   checked
                                                                 }: any) => {
  const history = useHistory()
  return (
    <Stack
      verticalFill
      disableShrink
      grow={1}
      horizontalAlign='center'
      verticalAlign='center'
      horizontal
      tokens={stackTokens}
    >
      <Button
        color={'red'}
        text='@react-terra/hooks'
        onClick={() => history.push('/docs/intro')}
      />
      <Button
        color={'white'}
        onClick={() => window.open(
          'http://github.com/jkhaui/react-terra',
          '_blank'
        )} text='View on GitHub 👉'
      />
    </Stack>
  )
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  const { isDarkTheme } = useThemeContext()
  const getTextColor = useCallback(
    () => !isDarkTheme ? '#1C1E21' : '#FFF',
    [isDarkTheme]
  )
  return (
    <header
      className={clsx('hero hero--primary', styles.heroBanner)} style={{
      padding: '0',
      height: 'calc(100vH - 60px)',
      backgroundImage: `url(${useBaseUrl(
        `/img/illustrations/background-${!isDarkTheme
          ? 'light'
          : 'dark'}.png`)})`
    }}
    >
      <div
        className={styles.headerStackContainer}
        style={{
          width: '100%',
          height: '100%',
          background: `rgba(${!isDarkTheme ? '255,255,255' : '0,0,0'},0.66)`
        }}
      >
        <Stack>
          <h1
            style={{
              color: getTextColor()
            }} className='hero__title'
          >{siteConfig.title}</h1>
        </Stack>
        <Stack>
          <h2
            style={{ color: getTextColor() }}
            className='hero__subtitle'
          >{siteConfig.tagline}</h2>
        </Stack>
        <Stack horizontal>
          <Stack
            className='Header-stack-1'
            horizontal
            horizontalAlign='center'
            verticalAlign='center'
          >
            <Stack maxWidth='25%'>
              <img
                width={800}
                src={useBaseUrl('/img/illustrations/rocket-1.png')}
                alt='Based Logo'
              />
            </Stack>
          </Stack>
          <Stack
            className='Header-stack-2'
            horizontal
            horizontalAlign='center'
            verticalAlign='center'
          >
            <Stack maxWidth='50%'>
              <img
                width={800}
                src={useBaseUrl('/img/based.svg')}
                alt='Based Logo'
              />
            </Stack>
            <Stack
              className='Header-stack-3'
              horizontal
              horizontalAlign='center'
              verticalAlign='center'
            >
              <Stack maxWidth='25%'>
                <img
                  width={800}
                  src={useBaseUrl('/img/illustrations/rocket-2.png')}
                  alt='Based Logo'
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <ButtonGroup />
      </div>
    </header>
  )
}

export default function Home(): JSX.Element {
  const theme = createTheme({
    defaultFontStyle: {
      fontFamily:
        '\'Modern Era\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',\'Roboto\','
        + '\'Oxygen\',\'Ubuntu\',\'Cantarell\',\'Fira Sans\',\'Droid Sans\','
        + '\'Helvetica Neue\',sans-serif'
    }
  })
  const { siteConfig } = useDocusaurusContext()
  return (
    <ThemeProvider theme={theme}>
      <Layout
        title={`${siteConfig.title} • ${siteConfig.tagline}`}
        description=''
      >
        <HomepageHeader />
        <main>
          <HomepageFeatures />
        </main>
      </Layout>
    </ThemeProvider>
  )
}
