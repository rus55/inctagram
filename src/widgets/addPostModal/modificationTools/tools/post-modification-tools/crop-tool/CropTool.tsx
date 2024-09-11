import React from 'react'

import { updateAspect } from '@/application/services/cropper-slice'
import { DefaultProfileImg } from '@/shared/assets'
import { FullSizeIcon } from '@/shared/assets/icons/FullSizeIcon'
import { IconRectangleVertical } from '@/shared/assets/icons/RectangleIcon'
import { IconRectangle } from '@/shared/assets/icons/RotatedSquareIcon'
import { IconSquare } from '@/shared/assets/icons/Square'
import { CustomDropdown, CustomDropdownItem, Typography } from '@/shared/components'
import { useAppDispatch, useTranslation } from '@/shared/lib'
import s from '@/widgets/addPostModal/modificationTools/tools/post-modification-tools/PostPhotoModificationTools.module.scss'
type Props = {
  imageId: string
}
export const CropTool = ({ imageId }: Props) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const toolTrigger = (
    <div className={s.tool}>
      <FullSizeIcon color={'#fff'} />
    </div>
  )

  return (
    <div className={s.container}>
      <CustomDropdown
        trigger={toolTrigger}
        className={s.customContentBox}
        align={'start'}
        side={'top'}
        sideOffset={2}
        isArrow={false}
      >
        <CustomDropdownItem
          className={s.item}
          onClick={() => dispatch(updateAspect({ id: imageId, aspect: 1 }))}
        >
          <Typography variant={'h3'}>{t.post.aspect_original}</Typography>
          <DefaultProfileImg style={{ width: '24px', height: '24px', marginLeft: '5px' }} />
        </CustomDropdownItem>
        <CustomDropdownItem
          className={s.item}
          onClick={() => dispatch(updateAspect({ id: imageId, aspect: 1 }))}
        >
          <Typography variant={'regular_text_16'}>1:1</Typography>
          <IconSquare />
        </CustomDropdownItem>
        <CustomDropdownItem
          className={s.item}
          onClick={() => dispatch(updateAspect({ id: imageId, aspect: 4 / 9 }))}
        >
          <Typography variant={'regular_text_16'}>4:5</Typography>
          <IconRectangleVertical />
        </CustomDropdownItem>
        <CustomDropdownItem
          className={s.item}
          onClick={() => dispatch(updateAspect({ id: imageId, aspect: 16 / 9 }))}
        >
          <Typography variant={'regular_text_16'}>16:9</Typography>
          <IconRectangle />
        </CustomDropdownItem>
      </CustomDropdown>
    </div>
  )
}
