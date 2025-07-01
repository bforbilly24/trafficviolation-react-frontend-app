import { Videos } from '@/types/detections'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function VideoPlayer({ videoData }: { videoData: Videos }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Video Player</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='border rounded-lg overflow-hidden'>
          <video src={videoData.file_path} title='Video Player' controls />
        </div>
      </CardContent>
    </Card>
  )
}
