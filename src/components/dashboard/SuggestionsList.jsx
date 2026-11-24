import { ArrowRight } from 'lucide-react'

function SuggestionsList({ suggestions }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h3 className="text-xl font-semibold text-slate-900">Improvement Suggestions</h3>

      <ol className="mt-5 space-y-3">
        {suggestions.map((suggestion, index) => (
          <li key={suggestion} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700">
              {index + 1}
            </span>
            <span>{suggestion}</span>
          </li>
        ))}
      </ol>

      <div className="mt-5 flex items-center gap-2 text-sm font-medium text-brand-700">
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
        Keep refining for the target role.
      </div>
    </div>
  )
}

export default SuggestionsList
