import { useLoaderData } from '@tanstack/react-router'
import { Videos } from '@/types/detections'
import { SlashIcon } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { VideoDetail } from './components/video-detail'
import { VideoPlayer } from './components/video-player'

export default function HistoryDetailPage() {
  const videoData = useLoaderData({
    from: '/_authenticated/history/$videoId',
  }) as Videos

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
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/history'>History</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Detail</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {videoData.id === 1 ? (
          <div className='mt-8'>
            <Card>
              <CardHeader>
                <CardTitle>Detail Video</CardTitle>
              </CardHeader>
              <CardContent className='pl-8'>
                <VideoDetail videoData={videoData} />
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className='grid grid-cols-1 grid-rows-2 gap-4 mt-8 md:grid-cols-2 md:grid-rows-1'>
            <VideoPlayer videoData={videoData} />
            <Card>
              <CardHeader>
                <CardTitle>Detail Video</CardTitle>
              </CardHeader>
              <CardContent className='pl-8'>
                <VideoDetail videoData={videoData} />
              </CardContent>
            </Card>
          </div>
        )}
        <div className='flex flex-col mt-4'>
          <Card className='col-span-1'>
            <CardHeader>
              <CardTitle>History Pelanggaran</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} videoId={videoData.id.toString()} />
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  )
}
