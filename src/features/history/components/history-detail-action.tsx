import { useNavigate } from '@tanstack/react-router'
import { Videos } from '@/types/detections'
import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HistoryDetailActionProps {
  data: Videos
}

export function HistoryDetailAction({ data }: HistoryDetailActionProps) {
  const navigate = useNavigate()

  const handleOpen = () => {
    navigate({
      to: '/history/$videoId',
      params: { videoId: data.id.toString() },
    })
  }

  return (
    <Button onClick={handleOpen}>
      Detail
      <ExternalLink className='h-4 w-4 ml-2' />
    </Button>
  )
}
