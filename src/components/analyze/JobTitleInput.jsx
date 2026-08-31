function JobTitleInput({ value, onChange, error }) {
  const inputId = 'target-job-title'

  return (
    <div>
      <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-slate-700">
        Target Job Title
      </label>

      <input
        id={inputId}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="e.g. Java Backend Developer"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={[
          'w-full rounded-xl border bg-white px-3.5 py-3 text-base text-slate-900 shadow-sm transition placeholder:text-slate-400',
          error
            ? 'border-red-300 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200'
            : 'border-slate-200 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100',
        ].join(' ')}
      />

      {error && (
        <p id={`${inputId}-error`} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export default JobTitleInput
