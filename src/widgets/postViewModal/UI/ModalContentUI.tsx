import { useRouter } from 'next/router'

import { PostCommentsView, PostModalHeader } from './PostCommentsView'
import s from './PostViewModal.module.scss'

import { SwiperSlider } from '@/shared/components'

type Props = {
  data: PostDataType
}

export const ModalContentUI = ({ data }: Props) => {
  const isSSR = useRouter().asPath.includes('public-posts')

  return (
    <div className={s.modalContent}>
      {data && (
        <div className={s.headerOnTop}>
          <PostModalHeader
            ownerId={data.ownerId}
            avatarOwner={data.avatarOwner}
            userName={data.userName}
            isSSR={isSSR}
            setModalType={() => null}
            openDeleteModal={() => null}
          />
        </div>
      )}
      <div className={s.imageContainer}>{data && <SwiperSlider imagesUrl={data.images} />}</div>
      <div className={s.commentsContainer}>
        {data && (
          <PostCommentsView
            id={data.id}
            isSSR={isSSR}
            setModalType={() => ({})}
            ownerId={data.ownerId}
            avatarOwner={data.avatarOwner}
            userName={data.userName}
            description={data.description}
            updatedAt={data.updatedAt}
            openDeleteModal={() => ({})}
          />
        )}
      </div>
    </div>
  )
}
