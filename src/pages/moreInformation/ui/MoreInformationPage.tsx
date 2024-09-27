import { getInfoUserLayout } from '@/widgets/layouts/superAdmin-layout/InfoUserLayout/InfoUserLayout'
import MoreInformation from '@/widgets/superAdmin/userList/moreInformation/MoreInformation'

const MoreInformationPage = () => {
  return (
    <div className="bg-dark-700 pt-10 pl-6 pr-6 md:pr-16 pb-16 lg:pb-0">
      <MoreInformation />
    </div>
  )
}

MoreInformationPage.getLayout = getInfoUserLayout

export { MoreInformationPage }
