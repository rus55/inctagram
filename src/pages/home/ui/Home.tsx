import { useRouter } from 'next/router'

import s from './home.module.scss'

import { useGetPublicPostsQuery } from '@/entities/publicPosts'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { getHeaderWithSidebarLayout } from '@/widgets/layouts'
import { PostCommentsView } from '@/widgets/postViewModal/UI/PostCommentsView'
import {SwiperSlider} from "@/shared/components";
import {useGetPostOfFollowersQuery} from "@/entities/posts/api/postsApi";

function Home() {
  const isSSR = useRouter().asPath.includes('home')
  const { accessToken } = useAuth()
  const { data: fakePost } = useGetPostOfFollowersQuery({accessToken})

  return (
    <div className={s.container}>
      <div className={s.block}>
        {fakePost &&
          fakePost.items.map((el: PostDataType) => {
            return (
              <>
                  <div className={s.imageContainer}>{fakePost && <SwiperSlider imagesUrl={el && el.images} />}</div>
                  <div className={s.postCommentsView}>
                  <PostCommentsView
                    key={el.id}
                    isSSR={isSSR}
                    id={el.id}
                    ownerId={el.ownerId}
                    avatarOwner={el.avatarOwner}
                    userName={el.userName}
                    description={el.description}
                    updatedAt={el.updatedAt}
                  />
                </div>
              </>
            )
          })}
      </div>
    </div>
  )
}

Home.getLayout = getHeaderWithSidebarLayout

export { Home }
