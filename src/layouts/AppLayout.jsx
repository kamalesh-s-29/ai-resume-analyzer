import { Outlet } from 'react-router-dom'
import SkipToContent from '../components/layout/SkipToContent.jsx'
import Navbar from '../components/layout/Navbar.jsx'
import SiteFooter from '../components/layout/SiteFooter.jsx'

function AppLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SkipToContent />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}

export default AppLayout
