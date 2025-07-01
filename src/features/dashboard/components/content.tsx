import { useNavigate } from '@tanstack/react-router'
import { useTheme } from '@/context/theme-context'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { MagicCard } from '@/components/magicui/magic-card'
import { ShineBorder } from '@/components/magicui/shine-border'

export default function DashboardContent() {
  const navigate = useNavigate()
  const { theme } = useTheme()

  const handleRedirect = (page: string) => {
    switch (page) {
      case 'upload':
        navigate({
          to: '/detections',
        })
        break
      case 'stream':
        navigate({
          to: '/stream',
        })
        break
      case 'history':
        navigate({
          to: '/history',
        })
        break
      default:
        navigate({
          to: '/',
        })
    }
  }

  return (
    <>
      <Card className='relative overflow-hidden mt-4'>
        <ShineBorder shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']} />
        <CardHeader>
          <CardTitle className='text-xl font-bold'>
            Selamat Datang, Pengguna!
          </CardTitle>
          <CardDescription className='text-base'>
            Mulai coba teknologi YOLO dalam deteksi pelanggaran lalu lintas dan
            lihat history deteksi.
          </CardDescription>
        </CardHeader>
      </Card>
      <div className='grid grid-cols-1 grid-rows-2 gap-4 mt-4 md:grid-cols-2 md:grid-rows-1'>
        <Card>
          <MagicCard
            gradientColor={theme === 'dark' ? '#262626' : '#D9D9D955'}
            className='p-0'
          >
            <CardContent className='text-center pt-4'>
              <div className='grid grid-cols-1 grid-rows-2 items-center justify-center '>
                <div className='flex items-center justify-center h-[4rem]'>
                  <p className='font-semibold'>
                    Mulai unggah file video rekaman lalu lintas anda dan biarkan
                    sistem menganalisa dan mengidentifikasi pelanggaran secara
                    otomatis
                  </p>
                </div>
                <div className='row-start-2 h-[5rem] space-y-2'>
                  <Button onClick={() => handleRedirect('upload')}>
                    Coba Unggah
                  </Button>
                  <p className='tracking-tight text-sm text-muted-foreground'>
                    **Usahakan video terdapat objek lampu lalu lintas dan
                    zebracross
                  </p>
                </div>
              </div>
            </CardContent>
          </MagicCard>
        </Card>
        <Card>
          <MagicCard
            gradientColor={theme === 'dark' ? '#262626' : '#D9D9D955'}
            className='p-0'
          >
            <CardContent className='text-center pt-4'>
              <div className='grid grid-cols-1 grid-rows-2 items-center justify-center'>
                <div className='flex items-center justify-center h-[4rem]'>
                  <p className='font-semibold'>
                    Coba deteksi pelanggaran lalu lintas secara otomatis secara
                    livestream
                  </p>
                </div>
                <div className='row-start-2 h-[5rem]'>
                  <Button onClick={() => handleRedirect('stream')}>
                    Mulai Stream
                  </Button>
                </div>
              </div>
            </CardContent>
          </MagicCard>
        </Card>
      </div>
      <div className='flex items-center flex-wrap justify-between mt-12'>
        <div className='flex flex-col'>
          <p className='font-medium'>
            Sudah pernah menjalankan deteksi sebelumnya? Lihat history deteksi.
          </p>
        </div>
        <Button onClick={() => handleRedirect('history')}>
          History Deteksi
        </Button>
      </div>
    </>
  )
}
