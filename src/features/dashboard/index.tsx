import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import DashboardContent from './components/content'

export default function Dashboard() {
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main>
        <div className='mb-4 flex items-center space-y-2 flex-wrap'>
          <div className='flex flex-col'>
            <h1 className='text-2xl font-bold tracking-tight'>Home</h1>
            <p className='text-muted-foreground'>
              Temukan bagaimana teknologi YOLO mendeteksi pelanggaran lalu
              lintas secara otomatis.
            </p>
          </div>
        </div>
        <DashboardContent />
      </Main>
    </>
  )
}
