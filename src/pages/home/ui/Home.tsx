import {useRouter} from 'next/router'

import s from './home.module.scss'

import {useGetPostOfFollowersQuery} from '@/entities/posts/api/postsApi'
import {Button, SwiperSlider} from '@/shared/components'
import {useAuth} from '@/shared/lib/hooks/useAuth'
import {getHeaderWithSidebarLayout} from '@/widgets/layouts'
import {PostCommentsView} from '@/widgets/postViewModal/UI/PostCommentsView'
import {PostsHome} from "@/pages/home/ui/PostsHome";
import {useModal} from "@/shared/lib/hooks/open-or-close-hook";
import React, {useEffect} from "react";
import {useSearchParams} from "next/navigation";
import {PostViewModal} from "@/widgets/postViewModal";

function Home() {
    const isSSR = useRouter().asPath.includes('home')
    const {accessToken} = useAuth()
    const {data: fakePost} = useGetPostOfFollowersQuery({accessToken})

    return (
        <div className={s.container}>
            <div className={s.block}>
                {fakePost &&
                    fakePost.items.map((el: PostDataType) => {
                        return (
                            <>
                                <div className={s.postCommentsView}>
                                    <PostsHome
                                        img={el.images}
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
