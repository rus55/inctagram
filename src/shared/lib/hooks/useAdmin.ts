import { useAppSelector } from './index'
import { selectIsAdmin } from '@/app/services/admin-slice'

export const useAdmin = () => {
  const isAdmin = useAppSelector(selectIsAdmin)
  return {
    isAdmin,
  }
}
