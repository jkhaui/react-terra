import React from 'react'
import useThemeContext from '@theme/hooks/useThemeContext'
import ReactPlayer from 'react-player'
import useBaseUrl from '@docusaurus/core/lib/client/exports/useBaseUrl'
import { Flex } from 'gestalt'

export const PreviewSection = () => {
  const { isDarkTheme } = useThemeContext()
  return (
    <section
      id='hooks-preview'
      style={{
        height: '100vH',
        backgroundColor: isDarkTheme ? '#18191A' : '#FFF'
      }}
      className='flex flex-col items-center justify-center w-full'
    >
      <Flex direction='column' justifyContent='center' alignItems='center'>
        <h1
          className='text-5xl font-bold sm:text-5xl
                    sm:tracking-tight lg:text-5xl'
        >Demo
        </h1>
        <p
          className={`mb-8 mt-2 text-left text-xl text-gray-${isDarkTheme
            ? '3'
            : '7'}00`}
        >
          Basic wallet implementation with the <code>useLiveBalances</code> hook
        </p>
      </Flex>
      <ReactPlayer
        width={800}
        playing
        loop
        url={`${useBaseUrl('/video/terra-wallet.mp4')}`}
      />
    </section>
  )
}
