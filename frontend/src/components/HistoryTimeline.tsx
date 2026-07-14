import { History, FileText } from 'lucide-react';

export default function HistoryTimeline() {
  const events = [
    { id: 1, type: 'Letter', title: 'Hardship Declaration Generated', date: '2023-10-15', entity: 'Chase Bank' },
    { id: 2, type: 'Settlement', title: 'Settlement Simulated', date: '2023-10-14', entity: 'Discover' },
    { id: 3, type: 'Advisor', title: 'Consultation Session', date: '2023-10-10', entity: 'System' },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-3xl font-display font-bold text-white">Activity History</h1>
      <p className="text-zinc-400">Log of archived negotiation letters and sessions.</p>
      
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-tranzinc-x-px md:before:mx-auto md:before:tranzinc-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-700 before:to-transparent">
          {events.map((event) => (
            <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-700 bg-zinc-900 text-zinc-400 shrink-0 md:order-1 md:group-odd:-tranzinc-x-1/2 md:group-even:tranzinc-x-1/2 shadow">
                {event.type === 'Letter' ? <FileText className="w-5 h-5 text-amber-500" /> : <History className="w-5 h-5 text-emerald-500" />}
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-zinc-950 p-4 rounded-xl border border-zinc-800 shadow">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <div className="font-bold text-white">{event.title}</div>
                  <time className="font-mono text-xs font-medium text-emerald-500">{event.date}</time>
                </div>
                <div className="text-sm text-zinc-400">{event.entity}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
