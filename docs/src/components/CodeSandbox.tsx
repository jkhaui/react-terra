import React from 'react'

const CODESANDBOX_SRC =
  `https://codesandbox.io/embed/relaxed-hooks-q7pyf?autoresize=1hidedevtools=1&hidenavigation=1&fontsize=12&view=split&codemirror=1&theme=dark`

export default function CodeSandbox(): JSX.Element {
  return (
    <div className='flex flex-grow-1'>
      <iframe
        src={CODESANDBOX_SRC}
        title='jkhaui/react-terra: dynamic'
        sandbox='allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts'
        className='hidden lg:block shadow-2xl'
        style={{
          height: 600,
          width: '42rem',
          border: '0',
          borderRadius: 8,
          overflow: 'hidden',
          position: 'static',
          zIndex: 0
        }}
      />
    </div>
  )
}
