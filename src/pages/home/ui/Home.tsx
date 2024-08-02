import {getHeaderWithSidebarLayout} from '@/widgets/layouts'
import {PostCommentsView} from "@/widgets/postViewModal/UI/PostCommentsView";
import {useGetPostOfFollowersQuery} from "@/entities/posts/api/postsApi";
import {useAuth} from "@/shared/lib/hooks/useAuth";
import {useRouter} from "next/router";
import s from './home.module.scss'
import {useGetPublicPostsQuery} from "@/entities/publicPosts";
import {useState} from "react";
import {ShowModalType} from "@/widgets/superAdmin/userList/UserList";

function Home() {
    const isSSR = useRouter().asPath.includes('home')
    const {accessToken} = useAuth()
    const {data, isLoading, error} = useGetPostOfFollowersQuery({accessToken})
    const {data: fakePost} = useGetPublicPostsQuery()

    return (
        <div className={s.container}>
            <div className={s.block}>{fakePost && fakePost.items.map((el: PostDataType) => {
                return (
                    <PostCommentsView
                        isSSR={isSSR}
                        ownerId={el.ownerId}
                        avatarOwner={el.avatarOwner}
                        userName={el.userName}
                        description={el.description}
                        updatedAt={el.updatedAt}
                    />
                )
            })}
            </div>
        </div>
    )
}

Home.getLayout = getHeaderWithSidebarLayout

export {Home}
