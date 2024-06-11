import Link from 'next/link'

import { Typography } from '@/shared/components'
import { AvatarSmallView } from '@/shared/components/avatarSmallView'
import { useTranslation } from '@/shared/lib'

type Props = {
  avatar: string
  name: { first: string; last: string }
  userName: string
  userId: number
  date: Date
}

export const UserInfo = ({ avatar, name, userName, userId, date }: Props) => {
  const { t } = useTranslation()

  return (
    <div>
      <div className="flex">
        <AvatarSmallView avatarOwner={avatar} width={60} height={60} />
        <div className="ml-5">
          <Typography variant={'h1'}>
            {name.first} {name.last}
          </Typography>
          <Link href={`/public-posts/${userId}`}>
            <Typography style={{ textDecoration: 'underline' }}>{userName}</Typography>
          </Link>
        </div>
      </div>
      <div className="flex gap-15 mt-13">
        <div>
          <Typography className="text-dark-100">{t.user_info.usertId}</Typography>
          <Typography as={'span'} variant={'regular_text_16'}>
            {userId}
          </Typography>
        </div>
        <div>
          <Typography className="text-dark-100">{t.user_info.profileDate}</Typography>
          <Typography as={'span'} variant={'regular_text_16'}>
            {new Date(date).toLocaleDateString('ru-RU')}
          </Typography>
        </div>
      </div>
    </div>
  )
}
