import React, { FC, useState } from 'react'

import 'swiper/scss'

import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/scrollbar'
import 'swiper/scss/effect-cube'
import { useAppSelector } from '@/app/appStore'
import { setAlert } from '@/app/services'
import { removeAllPhotos, updatePhotos } from '@/app/services/cropper-slice'
import { postsApi } from '@/entities/posts'
import {
  usePublishPostsImageMutation,
  usePublishPostsMutation,
} from '@/entities/posts/api/postsApi'
import { Modal } from '@/shared/components/modals'
import { useAppDispatch, useFetchLoader, useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { CloseCrop } from '@/widgets/addPostModal/CloseCrop'
import { FilteringData } from '@/widgets/addPostModal/filterModal/FilterData'
import { PublicationData } from '@/widgets/addPostModal/publicationModal/PublicationData'
import { createImage } from '@/widgets/addProfilePhoto/addAvaWithoutRotation/crropUtils'

type Props = {
  isOpenFilter: boolean

  closeFilter: () => void
  setImageScr: (img: string | null) => void
  closeCroppingModal: () => void
  setIsDraft: (value: boolean) => void
  setModalPost: (value: boolean) => void
}

export const FilterPublicationModal: FC<Props> = ({
  isOpenFilter,
  closeCroppingModal,
  setImageScr,
  closeFilter,
  setIsDraft,
  setModalPost,
}) => {
  const croppers = useAppSelector(state => state.croppersSlice)
  const [openClosCrop, setCloseCrop] = useState(false)
  const { accessToken } = useAuth()
  const { t } = useTranslation()
  const text = useAppSelector(state => state.postSlice.textOfTextarea)

  const [publishDescription, { isLoading: isPostLoading }] = usePublishPostsMutation()
  const [publishPostImage, { isLoading }] = usePublishPostsImageMutation()
  const [mode, setMode] = useState<'filter' | 'publish'>('filter')
  const dispatch = useAppDispatch()
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const [flag, setFlag] = useState<boolean>(false)

  useFetchLoader(isLoading || isPostLoading)
  if (!croppers.length || flag) {
    return
  }

  const handleDiscard = () => {
    setFlag(true)
    closeFilter()
    setCloseCrop(false)
    closeCroppingModal()
  }
  const downloadNewPosts = () => {
    new Promise(res => setTimeout(res, 2000)).then(() => {
      dispatch(removeAllPhotos())
      setImageScr(null)
      dispatch(postsApi.util.resetApiState())
      setButtonDisabled(false)
    })
  }

  const handlePublish = async () => {
    setButtonDisabled(true)
    handleDiscard()
    const croppedImages = await Promise.all(
      croppers.map(async cropper => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const modifiedImage = await createImage(cropper.image)

        canvas.width = modifiedImage.width
        canvas.height = modifiedImage.height

        ctx?.drawImage(modifiedImage, 0, 0, modifiedImage.width, modifiedImage.height)

        if (ctx) ctx.filter = cropper.filterClass

        ctx?.drawImage(modifiedImage, 0, 0, modifiedImage.width, modifiedImage.height)

        const newImage = new Image()

        newImage.src = canvas.toDataURL()

        const base64Data = canvas.toDataURL('image/jpeg')

        return {
          id: cropper.id,
          image: base64Data,
          croppedAreaPixels: cropper.croppedAreaPixels,
        }
      })
    )

    dispatch(updatePhotos(croppedImages))

    await publishPostImage({ postsPhoto: croppedImages, accessToken })
      .unwrap()
      .then(res => {
        const images = res.images as PostImageDTO[]
        const childrenMetadata = images.map(i => ({ uploadId: i.uploadId }))

        publishDescription({
          description: text,
          childrenMetadata,
          accessToken,
        })
      })
      .then(() => {
        downloadNewPosts()
      })
      .catch(error => {
        dispatch(setAlert({ variant: 'error', message: error }))
      })
  }
  const handleInteractOutside = () => {
    setCloseCrop(true)
  }
  const handleSaveFilterPost = () => {
    handleDiscard()
  }
  const handleCloseCrop = () => {
    setCloseCrop(false)
  }
  const handleDiscordCrop = () => {
    dispatch(removeAllPhotos())
    setImageScr(null)
    setIsDraft(false)
    closeCroppingModal()
    setCloseCrop(false)
  }
  const handleOpenNext = () => {
    if (mode === 'filter') {
      setMode('publish')
    } else {
      handlePublish()
    }
  }
  const onCloseFilter = () => {
    setModalPost(true)
    closeFilter()
  }
  const onPrevStep = () => {
    setMode('filter')
  }

  return (
    <div>
      <CloseCrop
        openCloseCrop={openClosCrop}
        closeCrop={handleCloseCrop}
        onDiscard={handleDiscordCrop}
        savePhotoInDraft={handleSaveFilterPost}
      />
      <Modal
        open={isOpenFilter}
        size={'lg'}
        isCropHeader={true}
        onClickNext={handleOpenNext}
        closePostModal={mode === 'filter' ? onCloseFilter : onPrevStep}
        title={mode === 'filter' ? t.post.filter_modal : t.post.publication_modal}
        showCloseButton={false}
        isPost
        onInteractOutside={handleInteractOutside}
        buttonText={mode === 'filter' ? t.post.button_navigation_text : t.post.publish_button}
        disableButton={mode === 'publish' && isButtonDisabled}
      >
        {mode === 'filter' ? (
          <FilteringData isOpenFilter={isOpenFilter} />
        ) : (
          <PublicationData photos={croppers} />
        )}
      </Modal>
    </div>
  )
}
