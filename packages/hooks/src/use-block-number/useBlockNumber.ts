import { useEffect, useRef, useState } from 'react'
import { Block } from '@terra-money/terra.js'

import { CHAIN_ID, TERRA_WS_CLIENT } from '../utils/constants'
import { TerraWebSocketEvent } from '../types'

export const useBlockNumber = () => {
  const wsClientRef = useRef<WebSocket | null>(null)

  const [blockNumber, setBlockNumber] = useState<Block>()
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState<Event | CloseEvent>()

  useEffect(() => {
    wsClientRef.current = new WebSocket(TERRA_WS_CLIENT)

    wsClientRef.current.onopen = () => {
      setConnected(true)
      if (wsClientRef && wsClientRef.current) {
        wsClientRef.current.send(
          JSON.stringify({
            subscribe: TerraWebSocketEvent.NEW_BLOCK,
            chain_id: CHAIN_ID
          })
        )
      }
    }

    wsClientRef.current.onclose = (error) => {
      setConnected(false)
      setError(error)
    }

    wsClientRef.current.onerror = (error) => {
      setConnected(false)
      setError(error)
    }

    wsClientRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data)
      setBlockNumber(message.data.block)
    }
  }, [setBlockNumber])

  return { connected, error, blockNumber }
}
