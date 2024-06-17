import {Dispatch, useState} from 'react'
import {Button, OptionsType, SelectCustom, Typography} from '@/shared/components'
import {Modal} from '@/shared/components/modals'
import {useTranslation} from '@/shared/lib'
import {ShowModalBanType} from '@/widgets/superAdmin/userList/UserList'
import {useRouter} from "next/router"

type Props = {
    isOpen: boolean
    userName: string | null
    setShowModalBan: Dispatch<ShowModalBanType>
    onBanUser: () => void
    setReason:any
    reason:string
}

export const ModalBan = ({isOpen, userName, setShowModalBan, onBanUser,setReason,reason}: Props) => {
    const {t} = useTranslation()
    const router = useRouter()
    const [selectedReason, setSelectedReason] = useState<string>(t.user_list.not_selected)

    const onCloseModal = () => {
        setShowModalBan({
            userId: null,
            userName: null,
            isShow: false,
            reason:null
        })
        setReason('');
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
            <SelectCustom options={options} value={reason} onValueChange={(value) => setReason(value)}/>
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