import { useState } from 'react'
import {
  Home, FileText, CheckSquare, FolderOpen, BookOpen, File, Zap,
  MapPin, Package, Users, MoreHorizontal, Search, HelpCircle, Bell,
  X, ChevronDown, Mic, Paperclip, ThumbsUp, ThumbsDown, Copy, RefreshCw
} from 'lucide-react'

const NAV_ITEMS = [
  { icon: Home, label: 'Home', active: true },
  { icon: FileText, label: 'Forms' },
  { icon: CheckSquare, label: 'Tasks' },
  { icon: FolderOpen, label: 'Projects' },
  { icon: BookOpen, label: 'Training' },
  { icon: File, label: 'Documents' },
  { icon: Zap, label: 'Automations' },
]

const NAV_SECONDARY = [
  { icon: MapPin, label: 'Sites' },
  { icon: Package, label: 'Assets' },
  { icon: Users, label: 'People' },
  { icon: MoreHorizontal, label: 'More' },
]

const TASKS = [
  { title: 'Conduct first inspection', ref: 'WB-21231', date: 'Apr 2', priority: 'Medium', status: 'In Progress', statusColor: 'text-indigo-600' },
  { title: 'View workspace demo', ref: 'WB-21231', date: 'Jan 21', priority: 'High', status: 'To Do', statusColor: 'text-amber-500' },
  { title: 'Review set up assets', ref: 'WB-21231', date: 'Apr 2', priority: 'Medium', status: 'In Progress', statusColor: 'text-indigo-600' },
]

export default function HomeEmpty() {
  const [aiInput, setAiInput] = useState('')

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <div className="w-44 bg-white border-r border-gray-100 flex flex-col py-3">
        <div className="px-3 mb-4">
          <button className="flex items-center gap-2 w-full px-2 py-1.5 hover:bg-gray-50 rounded-lg">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[11px] font-bold" style={{ backgroundColor: '#5B4CF5' }}>MB</div>
            <span className="text-[13px] font-semibold text-gray-900 flex-1 text-left">MegaBites</span>
            <ChevronDown size={13} className="text-gray-400" />
          </button>
        </div>
        <nav className="flex-1 px-2 space-y-0.5">
          {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
            <button key={label} className={`flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-[13px] font-medium transition-colors ${active ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
              <Icon size={15} />{label}
            </button>
          ))}
        </nav>
        <div className="mx-3 my-2 border-t border-gray-100"></div>
        <nav className="px-2 space-y-0.5 mb-4">
          {NAV_SECONDARY.map(({ icon: Icon, label }) => (
            <button key={label} className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <Icon size={15} />{label}
            </button>
          ))}
        </nav>
        <div className="px-3 mt-auto">
          <button className="flex items-center gap-2 w-full px-2 py-2 hover:bg-gray-50 rounded-lg">
            <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-[11px] font-semibold text-gray-600">M</div>
            <div className="text-left flex-1 min-w-0">
              <div className="text-[12px] font-semibold text-gray-900 truncate">Mike</div>
              <div className="text-[11px] text-gray-500 truncate">MegaBites Ltd</div>
            </div>
            <ChevronDown size={12} className="text-gray-400 flex-shrink-0" />
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100">
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200" placeholder="Search" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-gray-500 hover:text-gray-700"><HelpCircle size={18} /></button>
            <button className="relative text-gray-500 hover:text-gray-700"><Bell size={18} /><span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500"></span></button>
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-[12px] font-bold">M</div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="relative bg-indigo-50 rounded-2xl p-6 mb-6 overflow-hidden">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"><X size={16} /></button>
            <div className="flex items-start justify-between pr-8">
              <div>
                <h2 className="text-[18px] font-bold text-gray-900 mb-1 max-w-sm leading-snug">Preview how your inspections turn into actions and insights</h2>
                <button className="mt-3 text-[13px] text-white font-semibold px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#5B4CF5' }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#4A3DE0')} onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#5B4CF5')}>View demo</button>
              </div>
              <div className="flex items-end gap-2 opacity-60">
                <svg width="80" height="60" viewBox="0 0 80 60" fill="none"><polyline points="5,50 20,30 35,38 50,15 65,25 75,10" stroke="#5B4CF5" strokeWidth="2" fill="none"/><circle cx="50" cy="15" r="3" fill="#5B4CF5"/></svg>
                <div className="flex items-end gap-1">{[20, 35, 28, 45, 32, 50].map((h, i) => (<div key={i} className="w-5 rounded-t" style={{ height: h, backgroundColor: i % 2 === 0 ? '#5B4CF5' : '#C7D2FE' }}></div>))}</div>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" stroke="#E5E7EB" strokeWidth="4"/><path d="M20 2 A18 18 0 0 1 38 20" stroke="#5B4CF5" strokeWidth="4" strokeLinecap="round"/><path d="M20 2 A18 18 0 0 0 5 28" stroke="#FFCB00" strokeWidth="4" strokeLinecap="round"/></svg>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] font-bold text-gray-900">My teams agenda</h3>
              <button className="flex items-center gap-1 text-[13px] text-indigo-600 font-medium hover:text-indigo-700">All features <ChevronDown size={13} /></button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-[12px] font-medium text-gray-600 bg-white hover:bg-gray-50"><CheckSquare size={12} />All (3)</button>
            </div>
            <div className="space-y-2">
              {TASKS.map((task, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl px-4 py-3 hover:border-gray-200 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">TASK</span>
                      <span className="text-[13px] text-gray-500">{task.ref}</span>
                    </div>
                    <span className={`text-[12px] font-semibold ${task.statusColor}`}>{task.status}</span>
                  </div>
                  <div className="mt-1">
                    <p className="text-[14px] font-semibold text-gray-900">{task.title}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-[8px] text-gray-600 font-semibold">M</div>
                      <span className="flex items-center gap-1 text-[11px] text-gray-500"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>{task.date}</span>
                      <span className="flex items-center gap-1 text-[11px] text-gray-500"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22V12M12 12L5 7M12 12L19 7M12 2V12"/></svg>{task.priority}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-80 border-l border-gray-100 flex flex-col bg-white">
        <div className="px-5 pt-5 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="#5B4CF5" /><path d="M19 16L19.75 18.25L22 19L19.75 19.75L19 22L18.25 19.75L16 19L18.25 18.25L19 16Z" fill="#00C9F0" /></svg>
            <span className="text-[14px] font-bold text-gray-900">AI Assistant</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-[13px] text-gray-700 leading-relaxed">Your workspace is set up and your first inspection has been shared with your team.</p>
            <p className="text-[13px] text-gray-600 mt-3 leading-relaxed">Once your team completes their inspections, SafetyCulture will automatically surface issues, actions, and performance insights across your workspace.</p>
            <p className="text-[13px] text-gray-600 mt-3 font-medium">In the meantime, you can explore how everything is set up:</p>
            <p className="text-[13px] text-gray-600 mt-2 font-medium">Take a quick tour</p>
            <ul className="text-[13px] text-gray-600 mt-2 space-y-1.5"><li>• <strong>Forms</strong> – See how completed inspection forms are organised and reviewed</li></ul>
            <button className="mt-2 inline-flex items-center border border-gray-300 rounded-lg px-3 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-gray-50">View forms</button>
            <ul className="text-[13px] text-gray-600 mt-3 space-y-1.5"><li>• <strong>Tasks</strong> – Track issues raised during inspections and assign follow-ups</li></ul>
            <button className="mt-2 inline-flex items-center border border-gray-300 rounded-lg px-3 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-gray-50">View tasks</button>
            <ul className="text-[13px] text-gray-600 mt-3 space-y-1.5"><li>• <strong>Assets</strong> – Track and manage equipment, tools, and machinery to ensure they are inspected, maintained, and operating safely.</li></ul>
            <button className="mt-2 inline-flex items-center border border-gray-300 rounded-lg px-3 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-gray-50">View inspections</button>
            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-200">
              <button className="text-gray-400 hover:text-gray-600"><Copy size={13} /></button>
              <button className="text-gray-400 hover:text-gray-600"><ThumbsUp size={13} /></button>
              <button className="text-gray-400 hover:text-gray-600"><ThumbsDown size={13} /></button>
              <button className="text-gray-400 hover:text-gray-600"><RefreshCw size={13} /></button>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-gray-100">
          <div className="border border-gray-200 rounded-xl bg-gray-50 p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-[9px] text-gray-500">@</span>
              <span className="text-[11px] text-indigo-500 font-medium">Onboarding</span>
            </div>
            <input value={aiInput} onChange={e => setAiInput(e.target.value)} className="w-full bg-transparent text-[12px] text-gray-700 placeholder-gray-400 outline-none" placeholder="Ask a question in any supported language" />
            <div className="flex items-center justify-between mt-2">
              <button className="text-gray-400 hover:text-gray-600"><Paperclip size={14} /></button>
              <div className="flex items-center gap-2">
                <button className="text-gray-400 hover:text-gray-600"><Mic size={14} /></button>
                <button className="w-7 h-7 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: '#5B4CF5' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
