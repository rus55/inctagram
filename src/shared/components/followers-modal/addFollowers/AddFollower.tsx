import s from './AddFollower.module.scss'

import { IconUser } from '@/shared/assets'
import { Button, Typography } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { useTranslation } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'

type Props = {
  avatar: string
  name: string
  isMob: boolean
  onAdd: () => void
}
export const AddFollowers = ({ avatar, name, isMob, onAdd }: Props) => {
  const { isOpen, openModal, closeModal } = useModal()
  const { t } = useTranslation()

  return (
    <>
      {/*<Button*/}
      {/*    variant={'link'}*/}
      {/*    onClick={() => openModal()}*/}
      {/*    style={isMob ? {fontSize: '14px', padding: '5px 10px', color: '#fff'} : {color: '#fff'}}*/}
      {/*>*/}
      {/*    {t.followers_modal.button_remove}*/}
      {/*</Button>*/}
      <Button
        variant={'primary'}
        onClick={() => openModal()}
        style={isMob ? { fontSize: '14px', padding: '5px 10px', color: '#fff' } : { color: '#fff' }}
      >
        {t.following_modal.follow_button}
      </Button>

      <Modal open={isOpen} size={'sm'} title={t.followers_modal.button_remove} onClose={closeModal}>
        <div className={s.avaAndText}>
          <div className={s.avatar} style={{ backgroundImage: avatar ? `${avatar}` : 'none' }}>
            {!avatar && <IconUser />}
          </div>
          <Typography>
            {t.add_following.text} {name}?
          </Typography>
        </div>
        <div className={s.buttonBox}>
          <Button variant={'outline'} onClick={onAdd} style={{ width: '27px' }}>
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
