import { useRouter } from 'next/router'

import { PostCommentsView, PostModalHeader } from '../PostComments/PostCommentsView'

import { SwiperSlider } from '@/shared/components'
import s from '@/widgets/postViewModal/UI/PostView/PostViewModal.module.scss'

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
            isLiked={data.isLiked}
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
