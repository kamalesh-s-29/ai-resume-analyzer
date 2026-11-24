import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const COLORS = ['#4f46e5', '#e2e8f0']

function SkillGapChart({ data }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Skill Coverage</p>
        <h3 className="mt-2 text-xl font-semibold text-slate-900">Skill Match / Gap</h3>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={54} outerRadius={82} paddingAngle={3}>
              {data.map((entry, index) => (
                <Cell key={`${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value}%`, 'Share']}
              contentStyle={{ borderRadius: 12, borderColor: '#e2e8f0' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-center gap-6 text-sm text-slate-600">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
            {entry.name} {entry.value}%
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillGapChart
