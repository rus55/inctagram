import { PublicPostCard } from '@/shared/components/public-post-card'

export const PublicPostsCardsListUI = ({ items }: { items: PostDataType[] }) => {
  return (
    <div className="flex items-center justify-center ">
      <div className="flex justify-center flex-wrap gap-x-3 ">
        {items.map((el: PostDataType) => {
          return (
            <PublicPostCard
              key={el.id}
              postId={el.id}
              ownerId={el.ownerId}
              profileImage={el.avatarOwner}
              imagesUrl={el.images}
              userName={el.userName}
              firstName={el.owner.firstName}
              lastName={el.owner.lastName}
              description={el.description}
              updatedAt={el.updatedAt}
            />
          )
        })}
      </div>
    </div>
  )
}
