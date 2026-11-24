import { CheckCircle2 } from 'lucide-react'

function StrengthsList({ strengths }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h3 className="text-xl font-semibold text-slate-900">Resume Strengths</h3>

      <ul className="mt-5 space-y-3">
        {strengths.map((strength) => (
          <li key={strength} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
            <span>{strength}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StrengthsList
