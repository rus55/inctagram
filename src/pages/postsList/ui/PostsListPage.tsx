import { ApolloProvider } from '@apollo/client'

import { getSuperAdminLayoutLayout } from '@/widgets/layouts/superAdmin-layout/SuperAdminLayout'
import client from '@/widgets/superAdmin/postsList/apolloClient/apolloClient'
import { PostsList } from '@/widgets/superAdmin/postsList/PostsList'

const PostsListPage = () => {
  return (
    <div className="bg-dark-700 pt-10 pl-6 pr-6 md:pr-16 pb-16 lg:pb-0">
      <ApolloProvider client={client}>
        <PostsList />
      </ApolloProvider>
    </div>
  )
}

PostsListPage.getLayout = getSuperAdminLayoutLayout

export { PostsListPage }
