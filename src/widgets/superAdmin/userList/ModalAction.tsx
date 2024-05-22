import { CustomDropdown, CustomDropdownItemWithIcon } from "@/shared/components";
import { BlockIcon } from "@/shared/assets/icons/BlockIcon";
import { EllipsisIcon } from "@/shared/assets/icons/EllipsisIcon";
import {ReactNode, useEffect} from "react";
import { DeleteUserIcon } from "@/shared/assets/icons/DeleteUserIcon";
import {useDeleteUserMutation} from "@/entities/users/api/usersApi";
import {useLoginMutation} from "@/entities/auth";

type Props = {
  trigger: ReactNode
    userId:number
    deleteUser:any
}
export const ModalAction = ({trigger,userId,deleteUser}: Props) => {

 const handleDeleteUser = () => {
     deleteUser({userId: userId})
    }

  return (
      <CustomDropdown trigger={trigger}  align={'end'} >
          <CustomDropdownItemWithIcon
              variant={'regular_text_14'}
              icon={<DeleteUserIcon />}
              title={'Delete User'}
              onClick={handleDeleteUser}
          />
        <CustomDropdownItemWithIcon variant={'regular_text_14'} icon={<BlockIcon />} title={'Ban in the system'} />
        <CustomDropdownItemWithIcon variant={'regular_text_14'}  icon={<EllipsisIcon />} title={'More information'} />
      </CustomDropdown>
    )
}