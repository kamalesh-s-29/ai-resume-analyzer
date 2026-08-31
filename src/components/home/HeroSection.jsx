import { ArrowRight, BriefcaseBusiness, CheckCircle2, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const heroHighlights = [
  { icon: CheckCircle2, label: 'ATS-ready structure' },
  { icon: BriefcaseBusiness, label: 'Role-specific feedback' },
  { icon: Sparkles, label: 'Clear next steps' },
]

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(79,70,229,0.12),transparent_38%)]" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr]">
          <div>
            <span className="inline-flex items-center rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">
              Resume intelligence for modern job search
            </span>

            <h1 className="mt-6 max-w-xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Turn your resume into a stronger match for the role you want.
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              AI Resume Analyzer helps you review your resume against a target role, spot missing
              skills, and improve the language that hiring teams are looking for.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/analyze"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                Analyze My Resume
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                See How It Works
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {heroHighlights.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm"
                >
                  <Icon className="h-4 w-4 text-brand-600" aria-hidden="true" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-brand-100/80 blur-3xl" aria-hidden="true" />

            <div className="relative rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.45)] sm:p-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                      Resume Overview
                    </p>
                    <h2 className="mt-2 text-xl font-semibold text-slate-900">Target Role Fit</h2>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    Strong match
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                      <span>ATS alignment</span>
                      <span>High</span>
                    </div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full w-[82%] rounded-full bg-brand-600" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                      <span>Keyword coverage</span>
                      <span>Relevant</span>
                    </div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full w-[74%] rounded-full bg-indigo-500" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                      <span>Experience fit</span>
                      <span>Aligned</span>
                    </div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full w-[88%] rounded-full bg-teal-500" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {['Leadership', 'Product strategy', 'Stakeholder communication'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 rounded-xl border border-brand-100 bg-white p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <CheckCircle2 className="h-4 w-4 text-brand-600" aria-hidden="true" />
                    Suggested focus area
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Add more quantified outcomes and role-specific keywords to strengthen your match.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
