import { FileText, UploadCloud, X } from 'lucide-react'
import { useId, useState } from 'react'

const MAX_FILE_SIZE = 5 * 1024 * 1024

function formatFileSize(bytes) {
  if (bytes === 0) return '0 B'

  const units = ['B', 'KB', 'MB', 'GB']
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const value = bytes / 1024 ** index

  return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)} ${units[index]}`
}

function ResumeUpload({ selectedFile, onFileSelect, onClear, error }) {
  const inputId = useId()
  const [isDragging, setIsDragging] = useState(false)

  const handleInputChange = (event) => {
    const file = event.target.files?.[0]

    if (file) {
      onFileSelect(file)
    }

    event.target.value = ''
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)

    const file = event.dataTransfer.files?.[0]

    if (file) {
      onFileSelect(file)
    }
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">Resume file</label>

      <div
        role="button"
        tabIndex={0}
        onDragOver={(event) => {
          event.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            document.getElementById(inputId)?.click()
          }
        }}
        className={[
          'rounded-2xl border border-dashed p-4 transition sm:p-5',
          isDragging
            ? 'border-brand-600 bg-brand-50'
            : error
              ? 'border-red-300 bg-red-50'
              : 'border-slate-300 bg-slate-50 hover:border-brand-300 hover:bg-white',
        ].join(' ')}
      >
        <input
          id={inputId}
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleInputChange}
          className="hidden"
        />

        {selectedFile ? (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <FileText className="h-5 w-5" aria-hidden="true" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">{selectedFile.name}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {formatFileSize(selectedFile.size)} · {selectedFile.type || 'Document'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              Remove
            </button>
          </div>
        ) : (
          <label htmlFor={inputId} className="flex cursor-pointer flex-col items-center justify-center gap-3 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-sm ring-1 ring-slate-200">
              <UploadCloud className="h-7 w-7" aria-hidden="true" />
            </div>

            <div>
              <p className="text-base font-semibold text-slate-900">Upload your resume</p>
              <p className="mt-1 text-sm text-slate-600">Drag &amp; drop your resume here or browse</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                PDF or DOCX
              </p>
            </div>
          </label>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  )
}

export default ResumeUpload
export { MAX_FILE_SIZE }
