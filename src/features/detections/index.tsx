import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import {
  IconArrowsDiff,
  IconHelmetOff,
  IconTrafficLights,
  IconTrafficLightsOff,
} from '@tabler/icons-react'
import { uploadMutation } from '@/actions/detection/post-video-file'
import { streamDetectionVideo } from '@/actions/detection/stream-detection-video'
import { streamViolationVideo } from '@/actions/detection/stream-violation-video'
import {
  UploadRequest,
  UploadResponse,
  ViolationStreamData,
} from '@/types/detections'
import { motion } from 'framer-motion'
import { UploadIcon } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField } from '@/components/ui/form'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { FileUpload } from './components/file-upload'
import formSchema from './data/schema'

export default function Detections() {
  const [detectSocket, setDetectSocket] = useState<WebSocket | null>(null)
  const [violationSocket, setViolationSocket] = useState<WebSocket | null>(null)
  const [isStreamStart, setIsStreamStart] = useState<boolean>(false)
  const [videoStream1Src, setVideoStream1Src] = useState<string>('')
  const [videoStream2Src, setVideoStream2Src] = useState<string>('')
  const [videoId, setVideoId] = useState<string | null>(null)
  const [trafficLightStatus, setTrafficLightStatus] = useState<string>('')
  const [trafficLightViolatorCounter, setTrafficLightViolatorCounter] =
    useState<number>(0)
  const [wrongWayViolatorCounter, setWrongWayViolatorCounter] =
    useState<number>(0)
  const [helmetViolatorCounter, setHelmetViolatorCounter] = useState<number>(0)
  const [violations, setViolations] = useState<ViolationStreamData[]>([])

  const { mutate, isPending } = useMutation({
    ...uploadMutation(),
    onSuccess: (data: UploadResponse) => {
      toast({ title: 'Video uploaded successfully' })
      form.reset()
      console.log('Upload result:', data)
      setVideoId(data.id.toString())
      setIsStreamStart(true)
    },
    onError: (error) => {
      toast({ variant: 'destructive', title: error.message })
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: [],
    },
  })

  const onUpload = async (data: z.infer<typeof formSchema>) => {
    const detectionData: UploadRequest = {
      file: data.file[0],
    }
    mutate(detectionData)
  }

  const handleStreamDetection = (videoId: string) => {
    const socket = streamDetectionVideo(videoId, {
      onOpen: () => {
        // setIsStreamStart(true)
        toast({ title: 'Detection WebSocket connection established' })
      },
      onMessage: (data) => {
        if ('stream' in data) {
          // Handle VideoStreamData
          if (data.stream === 'stream1') {
            setVideoStream1Src(data.url)
          } else {
            setVideoStream2Src(data.url)
          }
        } else {
          // Handle DetectionData
          setTrafficLightStatus(data.traffic_light_status ?? '')
          setTrafficLightViolatorCounter(
            data.traffic_light_violator_counter ?? 0
          )
          setWrongWayViolatorCounter(data.wrong_way_violator_counter ?? 0)
          setHelmetViolatorCounter(data.helmet_violator_counter ?? 0)
        }
      },
      onClose: () => {
        toast({
          variant: 'destructive',
          title: 'Detection WebSocket connection closed',
        })
        setIsStreamStart(false)
      },
      onError: (error) => {
        toast({ variant: 'destructive', title: error })
        setIsStreamStart(false)
      },
    })
    setDetectSocket(socket)
  }

  const listenForViolations = (videoId: string) => {
    const socket = streamViolationVideo(videoId, {
      onOpen: () => {
        toast({ title: 'Violation WebSocket connection established' })
      },
      onMessage: (data: ViolationStreamData) => {
        console.log('Violation data:', data)
        setViolations((prev) => [data, ...prev])
      },
      onClose: () => {
        toast({
          variant: 'destructive',
          title: 'Violation WebSocket connection closed',
        })
      },
      onError: (error) => {
        toast({ variant: 'destructive', title: error })
      },
    })
    setViolationSocket(socket)
  }

  const handleStartDetection = () => {
    if (videoId) {
      handleStreamDetection(videoId)
      listenForViolations(videoId)
      setIsStreamStart(true)
    } else {
      toast({ variant: 'destructive', title: 'No video ID available' })
    }
  }

  const handleStopDetection = () => {
    if (detectSocket) {
      detectSocket.close()
      setDetectSocket(null)
      setIsStreamStart(false)
    }
    if (violationSocket) {
      violationSocket.close()
      setViolationSocket(null)
    }
    if (videoStream1Src) {
      URL.revokeObjectURL(videoStream1Src)
      setVideoStream1Src('')
    }
    if (videoStream2Src) {
      URL.revokeObjectURL(videoStream2Src)
      setVideoStream2Src('')
    }
    toast({ title: 'Detection Stopped' })
  }

  const getStatusColor = (status: string) => {
    const normalizedStatus = status.toLowerCase()
    switch (normalizedStatus) {
      case 'red':
        return 'bg-red-600'
      case 'green':
        return 'bg-green-600'
      default:
        return ''
    }
  }

  useEffect(() => {
    return () => {
      if (detectSocket) {
        detectSocket.close()
        setDetectSocket(null)
      }
      if (violationSocket) {
        violationSocket.close()
        setViolationSocket(null)
      }
    }
  }, [detectSocket, violationSocket])

  const files = form.watch('file')
  const isFileAttached = files && files.length > 0

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap gap-x-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Deteksi Pelanggaran Lalu Lintas
            </h2>
            <p className='text-muted-foreground'>
              Mendeteksi pelanggaran lalu lintas berdasarkan input user
            </p>
          </div>
          <div className='mt-6 flex justify-end space-x-4'>
            <Button onClick={handleStartDetection} disabled={!!detectSocket}>
              Start
            </Button>
            <Button onClick={handleStopDetection} disabled={!detectSocket}>
              Stop
            </Button>
          </div>
        </div>

        {!isStreamStart ? (
          <>
            {/* === Upload Section === */}
            <div className='-mx-4 mt-16 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
              <Form {...form}>
                <form
                  id='detection-video-input'
                  onSubmit={form.handleSubmit(onUpload)}
                >
                  <FormField
                    control={form.control}
                    name={'file'}
                    render={({ field }) => (
                      <FormControl>
                        <FileUpload
                          onChange={(files) => {
                            field.onChange(files)
                            form.trigger('file')
                          }}
                        ></FileUpload>
                      </FormControl>
                    )}
                  />
                </form>
              </Form>
            </div>
            {isFileAttached && (
              <div className='flex justify-end mt-2'>
                <Button
                  type='submit'
                  form='detection-video-input'
                  variant={'default'}
                  size={'lg'}
                  disabled={isPending}
                >
                  {isPending ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className='mr-2 inline-block'
                    >
                      ⏳
                    </motion.span>
                  ) : (
                    <UploadIcon size={18} />
                  )}
                  {isPending ? 'Uploading...' : 'Upload'}
                </Button>
              </div>
            )}
          </>
        ) : (
          <>
            {/* ===== Detection Section ===== */}
            <div className='grid grid-cols-1 gap-4 mt-8 lg:grid-cols-4'>
              <Card className='col-span-1 lg:col-span-2'>
                <CardHeader className='flex items-center'>
                  <CardTitle>Original Frame</CardTitle>
                </CardHeader>
                <CardContent className='pt-2'>
                  <div className='flex items-center justify-center w-full h-full'>
                    {videoStream2Src ? (
                      <img
                        src={videoStream2Src}
                        alt='Stream 2'
                        className='max-w-full h-auto'
                      />
                    ) : (
                      <p className='italic'>No stream available</p>
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-2'>
                <CardHeader className='flex items-center'>
                  <CardTitle className='text-sm font-medium'>
                    Processed Frame
                  </CardTitle>
                </CardHeader>
                <CardContent className='pt-2'>
                  <div className='flex items-center justify-center w-full h-full'>
                    {videoStream1Src ? (
                      <img
                        src={videoStream1Src}
                        alt='Stream 1'
                        className='max-w-full h-auto'
                      />
                    ) : (
                      <div className='relative'>
                        <p className='italic'>No stream available</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className='grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-4'>
              <Card className={`${getStatusColor(trafficLightStatus)}`}>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Traffic Light Status
                  </CardTitle>
                  <IconTrafficLights size={22}></IconTrafficLights>
                </CardHeader>
                <CardContent>
                  <p className='text-2xl font-bold'>
                    {trafficLightStatus || 'N/A'}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Traffic Light Violators
                  </CardTitle>
                  <IconTrafficLightsOff size={22}></IconTrafficLightsOff>
                </CardHeader>
                <CardContent>
                  <p className='text-2xl font-bold'>
                    {trafficLightViolatorCounter}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Wrong Way Violators
                  </CardTitle>
                  <IconArrowsDiff size={22}></IconArrowsDiff>
                </CardHeader>
                <CardContent>
                  <p className='text-2xl font-bold'>
                    {wrongWayViolatorCounter}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Helmet Violators
                  </CardTitle>
                  <IconHelmetOff size={22}></IconHelmetOff>
                </CardHeader>
                <CardContent>
                  <p className='text-2xl font-bold'>{helmetViolatorCounter}</p>
                </CardContent>
              </Card>
            </div>

            <div className='mt-8 flex items-center justify-between space-y-2 flex-wrap gap-x-4'>
              <h2 className='text-2xl font-semibold tracking-tight'>
                Histori Pelanggaran
              </h2>
            </div>
            <div className='mt-4 -mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
              <DataTable columns={columns} data={violations} />
            </div>
          </>
        )}
      </Main>
    </>
  )
}
