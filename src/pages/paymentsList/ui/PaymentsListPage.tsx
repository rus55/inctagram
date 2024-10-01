import { getSuperAdminLayoutLayout } from '@/widgets/layouts/superAdmin-layout/SuperAdminLayout'
import { PaymentsList } from '@/widgets/superAdmin/paymentsList/PaymentsList'

const PaymentsListPage = () => {
  return (
    <div className="bg-dark-700 pt-10 pl-6 pr-6 md:pr-16 pb-16 lg:pb-0">
      <PaymentsList />
    </div>
  )
}

PaymentsListPage.getLayout = getSuperAdminLayoutLayout

export { PaymentsListPage }
