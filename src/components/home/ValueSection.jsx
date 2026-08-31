import { ArrowUpRight, BriefcaseBusiness, Sparkles, Target } from 'lucide-react'

const valueItems = [
  {
    icon: Target,
    title: 'ATS-focused analysis',
    description: 'Ensure your resume is structured for screening systems and recruiter review.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Job-specific insights',
    description: 'See how your experience aligns with the duties and priorities of the role.',
  },
  {
    icon: Sparkles,
    title: 'Skill matching',
    description: 'Identify the strengths already on your resume and the gaps to close.',
  },
  {
    icon: ArrowUpRight,
    title: 'Actionable recommendations',
    description: 'Turn feedback into concrete improvements you can apply to your resume quickly.',
  },
]

function ValueSection() {
  return (
    <section aria-labelledby="value-heading" className="border-y border-slate-200 bg-white/80">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-700">Why it matters</p>
          <h2 id="value-heading" className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            A clearer view of where your resume is strong and where it can improve.
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {valueItems.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
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

export default ValueSection
