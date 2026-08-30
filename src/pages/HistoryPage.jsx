import PagePlaceholder from '../components/common/PagePlaceholder.jsx'
import { PAGE_PLACEHOLDERS } from '../data/appConfig.js'

function HistoryPage() {
  return (
    <PagePlaceholder
      title={PAGE_PLACEHOLDERS.history.title}
      description={PAGE_PLACEHOLDERS.history.description}
    />
  )
}

export default HistoryPage
