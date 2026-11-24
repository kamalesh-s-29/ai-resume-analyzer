function LoadingDashboard() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <div className="h-6 w-40 rounded bg-slate-200" />
        <div className="mt-4 h-10 w-72 rounded bg-slate-200" />
        <div className="mt-6 flex gap-3">
          <div className="h-9 w-40 rounded-xl bg-slate-200" />
          <div className="h-9 w-40 rounded-xl bg-slate-200" />
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="h-64 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm" />
        <div className="grid gap-4 sm:grid-cols-2">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-32 rounded-2xl border border-slate-200 bg-white shadow-sm" />
          ))}
        </div>
      </div>

      <div className="mt-8 h-80 rounded-[2rem] border border-slate-200 bg-white shadow-sm" />
    </div>
  )
}

export default LoadingDashboard
