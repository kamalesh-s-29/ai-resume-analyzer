import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function ScoreBreakdownChart({ data }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Score Breakdown</p>
        <h3 className="mt-2 text-xl font-semibold text-slate-900">Resume Score Breakdown</h3>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={28}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#475569', fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: '#475569', fontSize: 12 }} domain={[0, 100]} />
            <Tooltip
              cursor={{ fill: '#eef2ff' }}
              contentStyle={{ borderRadius: 12, borderColor: '#e2e8f0' }}
            />
            <Bar dataKey="value" fill="#4f46e5" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ScoreBreakdownChart
