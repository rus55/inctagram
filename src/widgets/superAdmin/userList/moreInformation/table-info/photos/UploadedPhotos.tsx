import Image from 'next/image'

import s from './UploadedPhotos.module.scss'

import { Typography } from '@/shared/components'
import { useTranslation } from '@/shared/lib'

type Props = {
  photos: ImagePost[]
}
export const UploadedPhotos = ({ photos }: Props) => {
  const { t } = useTranslation()
  const rows = []

  for (let i = 0; i < photos.length; i += 4) {
    rows.push(photos.slice(i, i + 4))
  }

  return (
    <>
      {rows.length ? (
        <table className={s.table}>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map(photo => (
                  <td key={photo.id}>
                    <Image src={photo.url} alt={'img'} width={296} height={296} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Typography className="text-center" variant={'h1'}>
          {t.user_info.not_found}
        </Typography>
      )}
    </>
  )
}
