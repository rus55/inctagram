type CountriesDataDict = Record<string, string[]>

type CountriesRTKOutput = {
    countriesDataDict: CountriesDataDict
    countriesWithoutCities: City[]
    responseError: boolean
};

type ImagesUrlData = Record<number, string[]>

type PublicPostCardProps = {
    postId: number
    ownerId: number
    profileImage?: string | StaticImageData
    description: string
    imagesUrl: ImagesUrlData[]
    userName: string
    firstName: string
    lastName: string
    updatedAt: string
}

type PublicPostsResponseData = {
    items: PostDataType[]
    totalCount: number
    pageSize: number
    totalUsers: number
}
type PublicPostsGetLikes = {
    items: GetLikedData[]
    totalCount: number
    pageSize: number
}

type CommentsResponseData = {
    items: CommentsDataType[]
    totalCount: number
    pageSize: number
}

type Owner = {
    firstName: string
    lastName: string
}
type From = {
    id: number;
    username: string;
    avatars: Avatar[];
}
type Avatar = {
    url: string,
    width: number,
    height: number,
    fileSize: number
}

type PostDataType = {
    id: number
    ownerId: number
    userName: string
    description: string
    images: PostImageDTO[]
    owner: Owner
    avatarOwner: string
    updatedAt: string
    createdAt:string
    likesCount:number
    isLiked:boolean
}
type GetLikedData = {
    id: number,
    userId:number,
    userName:string,
    createdAt: string,
    avatars:Avatar[]
}

type CommentsDataType = {
    id: number
    postId: number
    from:From
    content:string
    likeCount:number
    isLiked:boolean
    createdAt:string
    avatars:any
}
