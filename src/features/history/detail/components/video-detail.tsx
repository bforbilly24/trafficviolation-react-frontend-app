import { Videos } from '@/types/detections'

export function VideoDetail({ videoData }: { videoData: Videos }) {
  if (videoData.id === 1) {
    return (
      <div className='space-y-2'>
        <div className='font-medium'>RTSP Link Stream</div>
        <p className='text-sm text-muted-foreground'>
          Video dengan id {videoData.id} merupakan video untuk penyimpanan
          berbagai pelanggaran khusus pada link RTSP Stream
        </p>
      </div>
    )
  }

  return (
    <div className='space-y-2'>
      <div className='flex flex-col gap-y-1 items-start md:flex-row md:items-center'>
        <div className='flex-1 items-center'>
          <p className='text-muted-foreground'>ID</p>
        </div>
        <div className='flex-3 items-center'>
          <p className='font-medium leading-none'>{videoData.id}</p>
        </div>
      </div>
      <div className='flex flex-col gap-y-1 items-start md:flex-row md:items-center'>
        <div className='flex-1 items-center'>
          <p className='text-muted-foreground'>File Name</p>
        </div>
        <div className='flex-3 items-center'>
          <p className='font-medium leading-none'>{videoData.file_name}</p>
        </div>
      </div>
      <div className='flex flex-col gap-y-1 items-start md:flex-row md:items-center'>
        <div className='flex-1 items-center'>
          <p className='text-muted-foreground'>Duration</p>
        </div>
        <div className='flex-3 items-center'>
          <p className='font-medium leading-none'>{videoData.duration}</p>
        </div>
      </div>
      <div className='flex flex-col gap-y-1 items-start md:flex-row md:items-center'>
        <div className='flex-1 items-center'>
          <p className='text-muted-foreground'>Uploaded At</p>
        </div>
        <div className='flex-3 items-center'>
          <p className='font-medium leading-none'>{videoData.created_at}</p>
        </div>
      </div>
    </div>
  )
}
