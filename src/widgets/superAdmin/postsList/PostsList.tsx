import React, { useEffect, useState } from 'react'

import { useGetPostsListMutation } from '@/entities/users/api/usersApi'
import { SortDirection } from '@/shared/constants/enum'
import { useFetchLoader, useTranslation } from '@/shared/lib'
import { Post } from '@/widgets/superAdmin/postsList/post/Post'
import { DebouncedInput } from '@/widgets/superAdmin/userList/DebouncedInput'

export const PostsList = () => {
  const { t } = useTranslation()

  const [searchUserName, setSearchUserName] = useState<string>('')
  const [loadedPosts, setLoadedPosts] = useState<PostsAll | null>(null)

  const [getPosts, { isLoading }] = useGetPostsListMutation()

  useEffect(() => {
    const initialPost = {
      // endCursorPostId: loadedPosts?.items[loadedPosts.items.length - 1].id || null,
      endCursorPostId: 1165,
      searchTerm: searchUserName,
      pageSize: 34,
      sortBy: 'createdAt',
      sortDirection: SortDirection.DESC,
    }

    getPosts(initialPost)
      .unwrap()
      .then(res => {
        setLoadedPosts(res.data.getPosts)
      })
  }, [searchUserName])

  const onDebounce = (value: string) => {
    setSearchUserName(value)
  }

  useFetchLoader(isLoading)

  console.log(loadedPosts)

  return (
    <div>
      <div className="mb-7">
        <DebouncedInput callback={onDebounce} />
      </div>
      <Post posts={loadedPosts?.items || []} />
    </div>
  )
}
