import React, { useState } from 'react'

import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

import { BlockIcon } from '@/shared/assets/icons/BlockIcon'
import { AvatarSmallView } from '@/shared/components/avatarSmallView'
import { ModalBan } from '@/widgets/superAdmin/userList/banUser/ModalBan'
import { ShowModalBanType } from '@/widgets/superAdmin/userList/UserList'

type Props = {
  isLoadingBan: boolean
  userId: number
  banUser: ({
    banReason,
    userId,
  }: {
    banReason: string
    userId: number
  }) => Promise<{ data: boolean } | { error: FetchBaseQueryError | SerializedError }>
  avatar: Avatar
  userName: string
}

export const OwnerPost = ({ avatar, userName, isLoadingBan, banUser, userId }: Props) => {
  const [showModalBan, setShowModalBan] = useState<ShowModalBanType>({
    isShow: false,
    userId,
    userName,
  })

  return (
    <div className="flex justify-between mt-3 mb-1.5">
      <div className="flex gap-2">
        <AvatarSmallView avatarOwner={avatar.url} width={avatar.width} height={avatar.height} />
        {userName}
      </div>
      <BlockIcon
        className="cursor-pointer"
        onClick={() => {
          setShowModalBan({
            isShow: true,
            userId,
            userName,
          })
        }}
      />
      <ModalBan
        isOpen={showModalBan.isShow}
        userName={userName}
        setShowModalBan={setShowModalBan}
        showModalBan={showModalBan}
        banUser={banUser}
        isLoadingBan={isLoadingBan}
      />
    </div>
  )
}
