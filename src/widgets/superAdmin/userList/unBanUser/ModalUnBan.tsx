import { Dispatch, useState } from 'react'

import { Button, Typography } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { useTranslation } from '@/shared/lib'
import { ShowModalType } from '@/widgets/superAdmin/userList/UserList'
import { useUnBanUserMutation } from '@/entities/users/api/usersApi'

type Props = {
  setShowModalUnban: Dispatch<ShowModalType>
  showModalUnban: any
  unblockUser: any
  isLoadingUnBan: boolean
}
export const ModalUnBan = ({
  setShowModalUnban,
  showModalUnban,
  unblockUser,
  isLoadingUnBan,
}: Props) => {
  const { t } = useTranslation()

  const onUnbanUser = () => {
    const id = showModalUnban.userId

    if (id) {
      unblockUser({ userId: id })
    }
    !isLoadingUnBan &&
      setShowModalUnban({
        userId: null,
        userName: null,
        isShow: false,
      })
  }
  const onCloseModal = () => {
    setShowModalUnban({
      userId: null,
      userName: null,
      isShow: false,
    })
  }

  return (
    <Modal
      size="sm"
      open={showModalUnban.isShow}
      title={t.user_list.unban_user}
      onClose={onCloseModal}
    >
      <Typography as="span" variant="regular_text_14">
        {t.user_list.confirmation_unBan}
      </Typography>
      <Typography as="span" variant="h3">{` ${showModalUnban.userName}?`}</Typography>
      <div className="flex justify-between mt-13">
        <Button onClick={onCloseModal} style={{ width: 60 }}>
          <Typography variant="h3">{t.user_list.no}</Typography>
        </Button>
        <Button onClick={onUnbanUser} variant={'outline'} style={{ width: 60 }}>
          <Typography variant="h3">{t.user_list.yes}</Typography>
        </Button>
      </div>
    </Modal>
  )
}
