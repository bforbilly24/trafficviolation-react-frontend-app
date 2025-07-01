import { createFileRoute } from '@tanstack/react-router'
import { getVideoById } from '@/actions/detection/get-video-by-id'
import VideoNotFoundError from '@/features/errors/video-not-found'
import HistoryDetailPage from '@/features/history/detail'

export const Route = createFileRoute('/_authenticated/history/$videoId')({
  component: HistoryDetailPage,
  loader: async ({ params }) => {
    const id = params.videoId
    const data = await getVideoById(id)
    if ('error' in data) throw Error('Video not found')
    return data
  },
  pendingComponent: () => {
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <p className='text-center text-muted-foreground'>
          Loading video details...
        </p>
      </div>
    )
  },
  errorComponent: () => {
    return <VideoNotFoundError />
  },
})
