import { Flex, SegmentedControl } from 'gestalt'
import React from 'react'
import CustomCodeBlock from './CustomCodeBlock'

const PEER_DEPS = '\n// Add peer dependencies\nyarn add rxjs'
  + ' @terra-money/terra.js\n@terra-money/wallet-provider'
export const Tabs = ({ itemIndex, setItemIndex }) => {
  const props = {
    items: ['Hooks', 'Components', 'UI-Assets'],
    selectedItemIndex: itemIndex,
    onChange: ({ activeIndex }) => setItemIndex(activeIndex)
  }

  return (
    <Flex direction='column' flex='grow'>
      <div className='pt-8' style={{ minHeight: 268 }}>
        <h3
          className='text-left text-xl font-bold mb-2'
        >
          Installation
        </h3>
        <SegmentedControl {...props} />
        <CustomCodeBlock
          js={`${itemIndex === 1
            ? `// Coming soon`
            : `yarn add @react-terra/${props.items[itemIndex].toLowerCase()}`}${itemIndex === 0
              ? PEER_DEPS
              : ''}`.trim()}
        />
      </div>
    </Flex>
  )
}
