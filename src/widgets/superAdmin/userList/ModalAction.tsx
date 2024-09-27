import { ReactNode, useEffect, useState } from 'react'

import Link from 'next/link'

import { BlockIcon } from '@/shared/assets/icons/BlockIcon'
import { DeleteUserIcon } from '@/shared/assets/icons/DeleteUserIcon'
import { EllipsisIcon } from '@/shared/assets/icons/EllipsisIcon'
import { CustomDropdown, CustomDropdownItemWithIcon } from '@/shared/components'
import { useTranslation } from '@/shared/lib'

type Props = {
  trigger: ReactNode
  userId: number
  userName: string
  addValuesUser: (id: number, name: string) => void
  addValuesBanUser: (id: number, name: string) => void
  valueBanUser: any
  banUsers: any
}

export const ModalAction = ({
  trigger,
  userId,
  userName,
  addValuesUser,
  valueBanUser,
  addValuesBanUser,
  banUsers,
}: Props) => {
  const { t } = useTranslation()
  const [isBan, setIsBan] = useState(banUsers)

  const addValuesForDeleteUser = () => {
    addValuesUser(userId, userName)
  }
  const addValuesForUnBanUser = () => {
    addValuesBanUser(userId, userName)
  }
  const addValuesForBanUser = () => {
    valueBanUser(userId, userName)
  }

  return (
    <CustomDropdown trigger={trigger} align={'end'}>
      <CustomDropdownItemWithIcon
        variant={'regular_text_14'}
        icon={<DeleteUserIcon />}
        title={t.user_list.delete_user}
        onClick={addValuesForDeleteUser}
      />
      {banUsers ? (
        <CustomDropdownItemWithIcon
          variant={'regular_text_14'}
          icon={<BlockIcon />}
          title={t.user_list.unBan}
          onClick={addValuesForUnBanUser}
        />
      ) : (
        <CustomDropdownItemWithIcon
          variant={'regular_text_14'}
          icon={<BlockIcon />}
          onClick={addValuesForBanUser}
          title={t.user_list.ban}
        />
      )}

      <Link
        href={{
          pathname: '/more-information',
          query: { userId: `${userId}` },
        }}
      >
        <CustomDropdownItemWithIcon
          variant={'regular_text_14'}
          icon={<EllipsisIcon />}
          title={t.user_list.more}
        />
      </Link>
    </CustomDropdown>
  )
}
