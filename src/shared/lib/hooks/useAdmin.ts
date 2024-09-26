import { useAppSelector } from './index'

import { selectIsAdmin } from '@/application/services/admin-slice'

export const useAdmin = () => {
  const isAdmin = useAppSelector(selectIsAdmin)

  return {
    isAdmin,
  }
}
