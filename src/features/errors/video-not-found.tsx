import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export default function VideoNotFoundError() {
  const navigate = useNavigate()

  return (
    <div className='flex items-center justify-center my-36 h-full w-full flex-col gap-2'>
      <span className='font-medium'>Oops! Video Not Found!</span>
      <p className='text-center text-muted-foreground'>
        It seems like the video you're looking for <br />
        does not exist or might have been removed.
      </p>
      <div className='mt-6 flex gap-4'>
        <Button variant='outline' onClick={() => history.go(-1)}>
          Go Back
        </Button>
        <Button onClick={() => navigate({ to: '..' })}>Back to History</Button>
      </div>
    </div>
  )
}
