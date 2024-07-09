enum SortDirection {
  DESC = "desc",
  ASC = "asc",
}

enum UserBlockStatus {
  ALL = "ALL",
  BLOCKED = "BLOCKED",
  UNBLOCKED = "UNBLOCKED",
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
  items: ImagePost[]
}

enum SuperAdminStatus {
  PENDING = PENDING,
  ACTIVE = ACTIVE,
  FINISHED = FINISHED,
  DELETED = DELETED
}

enum SuperAdminType {
  MONTHLY = MONTHLY,
  DAY = DAY,
  WEEKLY = WEEKLY
}

enum SuperAdminPaymentType {
  STRIPE = STRIPE,
  PAYPAL = PAYPAL,
  CREDIT_CARD = CREDIT_CARD
}

enum SuperAdminCurrency {
  USD = USD,
  EUR = EUR
}

type SuperAdminPayments = {
  id: number,
  userId: number,
  paymentMethod: SuperAdminPaymentType,
  amount: number,
  currency: SuperAdminCurrency,
  createdAt: Date,
  endDate: Date,
  type: SuperAdminType
}

type SuperAdminItemsByUser = {
  id: number
  businessAccountId: number
  status: SuperAdminStatus
  dateOfPayment: Date
  startDate: Date
  endDate: Date
  type: SuperAdminType
  price: number
  paymentType: SuperAdminPaymentType
  payments: SuperAdminPayments[]
}

type SuperAdminPagePaymentsByUser = {
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
  items: SuperAdminItemsByUser[]
}

type FollowItems = {
  id: number
  userId: number
  userName: string
  createdAt: Date
}

type FollowContent = Omit<SuperAdminPagePaymentsByUser, 'items'> & {
  items: FollowItems[]
}

type PaymentsAllItems = SuperAdminPayments & {
  userName: string
  avatars: Avatar
}

type PaymentsAll = Omit<SuperAdminPagePaymentsByUser, 'items'> & {
  items: PaymentsAllItems[]
}