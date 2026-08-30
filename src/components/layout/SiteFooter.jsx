import { APP_NAME } from '../../data/appConfig.js'

function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-500 sm:px-6">
        <p>
          © {year} {APP_NAME}
        </p>
      </div>
    </footer>
  )
}

export default SiteFooter
