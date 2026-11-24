import { CalendarDays, FileText, Sparkles } from 'lucide-react'

function DashboardHeader({ targetJobTitle, resumeName, analysisDate, status }) {
  return (
    <header className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-700">Resume Analysis</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {targetJobTitle}
          </h1>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          {status}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
          <FileText className="h-4 w-4 text-slate-500" aria-hidden="true" />
          {resumeName}
        </div>

        <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
          <CalendarDays className="h-4 w-4 text-slate-500" aria-hidden="true" />
          {analysisDate}
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
