import { Link } from 'react-router-dom'
import { ROUTES } from '../data/appConfig.js'

function NotFoundPage() {
  return (
    <section className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center sm:py-28">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
        Page not found
      </h1>
      <p className="mt-3 text-slate-600">
        That URL is not a defined route. Use the navigation to open Home, Analyze,
        Dashboard, or History.
      </p>
      <Link
        to={ROUTES.home}
        className="mt-8 inline-flex rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
      >
        Go to home
      </Link>
    </section>
  )
}

export default NotFoundPage
