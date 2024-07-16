import {getHeaderWithSidebarLayout} from '@/widgets/layouts'
import {PostCommentsView} from "@/widgets/postViewModal/UI/PostCommentsView";
import {useGetPostOfFollowersQuery} from "@/entities/posts/api/postsApi";
import {useAuth} from "@/shared/lib/hooks/useAuth";
import {useRouter} from "next/router";
import {useModal} from "@/shared/lib/hooks/open-or-close-hook";

function Home()
{
    const isSSR = useRouter().asPath.includes('public-posts')
    const { accessToken } = useAuth()
    const { data, isLoading, error } = useGetPostOfFollowersQuery({ accessToken })
    const {
        isOpen: isDeleteOpen,
        openModal: openDeleteModal,
        closeModal: closeDeleteModal,
    } = useModal()
    return (
        <div>
            {data && data.updatedAt === undefined ? 'Нету друзей' : data &&
            <PostCommentsView
                isSSR={isSSR}
                // setModalType={setModalType}
                ownerId={data.ownerId}
                avatarOwner={data.avatarOwner}
                userName={data.userName}
                description={data.description}
                updatedAt={data.updatedAt}
                openDeleteModal={openDeleteModal}
                />
           }

        </div>
    )
}

Home.getLayout = getHeaderWithSidebarLayout

export {Home}
