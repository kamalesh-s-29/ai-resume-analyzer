import { ArrowRight } from 'lucide-react'

function EmptyDashboardState({ onStartAnalysis }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-700">No active analysis</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">No active analysis found.</h2>
        <p className="mt-3 text-base text-slate-600">
          Start a new analysis to generate a structured resume review for your target role.
        </p>

        <button
          onClick={onStartAnalysis}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          Start a New Analysis
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default EmptyDashboardState
