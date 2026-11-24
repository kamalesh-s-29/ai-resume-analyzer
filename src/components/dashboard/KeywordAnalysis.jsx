function KeywordAnalysis({ keywordCoverage, matchedKeywords, missingKeywords }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Keyword Analysis</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{keywordCoverage}% coverage</h3>
        </div>

        <div className="mt-2 h-2.5 w-full max-w-xs overflow-hidden rounded-full bg-slate-200 sm:mt-0 sm:w-52">
          <div className="h-full rounded-full bg-brand-600" style={{ width: `${keywordCoverage}%` }} />
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-emerald-700">Matched keywords</h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {matchedKeywords.map((keyword) => (
              <li key={keyword} className="rounded-full bg-emerald-50 px-2.5 py-1.5 text-sm font-medium text-emerald-700">
                {keyword}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-amber-700">Missing keywords</h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {missingKeywords.map((keyword) => (
              <li key={keyword} className="rounded-full bg-amber-50 px-2.5 py-1.5 text-sm font-medium text-amber-700">
                {keyword}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default KeywordAnalysis
