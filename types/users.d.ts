enum SortDirection {
  DESC = 'desc',
  ASC = 'asc',
}

enum UserBlockStatus {
  ALL = 'ALL',
  BLOCKED = 'BLOCKED',
  UNBLOCKED = 'UNBLOCKED',
}

type GetUsersType = {
  pageSize: number
  pageNumber: number
  sortBy: string
  sortDirection: SortDirection
  searchTerm: string
  statusFilter: UserBlockStatus
}

type Avatar = {
  url: string
  width: number
  height: number
  fileSize: number
}

type ProfileUser = {
  id: number
  userName: string
  firstName: string
  lastName: string
  city: string
  dateOfBirth: Date
  aboutMe: string
  createdAt: Date
  avatars: Avatar
}

type UserBanType = {
  reason: string
  createdAt: Date
}

type User = {
  id: number
  userName: string
  email: string
  createdAt: Date
  profile: ProfileUser
  userBan: UserBanType
}

type PaginationModel = {
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
}

type UsersResponse = {
  users: User
  pagination: PaginationModel
}

type ImagePost = {
  id: number
  createdAt: Date
  url: string
  width: number
  height: number
  fileSize: number
}

type Posts = {
  pagesCount: number
  pageSize: number
  totalCount: number
  items:ImagePost[]
}