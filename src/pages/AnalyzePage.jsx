import PagePlaceholder from '../components/common/PagePlaceholder.jsx'
import { PAGE_PLACEHOLDERS } from '../data/appConfig.js'

function AnalyzePage() {
  return (
    <PagePlaceholder
      title={PAGE_PLACEHOLDERS.analyze.title}
      description={PAGE_PLACEHOLDERS.analyze.description}
    />
  )
}

export default AnalyzePage
