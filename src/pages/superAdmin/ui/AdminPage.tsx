import { getSuperAdminLayoutLayout } from '@/widgets/layouts/superAdmin-layout/SuperAdminLayout'
import { Admin } from '@/widgets/superAdmin/superAdmin'

const AdminPage = () => {
  return (
    <div className="bg-dark-700 pt-10 pl-6 pr-6 md:pr-16 pb-16 lg:pb-0">
      <Admin />
    </div>
  )
}

// AdminPage.getLayout = getSuperAdminLayoutLayout

export { AdminPage }
