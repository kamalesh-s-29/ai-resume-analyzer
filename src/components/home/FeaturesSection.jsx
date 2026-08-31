import { FileCheck2, KeyRound, Lightbulb, Target } from 'lucide-react'

const features = [
  {
    icon: FileCheck2,
    title: 'ATS Compatibility',
    description: 'Check whether your resume follows the formatting and structure recruiters often expect.',
  },
  {
    icon: Target,
    title: 'Skill Matching',
    description: 'Compare your experience against the core requirements of the job description.',
  },
  {
    icon: KeyRound,
    title: 'Keyword Insights',
    description: 'Identify the terms and phrases that help your resume resonate with hiring teams.',
  },
  {
    icon: Lightbulb,
    title: 'Actionable Suggestions',
    description: 'Get guidance on how to improve wording, emphasis, and resume positioning.',
  },
]

function FeaturesSection() {
  return (
    <section aria-labelledby="features-heading" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-700">Features</p>
        <h2 id="features-heading" className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Focused feedback for stronger resume performance.
        </h2>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {features.map(({ icon: Icon, title, description }) => (
          <article
            key={title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>

            <h3 className="mt-5 text-xl font-semibold text-slate-900">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection
