import { CheckCircle2, CircleAlert } from 'lucide-react'

function SkillMatch({ matchedSkills, missingSkills }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />
          <h3 className="text-xl font-semibold text-slate-900">Matched Skills</h3>
        </div>

        <ul className="mt-5 flex flex-wrap gap-2">
          {matchedSkills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-2">
          <CircleAlert className="h-5 w-5 text-amber-600" aria-hidden="true" />
          <h3 className="text-xl font-semibold text-slate-900">Missing Skills</h3>
        </div>

        <ul className="mt-5 flex flex-wrap gap-2">
          {missingSkills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SkillMatch
