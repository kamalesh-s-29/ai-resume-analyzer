const steps = [
  {
    title: 'Upload your resume',
    description: 'Drop in the resume you want to improve and start from the version you already have.',
  },
  {
    title: 'Add your target job description',
    description: 'Paste the role you want to apply for so the analysis can align with that specific opportunity.',
  },
  {
    title: 'Review your personalized analysis',
    description: 'Look through strengths, missing skills, keyword gaps, and concrete recommendations.',
  },
]

function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-it-works-heading" className="bg-slate-900 py-16 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-200">How it works</p>
          <h2 id="how-it-works-heading" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Three simple steps to better resume alignment.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-2xl border border-slate-700 bg-slate-800/80 p-6 shadow-lg shadow-slate-950/20">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-lg font-semibold text-white">
                {index + 1}
              </div>

              <h3 className="mt-5 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
