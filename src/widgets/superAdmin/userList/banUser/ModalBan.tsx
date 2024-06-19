import { Dispatch, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useBanUserMutation } from '@/entities/users/api/usersApi'
import { Button, OptionsType, SelectCustom, Typography } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { useTranslation } from '@/shared/lib'
import {
  BanType,
  getValueBanByLang,
  getValueByLang,
  statusType,
} from '@/widgets/superAdmin/userList/getValueByLang'
import { ShowModalBanType } from '@/widgets/superAdmin/userList/UserList'

type Props = {
  isOpen: boolean
  userName: string | null
  setShowModalBan: Dispatch<ShowModalBanType>
  showModalBan: any
}

export const ModalBan = ({ isOpen, userName, setShowModalBan, showModalBan }: Props) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [banUser, { isLoading: isLoadingBan, isSuccess: isSuccessBan }] = useBanUserMutation()
  // const [selectedOption, setSelectedOption] = useState('yt ');
  const [selectedOption, setSelectedOption] = useState<BanType>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('lang') as BanType) ?? (t.user_list.not_selected as BanType)
    }

    return t.user_list.not_selected as BanType
  })
  const handleSelectChange = (value: BanType) => {
    const currentValue = getValueBanByLang(value)

    localStorage.setItem('lang', t.user_list[currentValue as keyof typeof t.user_list])
    setSelectedOption(t.user_list[currentValue as keyof typeof t.user_list] as BanType)
  }

  useEffect(() => {
    handleSelectChange(selectedOption)
  }, [router.locale])

  const onBanUser = () => {
    const id = showModalBan.userId

    if (id) {
      banUser({ banReason: selectedOption, userId: id })
    }
    !isLoadingBan &&
      setShowModalBan({
        userId: null,
        userName: null,
        isShow: false,
      })
  }
  const onCloseModal = () => {
    setShowModalBan({
      userId: null,
      userName: null,
      isShow: false,
    })
  }

  const options: OptionsType[] = [
    { label: t.user_list.reason_for_ban, value: t.user_list.reason_for_ban },
    { label: t.user_list.bad_behavior, value: t.user_list.bad_behavior },
    { label: t.user_list.advertising_placement, value: t.user_list.advertising_placement },
    { label: t.user_list.another_reason, value: t.user_list.another_reason },
  ]

  return (
    <Modal size="sm" open={isOpen} title={'Блокировка пользоав'} onClose={onCloseModal}>
      <Typography as="span" variant="regular_text_14">
        Вы уверены что хотите удалить пользователя,{/*{t.user_list.confirmation}*/}
      </Typography>
      <Typography as="span" variant="h3">{` ${userName}?`}</Typography>
      <SelectCustom
        options={options}
        value={selectedOption as string}
        onValueChange={handleSelectChange}
      />
      <div className="flex justify-between mt-13">
        <Button onClick={onCloseModal} style={{ width: 60 }}>
          <Typography variant="h3">{t.user_list.no}</Typography>
        </Button>
        <Button onClick={onBanUser} variant={'outline'} style={{ width: 60 }}>
          <Typography variant="h3">{t.user_list.yes}</Typography>
        </Button>
      </div>
    </Modal>
  )
}
