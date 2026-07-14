import { Award, Star, Zap, TrendingUp, ShieldCheck } from 'lucide-react';

export default function Achievements() {
  const achievements = [
    {
      id: 1,
      title: 'First Step Taken',
      description: 'You completed your profile and added your first debt account.',
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      unlocked: true,
      progress: 100
    },
    {
      id: 2,
      title: 'Settlement Explorer',
      description: 'You ran your first settlement prediction simulation.',
      icon: <Zap className="w-6 h-6 text-emerald-500" />,
      unlocked: true,
      progress: 100
    },
    {
      id: 3,
      title: 'Consistent Payer',
      description: 'Pay 3 EMIs consecutively on time.',
      icon: <TrendingUp className="w-6 h-6 text-teal-500" />,
      unlocked: false,
      progress: 33
    },
    {
      id: 4,
      title: 'Debt Free Champion',
      description: 'Clear your first major loan account completely.',
      icon: <Award className="w-6 h-6 text-emerald-500" />,
      unlocked: false,
      progress: 0
    },
    {
      id: 5,
      title: 'Risk Mitigator',
      description: 'Improve your financial health score by 10 points.',
      icon: <ShieldCheck className="w-6 h-6 text-indigo-500" />,
      unlocked: false,
      progress: 50
    }
  ];

  return (
    <div className="glass-card p-6 rounded-2xl border border-zinc-800">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-display font-bold text-white">Achievements</h2>
          <p className="text-sm text-zinc-400">Track your financial recovery milestones</p>
        </div>
        <div className="bg-[#0F172A] px-4 py-2 rounded-xl border border-zinc-700 flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-500" />
          <span className="font-bold text-white text-lg">2</span>
          <span className="text-sm text-zinc-400">Unlocked</span>
        </div>
      </div>

      <div className="space-y-4">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id}
            className={`p-4 rounded-xl border transition-all ${
              achievement.unlocked 
                ? 'bg-[#0F172A]/80 border-zinc-700 shadow-md shadow-teal-500/5' 
                : 'bg-zinc-950/50 border-zinc-800/50 opacity-60 grayscale hover:grayscale-0'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                achievement.unlocked ? 'bg-zinc-950 border border-zinc-700' : 'bg-zinc-900'
              }`}>
                {achievement.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-white">{achievement.title}</h3>
                  {achievement.unlocked && (
                    <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/30">
                      Unlocked
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-400 mb-3">{achievement.description}</p>
                
                {!achievement.unlocked && (
                  <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-teal-500 h-1.5 rounded-full transition-all duration-1000" 
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
