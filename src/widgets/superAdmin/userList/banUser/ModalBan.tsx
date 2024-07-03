import { Dispatch, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useBanUserMutation } from '@/entities/users/api/usersApi'
import { InputField } from '@/shared'
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
  banUser: any
  isLoadingBan: boolean
}

export const ModalBan = ({
  isOpen,
  userName,
  setShowModalBan,
  showModalBan,
  banUser,
  isLoadingBan,
}: Props) => {
  const { t } = useTranslation()
  const router = useRouter()

  const [selectedOption, setSelectedOption] = useState<BanType>('' as BanType)

  const [inputValue, setInputValue] = useState('')

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
      if (selectedOption === t.user_list.another_reason) {
        banUser({ banReason: inputValue, userId: id })
      } else {
        banUser({ banReason: selectedOption, userId: id })
      }
    }
    !isLoadingBan &&
      setShowModalBan({
        userId: null,
        userName: null,
        isShow: false,
      })
    setSelectedOption('' as BanType)
    setInputValue('')
  }

  const onCloseModal = () => {
    setShowModalBan({
      userId: null,
      userName: null,
      isShow: false,
    })
    setInputValue('')
    setSelectedOption('' as BanType)
  }

  const options: OptionsType[] = [
    // { label: t.user_list.reason_for_ban, value: t.user_list.reason_for_ban },
    { label: t.user_list.bad_behavior, value: t.user_list.bad_behavior },
    { label: t.user_list.advertising_placement, value: t.user_list.advertising_placement },
    { label: t.user_list.another_reason, value: t.user_list.another_reason },
  ]

  return (
    <Modal size="sm" open={isOpen} title={t.user_list.user_blocking} onClose={onCloseModal}>
      <Typography as="span" variant="regular_text_14">
        {t.user_list.are_you_sure_you}
      </Typography>
      <Typography as="span" variant="h3">{` ${userName}?`}</Typography>
      {selectedOption === t.user_list.another_reason ? (
        <InputField
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder={t.user_list.another_reason}
          label={''}
        />
      ) : (
        <SelectCustom
          options={options}
          placeHolder={t.user_list.reason_for_ban}
          value={selectedOption as string}
          onValueChange={handleSelectChange}
        />
      )}

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
