import {useRouter} from 'next/router'

import s from './home.module.scss'
import {getHeaderWithSidebarLayout} from '@/widgets/layouts'
import {PostCommentsView} from '@/widgets/postViewModal/UI/PostCommentsView'
import {useAuth} from "@/shared/lib/hooks/useAuth";
import {useGetPublicPostsQuery} from "@/entities/publicPosts";

function Home() {
    const isSSR = useRouter().asPath.includes('home')
    const {accessToken} = useAuth()
    // const { data: fakePost } = useGetPostOfFollowersQuery({accessToken})
    const {data: fakePost} = useGetPublicPostsQuery()

    return (
        <div className={s.container}>
            <div className={s.block}>
                {fakePost &&
                    fakePost.items.map((el: PostDataType) => {
                        return (
                            <>
                                <img className={s.Imglist} src={el.images.map(el => el.url)}/>
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

export {Home}
