import { BriefcaseBusiness, LayoutTemplate, Search, TrendingUp } from 'lucide-react'

const benefits = [
  {
    icon: TrendingUp,
    title: 'Identify missing skills',
    description: 'Spot the capabilities your resume may not be emphasizing enough for the target role.',
  },
  {
    icon: Search,
    title: 'Discover important keywords',
    description: 'Surface the terms and phrasing that improve relevance and recruiter recognition.',
  },
  {
    icon: LayoutTemplate,
    title: 'Improve resume structure',
    description: 'Refine the way experience, skills, and achievements are presented for clarity.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Tailor resumes toward specific roles',
    description: 'Adjust your content to fit each job description without losing your core story.',
  },
]

function BenefitsSection() {
  return (
    <section aria-labelledby="benefits-heading" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-700">Benefits</p>
          <h2 id="benefits-heading" className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            A resume strategy built around relevance and clarity.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            The goal is not to rewrite your experience from scratch, but to help you present it more clearly,
            confidently, and directly for the roles you want.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-700 shadow-sm ring-1 ring-slate-200">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection
