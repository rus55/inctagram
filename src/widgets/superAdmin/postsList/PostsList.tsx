import React, { useEffect, useState } from 'react'

import { useSubscription, gql } from '@apollo/client'

import { useGetPostsListMutation } from '@/entities/users/api/usersApi'
import { SortDirection } from '@/shared/constants/enum'
import { useFetchLoader } from '@/shared/lib'
import Post from '@/widgets/superAdmin/postsList/post/Post'
import { DebouncedInput } from '@/widgets/superAdmin/userList/DebouncedInput'

const NEW_POST_SUBSCRIPTION = gql`
  subscription {
    postAdded {
      images {
        id
        createdAt
        url
        width
        height
        fileSize
      }
      id
      ownerId
      description
      createdAt
      updatedAt
      postOwner {
        id
        userName
        firstName
        lastName
        avatars {
          url
          width
          height
          fileSize
        }
      }
    }
  }
`

export const PostsList = () => {
  const [searchUserName, setSearchUserName] = useState<string>('')
  const [loadedPosts, setLoadedPosts] = useState<PostsAll | null>(null)
  const [fetching, setFetching] = useState(true)

  const [getPosts, { isLoading }] = useGetPostsListMutation()
  const { data, loading } = useSubscription(NEW_POST_SUBSCRIPTION, {
    onData: () => {
      setLoadedPosts(null)
    },
  })

  useEffect(() => {
    const initialPost = {
      endCursorPostId: loadedPosts?.items[loadedPosts.items.length - 1].id || null,
      searchTerm: searchUserName,
      pageSize: 8,
      sortBy: 'createdAt',
      sortDirection: SortDirection.DESC,
    }

    if (fetching || data) {
      getPosts(initialPost)
        .unwrap()
        .then(res => {
          setLoadedPosts(prev => {
            if (prev) {
              return {
                pageCount: res.data.getPosts.pageCount,
                pageSize: res.data.getPosts.pageSize,
                totalCount: res.data.getPosts.totalCount,
                items: [...prev.items, ...res.data.getPosts.items],
              }
            } else {
              return {
                ...res.data.getPosts,
              }
            }
          })
        })
        .finally(() => {
          setFetching(false)
        })
    }
  }, [searchUserName, fetching, data])

  const scrollHandler = (e: any) => {
    if (!loadedPosts) return
    if (
      e.target.scrollHeight - (e.target.scrollTop + window.innerHeight) < 100 &&
      loadedPosts?.items.length < loadedPosts?.totalCount
    ) {
      setFetching(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler, true)

    return () => {
      window.removeEventListener('scroll', scrollHandler, true)
    }
  }, [scrollHandler])

  const onDebounce = (value: string) => {
    setSearchUserName(value)
    setLoadedPosts(null)
    setFetching(true)
  }

  useFetchLoader(isLoading)

  return (
    <div>
      <div className="mb-7">
        <DebouncedInput callback={onDebounce} />
      </div>
      <div className="flex items-center justify-center ">
        <div className="flex justify-between flex-wrap gap-y-3.5 ">
          {loadedPosts?.items.map(post => (
            <Post
              key={post.id}
              profileAvatar={post.postOwner.avatars}
              postId={post.id}
              ownerId={post.ownerId}
              description={post.description}
              imagesUrl={post.images}
              userName={post.postOwner.userName}
              firstName={post.postOwner.firstName}
              lastName={post.postOwner.lastName}
              updatedAt={String(post.updatedAt)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
