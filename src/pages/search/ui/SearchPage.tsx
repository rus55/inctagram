import { getHeaderWithSidebarLayout } from '@/widgets/layouts'
import { SearchUser } from '@/widgets/search/ui/SearchUser'

function SearchPage() {
  return (
    <div className="bg-dark-700 pt-10 pl-6 pr-6 md:pr-16 pb-16 lg:pb-0">
      <SearchUser />
    </div>
  )
}

SearchPage.getLayout = getHeaderWithSidebarLayout

export { SearchPage }
