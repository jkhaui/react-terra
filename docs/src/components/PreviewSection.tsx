import React from 'react'
import useThemeContext from '@theme/hooks/useThemeContext'

export const PreviewSection = () => {
  const { isDarkTheme } = useThemeContext()
  return (
    <section
      style={{
        height: '100vH',
        backgroundColor: isDarkTheme ? '#18191a' : '#FFF'
      }}
      className='w-full'
    >
    </section>
  )
}
