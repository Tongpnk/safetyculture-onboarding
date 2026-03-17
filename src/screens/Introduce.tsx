import { useNavigate } from 'react-router-dom'
import { Monitor, Smartphone, Plus, Mic, Paperclip } from 'lucide-react'

const QUESTIONS = [
  'Is the equipment operating without unusual noise or vibration?',
  'Are all safety guards and protective covers properly installed?',
  'Are emergency stop buttons accessible and functioning correctly?',
  'Are there any visible signs of wear, leaks, or damage?',
]

function QuestionCard({ text }: { text: string }) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 mb-3">
      <p className="text-[14px] text-gray-800 font-medium mb-3">{text}</p>
      <div className="flex gap-2 mb-3">
        {['Yes', 'No', 'N/A'].map(opt => (
          <button key={opt} className="flex-1 py-2 text-[13px] font-medium border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">{opt}</button>
        ))}
      </div>
      <div className="flex items-center gap-4 text-[12px] text-gray-500">
        <button className="flex items-center gap-1 hover:text-gray-700"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>Add note</button>
        <button className="flex items-center gap-1 hover:text-gray-700"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>Attach media</button>
        <button className="flex items-center gap-1 hover:text-gray-700"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>Create action</button>
      </div>
    </div>
  )
}

export default function Introduce() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/plan')} className="text-[13px] text-gray-600 hover:text-gray-900 font-medium">Cancel</button>
          <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-gray-700 bg-gray-50 border-r border-gray-200"><Monitor size={13} />Desktop preview</button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-gray-500 hover:text-gray-700"><Smartphone size={13} />Mobile preview</button>
          </div>
        </div>
        <button onClick={() => navigate('/home')} className="text-[13px] text-white font-semibold px-5 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#5B4CF5' }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#4A3DE0')} onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#5B4CF5')}>Save</button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8" style={{ backgroundColor: '#F3F4F8' }}>
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <h1 className="text-[26px] font-bold text-gray-900 mb-2">Equipment performance</h1>
              <p className="text-[13px] text-gray-500 leading-relaxed max-w-2xl">Use this checklist to verify that equipment is operating correctly and safely. Inspect the condition of machinery, check for abnormal noise or vibration, confirm safety guards and emergency stops are functioning, and ensure maintenance requirements are up to date. Record any issues that may impact performance or reliability.</p>
            </div>
            {QUESTIONS.map((q, i) => <QuestionCard key={i} text={q} />)}
            <button className="flex items-center gap-2 text-[13px] text-gray-500 hover:text-gray-700 mt-2"><Plus size={15} />Add question</button>
          </div>
        </div>
        <div className="w-80 border-l border-gray-200 flex flex-col bg-white">
          <div className="px-5 pt-5 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="#5B4CF5" /><path d="M19 16L19.75 18.25L22 19L19.75 19.75L19 22L18.25 19.75L16 19L18.25 18.25L19 16Z" fill="#00C9F0" /></svg>
              <span className="text-[14px] font-bold text-gray-900">AI Assistant</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
            <p className="text-[13px] text-gray-700 leading-relaxed">I've created your first <strong>Equipment Performance Checklist</strong> based on common inspection practices used in manufacturing environments similar to yours.</p>
            <p className="text-[13px] text-gray-600 leading-relaxed">The checklist includes checks recommended by industry safety and maintenance standards such as <strong>ISO 45001 (workplace safety) and ISO 9001 (quality management)</strong>, along with common operational checks used by leading manufacturing companies to monitor equipment reliability.</p>
            <p className="text-[13px] text-gray-600 leading-relaxed">These inspections typically focus on:</p>
            <ul className="text-[13px] text-gray-600 space-y-1">
              <li>• Equipment operating conditions (noise, vibration, performance)</li>
              <li>• Safety systems such as guards and emergency stops</li>
              <li>• Signs of wear, leaks, or damage</li>
              <li>• Preventive maintenance readiness</li>
            </ul>
            <p className="text-[13px] text-gray-600 leading-relaxed">The goal is to help teams identify potential equipment issues early and maintain safe, reliable operations.</p>
            <p className="text-[13px] text-gray-600 leading-relaxed">You can review and edit any of the questions to match how your facility operates.</p>
            <div>
              <p className="text-[13px] font-bold text-gray-900 mb-2">What's next</p>
              <p className="text-[13px] text-gray-600 mb-3">Share this checklist with your team so they can begin running inspections.</p>
              <button className="inline-flex items-center border border-gray-300 rounded-lg px-3 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-gray-50 mb-4">Invite teammates</button>
              <p className="text-[13px] text-gray-600 mb-3">Or explore your workspace to see how inspections, actions, and analytics work together.</p>
              <button onClick={() => navigate('/home')} className="inline-flex items-center border border-gray-300 rounded-lg px-3 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-gray-50">Take a tour</button>
            </div>
          </div>
          <div className="p-4 border-t border-gray-100">
            <div className="border border-gray-200 rounded-xl bg-gray-50 p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-[9px] text-gray-500">@</span>
                <span className="text-[11px] text-indigo-500 font-medium">Onboarding</span>
              </div>
              <input className="w-full bg-transparent text-[12px] text-gray-400 placeholder-gray-400 outline-none" placeholder="Ask a question in any supported language" />
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
    </div>
  )
}
