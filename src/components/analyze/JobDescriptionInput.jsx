const MAX_DESCRIPTION_LENGTH = 5000

function JobDescriptionInput({ value, onChange, error }) {
  const textareaId = 'job-description'

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label htmlFor={textareaId} className="text-sm font-medium text-slate-700">
          Job Description
        </label>
        <span className="text-xs font-medium text-slate-500">
          {value.length} / {MAX_DESCRIPTION_LENGTH} characters
        </span>
      </div>

      <textarea
        id={textareaId}
        rows={12}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Paste the job description you're applying for..."
        maxLength={MAX_DESCRIPTION_LENGTH}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        className={[
          'w-full resize-y rounded-xl border bg-white px-3.5 py-3 text-base text-slate-900 shadow-sm transition placeholder:text-slate-400',
          error
            ? 'border-red-300 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200'
            : 'border-slate-200 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100',
        ].join(' ')}
      />

      {error && (
        <p id={`${textareaId}-error`} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export default JobDescriptionInput
export { MAX_DESCRIPTION_LENGTH }
