import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Credit Cards', value: 15000 },
  { name: 'Personal Loans', value: 8000 },
  { name: 'Medical Debt', value: 3500 },
  { name: 'Auto Loan', value: 12000 },
];

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6'];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Analytics</h1>
          <p className="text-zinc-400">Graphical analytics & data export views.</p>
        </div>
        <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium border border-zinc-700">
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 h-[400px]">
          <h3 className="text-lg font-medium text-white mb-4">Debt Distribution</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '0.5rem', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
                formatter={(value: number) => `₹${value.toLocaleString()}`}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
           <h3 className="text-lg font-medium text-white mb-4">Summary Statistics</h3>
           <div className="space-y-4">
             {data.map((item, idx) => (
               <div key={idx} className="flex justify-between items-center p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                 <div className="flex items-center gap-3">
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                   <span className="text-zinc-300 font-medium">{item.name}</span>
                 </div>
                 <span className="text-white font-mono">₹{item.value.toLocaleString()}</span>
               </div>
             ))}
           </div>
           
           <div className="mt-8 pt-6 border-t border-zinc-800">
             <div className="flex justify-between items-center">
               <span className="text-zinc-400 font-medium">Total Portfolio</span>
               <span className="text-2xl font-display font-bold text-white">
                 ₹{data.reduce((a, b) => a + b.value, 0).toLocaleString()}
               </span>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
