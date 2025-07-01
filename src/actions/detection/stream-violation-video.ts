import { ViolationStreamData } from '@/types/detections'
import { ENDPOINTS } from '@/api/api-url'

interface StreamCallbacks {
  onOpen?: () => void
  onMessage?: (data: ViolationStreamData) => void
  onClose?: () => void
  onError?: (error: string) => void
}

export const streamViolationVideo = (
  videoId: string,
  callbacks: StreamCallbacks
) => {
  if (!videoId) {
    callbacks.onError?.('Violation: No video ID available')
    throw new Error('Violation: No video ID available')
  }

  const wsUrl = ENDPOINTS.DETECTIONS.STREAM_VIOLATIONS(videoId)
  const ws = new WebSocket(wsUrl)
  ws.binaryType = 'arraybuffer'

  let pendingMetadata: ViolationStreamData | null = null

  ws.onopen = () => {
    console.log('Violation WebSocket connection established')
    callbacks.onOpen?.()
  }

  ws.onmessage = (event) => {
    console.log(event.data)
    if (typeof event.data === 'string') {
      try {
        const result = JSON.parse(event.data) as Omit<
          ViolationStreamData,
          'image_url'
        >
        pendingMetadata = { ...result, image_url: '' }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? `Error parsing violation data: ${error.message}`
            : 'Error parsing violation data'
        console.error(errorMessage, error)
        callbacks.onError?.(errorMessage)
      }
    } else {
      const bytes = new Uint8Array(event.data)
      const blob = new Blob([bytes], { type: 'image/jpeg' })
      const url = URL.createObjectURL(blob)

      if (pendingMetadata) {
        const completeData: ViolationStreamData = {
          ...pendingMetadata,
          image_url: url,
        }
        callbacks.onMessage?.(completeData)
        pendingMetadata = null
      } else {
        console.warn('Received image without prior metadata')
        URL.revokeObjectURL(url)
      }
    }
  }

  ws.onclose = () => {
    console.log('Violation WebSocket connection closed')
    if (pendingMetadata) {
      console.warn('WebSocket closed with pending metadata')
    }
    callbacks.onClose?.()
  }

  ws.onerror = (error) => {
    console.error('Violation WebSocket error:', error)
    callbacks.onError?.('Violation WebSocket error occurred')
    throw new Error('An unexpected error occurred during stream violation')
  }

  return ws
}
