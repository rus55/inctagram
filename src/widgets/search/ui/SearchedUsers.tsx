import Link from 'next/link'

import s from './Search.module.scss'

import { Typography } from '@/shared/components'
import { AvatarSmallView } from '@/shared/components/avatarSmallView'

type Props = {
  users: SearchUsersItems[]
}

export const SearchedUsers = ({ users }: Props) => {
  return (
    <ol className="list-style-type: none mt-5">
      {users.map(user => (
        <li key={user.id} className="flex gap-2.5 mb-3">
          <AvatarSmallView avatarOwner={user.avatars[1]?.url} width={48} height={48} />
          <div>
            <Link href={`userProfile/${user.userName}`} className="underline">
              <Typography variant="bold_text_16">{user.userName}</Typography>
            </Link>
            <Typography variant="regular_text_14" className={s.userName}>
              {user.firstName ? `${user.firstName} ` : '---- '}
              {user.lastName ? user.lastName : '----'}
            </Typography>
          </div>
        </li>
      ))}
    </ol>
  )
}
