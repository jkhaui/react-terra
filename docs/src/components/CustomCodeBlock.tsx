import React, { useState } from 'react'
import CodeBlock from '@theme/CodeBlock'

export default function CustomCodeBlock({
                                          code,
                                          highlight,
                                          js,
                                          jsHighlight,
                                          response
                                        }) {
  const [showResponse, setShowResponse] = useState(true)

  let wrapperClass = ''

  if (response) {
    wrapperClass += ' code-with-response'
  }

  return (
    <div className="code-wrapper pt-4">
      <div className={wrapperClass}>
        <>
          {code && (
            <CodeBlock className={'bash'} metastring={highlight}>
              {code}
            </CodeBlock>
          )}
          {js && <CodeBlock metastring={jsHighlight}>{js}</CodeBlock>}
        </>
      </div>
      {response && (
        <>
          <div className={'code-with-header repsonse-header'}>
            <a
              className='code-header has-hover-pointer'
              style={showResponse
                ? styles.responseShown
                : styles.responseHidden}
              onClick={() => setShowResponse(!showResponse)}
            >
              {showResponse ? 'Hide' : 'Show'} Response
            </a>
            {showResponse && <CodeBlock>{response}</CodeBlock>}
          </div>
        </>
      )}
    </div>
  )
}

const styles = {
  responseShown: {
    textAlign: 'right',
    display: 'block',
    borderRadius: '0',
    color: 'var(--custom-primary)',
    borderTop: '1px solid #444'
  },
  responseHidden: {
    textAlign: 'right',
    display: 'block',
    borderBottom: 'none',
    borderRadius: '0 0 4px 4px',
    borderTop: '1px solid #444',
    color: '#ccc'
  }
}
