import { useRouter } from 'next/router'

import { getHeaderWithSidebarLayout } from '@/widgets/layouts'
import { UserProfile } from '@/widgets/search/ui/userProfile/UserProfile'

function UserProfilePage() {
  const router = useRouter()
  const userName = router.query

  return (
    <div className="bg-dark-700 pt-10 pl-6 pr-6 md:pr-16 pb-16 lg:pb-0">
      <UserProfile userName={userName.name as string} />
    </div>
  )
}

UserProfilePage.getLayout = getHeaderWithSidebarLayout

export { UserProfilePage }
