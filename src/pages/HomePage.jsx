import PagePlaceholder from '../components/common/PagePlaceholder.jsx'
import { PAGE_PLACEHOLDERS } from '../data/appConfig.js'

function HomePage() {
  return (
    <PagePlaceholder
      title={PAGE_PLACEHOLDERS.home.title}
      description={PAGE_PLACEHOLDERS.home.description}
    />
  )
}

export default HomePage
