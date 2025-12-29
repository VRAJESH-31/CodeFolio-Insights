import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

function SubmissionChart({title="Submission Activity", submissionData, className}) {

  return (
      <div className={`${className} xl:col-span-2 bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-gray-100 animate-float-in`} style={{ animationDelay: '1000ms' }}>
        <h3 className="text-xl font-black text-gray-800 mb-8 uppercase tracking-widest">{title}</h3>
        <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={submissionData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" hide />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)', border: 'none', borderRadius: '1rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                    <Line type="monotone" dataKey="submissions" stroke="#3b82f6" strokeWidth={4} dot={{ fill: '#3b82f6', r: 4, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, strokeWidth: 0 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
  )
}

export default SubmissionChart
