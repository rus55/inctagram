import { useState } from 'react'
import { Dispatch } from 'react'
import { Button, OptionsType, SelectCustom, Typography } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { useTranslation } from '@/shared/lib'
import { ShowModalBanType } from '@/widgets/superAdmin/userList/UserList'
import { getValueByLang, statusType } from "@/widgets/superAdmin/userList/getValueByLang"
import { useRouter } from "next/router"

type Props = {
    isOpen: boolean
    userName: string | null
    setShowModalBan: Dispatch<ShowModalBanType>
    onBanUser: () => void
}

export const ModalBan = ({isOpen, userName, setShowModalBan, onBanUser}: Props) => {
    const {t} = useTranslation()
    const router = useRouter()
    const [selectedStatus, setSelectedStatus] = useState<string>(t.user_list.not_selected)

    const onCloseModal = () => {
        setShowModalBan({
            userId: null,
            userName: null,
            isShow: false,
        })
    }

    const onSelectChange = (value: string) => {
        setSelectedStatus(value)
    }

    const options: OptionsType[] = [
        {label: "123", value: "123"},
        {label: "321", value: "123"},
        {label: "aaaa", value: "123"},
    ]

    return (
        <Modal size="sm" open={isOpen} title={'Блокировка пользоав'} onClose={onCloseModal}>
            <Typography as="span" variant="regular_text_14">
                Вы уверены что хотите удалить пользователя,{/*{t.user_list.confirmation}*/}
            </Typography>
            <Typography as="span" variant="h3">{` ${userName}?`}</Typography>
            <SelectCustom options={options} value={selectedStatus} onValueChange={onSelectChange}/>
            <div className="flex justify-between mt-13">
                <Button onClick={onCloseModal} style={{width: 60}}>
                    <Typography variant="h3">{t.user_list.no}</Typography>
                </Button>
                <Button onClick={onBanUser} variant={'outline'} style={{width: 60}}>
                    <Typography variant="h3">{t.user_list.yes}</Typography>
                </Button>
            </div>
        </Modal>
    )
}