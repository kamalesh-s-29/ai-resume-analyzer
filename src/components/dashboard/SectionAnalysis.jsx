function SectionAnalysis({ sectionScores }) {
  const sectionEntries = Object.entries(sectionScores)

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h3 className="text-xl font-semibold text-slate-900">Section Analysis</h3>

      <div className="mt-5 space-y-4">
        {sectionEntries.map(([label, value]) => (
          <div key={label}>
            <div className="mb-2 flex items-center justify-between gap-3 text-sm text-slate-600">
              <span className="capitalize">{label}</span>
              <span className="font-medium text-slate-900">{value}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-brand-600" style={{ width: `${value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SectionAnalysis
