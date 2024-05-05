import { useEffect, useState } from 'react'

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    setIsAdmin(true)
  }, [])

  return { isAdmin }
}
