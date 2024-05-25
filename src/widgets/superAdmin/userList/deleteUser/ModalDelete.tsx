import { Modal } from "@/shared/components/modals";
import { useTranslation } from "@/shared/lib";
import { Button, Typography } from "@/shared/components";
import { Dispatch } from "react";
import { ShowModalType } from "@/widgets/superAdmin/userList/UserList";

type Props = {
  isOpen: boolean
  userName: string | null
  setShowModalDelete: Dispatch<ShowModalType>
  onDeleteUser: () => void
}
export const ModalDelete = ({ isOpen, userName, setShowModalDelete, onDeleteUser }: Props) => {
  const { t } = useTranslation()

  const onCloseModal = () => {
    setShowModalDelete({
      userId: null,
      userName: null,
      isShow: false
    })
  }
  return <Modal size='sm' open={isOpen} title={t.user_list.delete_user} onClose={onCloseModal} >
    <Typography as='span' variant='regular_text_14'>{t.user_list.confirmation}</Typography>
    <Typography as='span' variant='h3'>{` ${userName}?`}</Typography>
    <div className='flex justify-between mt-13'>
      <Button onClick={onCloseModal} style={{width: 60}}>
        <Typography variant='h3'>{t.user_list.no}</Typography>
      </Button>
      <Button onClick={onDeleteUser} variant={'outline'} style={{width: 60}}>
        <Typography variant='h3'>{t.user_list.yes}</Typography>
      </Button>
    </div>
  </Modal>
}