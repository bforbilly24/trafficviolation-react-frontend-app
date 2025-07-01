import { useNavigate } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { FlickeringGrid } from '@/components/magicui/flickering-grid'
import { TextAnimate } from '@/components/magicui/text-animate'
import { ThemeSwitch } from '@/components/theme-switch'

export default function Landing() {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    // const token = localStorage.getItem('token')
    // if (token) {
    //   navigate({ to: '/home' })
    // } else {
    //   navigate({ to: '/auth/sign-in' })
    // }
    navigate({ to: '/' })
  }

  return (
    <div className='relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-background'>
      <FlickeringGrid
        className='absolute inset-0 z-0 [mask-image:radial-gradient(900px_circle_at_center,white,transparent)]'
        squareSize={4}
        gridGap={6}
        color='#6B7280'
        maxOpacity={0.5}
        flickerChance={0.1}
      />
      <div className='relative z-10 container mx-auto'>
        <div className='mx-auto flex max-w-5xl flex-col items-center'>
          <div className='flex flex-col items-center gap-6 text-center'>
            <div className='rounded-xl bg-background/30 p-4 shadow-sm backdrop-blur-sm'>
              <img
                src='/images/logo-travio.svg'
                alt='logo_travio'
                className='h-16'
              />
            </div>
            <div>
              <TextAnimate
                animation='blurInUp'
                by='character'
                as={'h1'}
                className='mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl'
              >
                Automated Traffic Violation Detection
              </TextAnimate>
              <p className='mx-auto max-w-3xl text-muted-foreground lg:text-xl'>
                Monitor and detect traffic violations in real-time using YOLOv5
                & Deep SORT
              </p>
            </div>
            <div className='mt-6 flex justify-center gap-3'>
              <Button
                className='shadow-sm transition-shadow hover:shadow'
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
            </div>
            <div className='mt-20 flex flex-col items-center gap-5'>
              <p className='font-medium text-muted-foreground lg:text-left'>
                Built with open-source technologies
              </p>
              <div className='flex flex-wrap items-center justify-center gap-4'>
                <a
                  href='https://docs.ultralytics.com/yolov5/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'group flex aspect-video h-12 items-center justify-center p-0'
                  )}
                >
                  <img
                    src='/images/yolov5.svg'
                    alt='YOLOv5 logo'
                    className='h-6 saturate-0 transition-all group-hover:saturate-100'
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='fixed bottom-4 right-4 z-50'>
        <ThemeSwitch />
      </div>
    </div>
  )
}
