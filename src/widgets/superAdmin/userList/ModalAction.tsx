import {ReactNode} from 'react'

import {BlockIcon} from '@/shared/assets/icons/BlockIcon'
import {DeleteUserIcon} from '@/shared/assets/icons/DeleteUserIcon'
import {EllipsisIcon} from '@/shared/assets/icons/EllipsisIcon'
import {CustomDropdown, CustomDropdownItemWithIcon} from '@/shared/components'
import {useTranslation} from '@/shared/lib'

type Props = {
    trigger: ReactNode
    userId: number
    userName: string
    addValuesUser: (id: number, name: string) => void
    valueBanUser: (id: number, name: string,reason) => void
    reason:string
}
export const ModalAction = ({trigger, userId, userName, addValuesUser,valueBanUser,reason}: Props) => {
    const {t} = useTranslation()

    const addValuesForDeleteUser = () => {
        addValuesUser(userId, userName)
    }
    const addValuesForBanUser = () => {
        valueBanUser(userId, userName,reason)
    }
    return (
        <CustomDropdown trigger={trigger} align={'end'}>
            <CustomDropdownItemWithIcon
                variant={'regular_text_14'}
                icon={<DeleteUserIcon/>}
                title={t.user_list.delete_user}
                onClick={addValuesForDeleteUser}
            />
            <CustomDropdownItemWithIcon
                variant={'regular_text_14'}
                icon={<BlockIcon/>}
                onClick={addValuesForBanUser}
                title={t.user_list.ban}
            />
            <CustomDropdownItemWithIcon
                variant={'regular_text_14'}
                icon={<EllipsisIcon/>}
                title={t.user_list.more}
            />
        </CustomDropdown>
    )
}
