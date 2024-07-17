import { BlockIcon } from '@/shared/assets/icons/BlockIcon'
import { AvatarSmallView } from '@/shared/components/avatarSmallView'

type Props = {
  avatar: Avatar
  userName: string
}

export const OwnerPost = ({ avatar, userName }: Props) => {
  return (
    <div className="flex justify-between mt-3">
      <div className="flex gap-2">
        <AvatarSmallView avatarOwner={avatar.url} width={avatar.width} height={avatar.height} />
        {userName}
      </div>
      <BlockIcon />
    </div>
  )
}
