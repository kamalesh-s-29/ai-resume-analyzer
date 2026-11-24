function ScoreCard({ label, value, tone = 'indigo' }) {
  const toneClasses = {
    indigo: 'bg-brand-50 text-brand-700',
    emerald: 'bg-emerald-50 text-emerald-700',
    blue: 'bg-sky-50 text-sky-700',
    amber: 'bg-amber-50 text-amber-700',
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-slate-600">{label}</p>
        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${toneClasses[tone]}`}>
          {value}%
        </span>
      </div>
      <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
    </div>
  )
}

export default ScoreCard
