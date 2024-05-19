import { CustomDropdown, CustomDropdownItemWithIcon } from "@/shared/components";
import { BlockIcon } from "@/shared/assets/icons/BlockIcon";
import { EllipsisIcon } from "@/shared/assets/icons/EllipsisIcon";
import { ReactNode } from "react";
import { DeleteUserIcon } from "@/shared/assets/icons/DeleteUserIcon";

type Props = {
  trigger: ReactNode
}
export const ModalAction = ({trigger}: Props) => {
  return (
      <CustomDropdown trigger={trigger}  align={'end'} >
        <CustomDropdownItemWithIcon variant={'regular_text_14'} icon={<DeleteUserIcon />} title={'Delete User'} />
        <CustomDropdownItemWithIcon variant={'regular_text_14'} icon={<BlockIcon />} title={'Ban in the system'} />
        <CustomDropdownItemWithIcon variant={'regular_text_14'}  icon={<EllipsisIcon />} title={'More information'} />
      </CustomDropdown>
    )
}