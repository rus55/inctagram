import { ImageCard } from '@/shared/components/imageCard'

type Props = {
  posts: any[]
  openModal?: (id: number) => void
}

export const ImageListUI = ({ posts, openModal }: Props) => {
  return (
    <>
      {!!posts?.length &&
        posts.map(({ id, url, description, width, height }) => (
          <ImageCard
            key={id}
            postId={id}
            src={url}
            alt={description}
            width={width}
            height={height}
            openModal={openModal}
          />
        ))}
    </>
  )
}
