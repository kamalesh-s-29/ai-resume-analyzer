import PagePlaceholder from '../components/common/PagePlaceholder.jsx'
import { PAGE_PLACEHOLDERS } from '../data/appConfig.js'

function DashboardPage() {
  return (
    <PagePlaceholder
      title={PAGE_PLACEHOLDERS.dashboard.title}
      description={PAGE_PLACEHOLDERS.dashboard.description}
    />
  )
}

export default DashboardPage
