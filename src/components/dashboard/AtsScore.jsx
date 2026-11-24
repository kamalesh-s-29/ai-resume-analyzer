function AtsScore({ score, label }) {
  const normalizedScore = Math.min(Math.max(score, 0), 100)
  const circumference = 2 * Math.PI * 52
  const dashOffset = circumference - (normalizedScore / 100) * circumference

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col items-center text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">ATS Score</p>

        <div className="relative mt-5 flex h-40 w-40 items-center justify-center">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="60" cy="60" r="52" stroke="#e2e8f0" strokeWidth="12" fill="none" />
            <circle
              cx="60"
              cy="60"
              r="52"
              stroke="#4f46e5"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
            />
          </svg>

          <div className="absolute text-center">
            <div className="text-4xl font-bold tracking-tight text-slate-900">{score}</div>
            <div className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">/100</div>
          </div>
        </div>

        <p className="mt-4 text-lg font-semibold text-slate-900">{label}</p>
      </div>
    </div>
  )
}

export default AtsScore
