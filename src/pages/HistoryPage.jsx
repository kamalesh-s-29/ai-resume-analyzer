import { FileText, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../data/appConfig.js'
import { getHistory, removeHistoryRecord } from '../services/analysisHistoryService.js'
import { saveSession } from '../services/analysisSessionService.js'

function HistoryPage() {
  const navigate = useNavigate()
  const [history, setHistory] = useState([])

  useEffect(() => {
    setHistory(getHistory())
  }, [])

  const handleViewAnalysis = (record) => {
    const resumeName = record.fileName || record.resumeName
    const targetJobTitle = record.jobTitle || record.targetJobTitle
    saveSession({
      resume: { name: resumeName, type: '', size: 0, lastModified: 0 },
      jobTitle: targetJobTitle,
      jobDescription: record.jobDescription || '',
      createdAt: record.date || record.createdAt,
      status: 'completed',
      analysis: record.analysis,
    })
    navigate(ROUTES.dashboard)
  }

  const handleDelete = (id) => {
    if (!window.confirm('Delete this saved analysis?')) return
    setHistory(removeHistoryRecord(id))
  }

  return (
    <section className="bg-slate-50 py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-700">Saved analyses</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Analysis history</h1>
          <p className="mt-3 max-w-2xl text-slate-600">Review previous resume comparisons stored in this browser.</p>
        </div>

        {history.length === 0 ? (
          <div className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm sm:p-12">
            <FileText className="mx-auto h-10 w-10 text-slate-400" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-semibold text-slate-900">No analyses yet</h2>
            <p className="mt-2 text-slate-600">Analyze a resume to see your results here.</p>
            <button
              type="button"
              onClick={() => navigate(ROUTES.analyze)}
              className="mt-6 rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-brand-700"
            >
              Analyze Your First Resume
            </button>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {history.map((record) => (
              <article
                key={record.id}
                className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                    <h2 className="truncate text-lg font-semibold text-slate-900">{record.fileName || record.resumeName}</h2>
                  </div>
                  <p className="mt-2 text-slate-600">{record.jobTitle || record.targetJobTitle}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {new Date(record.date || record.createdAt).toLocaleString()} · ATS {record.atsScore ?? record.analysis?.atsScore ?? 'Not available'}% · Skill {record.skillMatch ?? record.analysis?.skillMatch ?? 'Not available'}% · Keywords {record.keywordMatch ?? record.analysis?.keywordMatch ?? 'Not available'}%
                  </p>
                </div>

                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => handleViewAnalysis(record)}
                    className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
                  >
                    View Analysis
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete analysis for ${record.fileName || record.resumeName}`}
                    onClick={() => handleDelete(record.id)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default HistoryPage
