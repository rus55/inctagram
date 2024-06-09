import { Typography } from '@/shared/components'
import { AvatarSmallView } from '@/shared/components/avatarSmallView'
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {
  avatar: string
  name: { first: string; last: string }
  email: string
  userId: number
  date: Date
}

export const UserInfo = ({ avatar, name, email, userId, date }: Props) => {
  const router = useRouter()
  return (
    <div>
      <div className="flex">
        <AvatarSmallView avatarOwner={avatar} width={60} height={60} />
        <div className="ml-5">
          <Typography variant={'h1'}>
            {name.first} {name.last}
          </Typography>
          <Link href={'/public-posts/2'}>
            <Typography>{email}</Typography>
          </Link>
        </div>
      </div>
      <div className="flex gap-15 mt-13">
        <div>
          <Typography className="text-dark-100">UserID</Typography>
          <Typography as={'span'} variant={'regular_text_16'}>
            {userId}
          </Typography>
        </div>
        <div>
          <Typography className="text-dark-100">Profile Creation Date</Typography>
          <Typography as={'span'} variant={'regular_text_16'}>
            {new Date(date).toLocaleDateString('ru-RU')}
          </Typography>
        </div>
      </div>
    </div>
  )
}
