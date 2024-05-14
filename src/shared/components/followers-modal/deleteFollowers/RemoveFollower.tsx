import s from './RemoveFollower.module.scss'

import { IconUser } from '@/shared/assets'
import { Button, Typography } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { useTranslation } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'

type Props = {
  avatar: string
  name: string
  isMob: boolean
  onRemove: () => void
}
export const RemoveFollower = ({ avatar, name, isMob, onRemove }: Props) => {
  const { isOpen, openModal, closeModal } = useModal()
  const { t } = useTranslation()

  return (
    <>
      <Button
        variant={'link'}
        onClick={() => openModal()}
        style={isMob ? { fontSize: '14px', padding: '5px 10px', color: '#fff' } : { color: '#fff' }}
      >
        {t.followers_modal.button_remove}
      </Button>

      <Modal open={isOpen} size={'sm'} title={t.followers_modal.button_remove} onClose={closeModal}>
        <div className={s.avaAndText}>
          <div className={s.avatar} style={{ backgroundImage: avatar ? `${avatar}` : 'none' }}>
            {!avatar && <IconUser />}
          </div>
          <Typography>
            {t.delete_followers.remove_text} {name}?
          </Typography>
        </div>
        <div className={s.buttonBox}>
          <Button variant={'outline'} onClick={onRemove} style={{ width: '27px' }}>
            {t.delete_photo_of_profile.button_yes}
          </Button>
          <Button variant={'primary'} onClick={closeModal}>
            {t.delete_photo_of_profile.button_no}
          </Button>
        </div>
      </Modal>
    </>
  )
}
