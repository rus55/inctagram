import { getSuperAdminLayoutLayout } from '@/widgets/layouts/superAdmin-layout/SuperAdminLayout'
import { UserList } from '@/widgets/superAdmin'

const UserListPage = () => {
  return (
    <div className="bg-dark-700 pt-10 pl-6 pr-6 md:pr-16 pb-16 lg:pb-0">
      <UserList />
    </div>
  )
}

UserListPage.getLayout = getSuperAdminLayoutLayout

export { UserListPage }
