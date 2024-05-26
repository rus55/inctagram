import { ReactNode } from 'react'

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
}
export const ModalAction = ({ trigger, userId, userName, addValuesUser }: Props) => {
  const { t } = useTranslation()

  const addValuesForDeleteUser = () => {
    addValuesUser(userId, userName)
  }

  return (
    <CustomDropdown trigger={trigger} align={'end'}>
      <CustomDropdownItemWithIcon
        variant={'regular_text_14'}
        icon={<DeleteUserIcon />}
        title={t.user_list.delete_user}
        onClick={addValuesForDeleteUser}
      />
      <CustomDropdownItemWithIcon
        variant={'regular_text_14'}
        icon={<BlockIcon />}
        title={t.user_list.ban}
      />
      <CustomDropdownItemWithIcon
        variant={'regular_text_14'}
        icon={<EllipsisIcon />}
        title={t.user_list.more}
      />
    </CustomDropdown>
  )
}
