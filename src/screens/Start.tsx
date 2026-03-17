import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send } from 'lucide-react'

function BlurredBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ filter: 'blur(4px)', transform: 'scale(1.02)' }}>
      <div className="flex h-full bg-gray-100">
        <div className="w-44 bg-white border-r border-gray-200 p-3 flex flex-col gap-1">
          <div className="text-[11px] font-bold text-gray-900 mb-3 px-2 flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-indigo-600 text-white text-[9px] flex items-center justify-center font-bold">SC</div>
            SafetyCulture
          </div>
          {['Home', 'Forms', 'Tasks', 'Projects', 'Training', 'Documents', 'Automations'].map((item) => (
            <div key={item} className="text-[11px] px-2 py-1.5 rounded text-gray-600 flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gray-300"></div>
              {item}
            </div>
          ))}
        </div>
        <div className="flex-1 p-8">
          <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 w-16 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100">
                <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                <div className="flex-1 h-3 bg-gray-200 rounded"></div>
                <div className="w-16 h-3 bg-gray-100 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Start() {
  const navigate = useNavigate()
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) navigate('/plan')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) navigate('/plan')
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <BlurredBackground />
      <div className="absolute inset-0 bg-gray-500/40 backdrop-blur-[2px]"></div>
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-shrink-0 mt-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="#5B4CF5" />
              <path d="M19 16L19.75 18.25L22 19L19.75 19.75L19 22L18.25 19.75L16 19L18.25 18.25L19 16Z" fill="#00C9F0" />
              <path d="M5 2L5.5 3.5L7 4L5.5 4.5L5 6L4.5 4.5L3 4L4.5 3.5L5 2Z" fill="#FFCB00" />
            </svg>
          </div>
          <div>
            <h2 className="text-[20px] font-bold text-gray-900 leading-tight">What are you here to do?</h2>
          </div>
        </div>
        <p className="text-[14px] text-gray-500 mb-6 leading-relaxed">With SafetyCulture you can create new workflows, get insights from data. To get started, please add your business and role</p>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <input autoFocus type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#5B4CF5' } as React.CSSProperties} />
            <button type="submit" className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-colors flex-shrink-0" style={{ backgroundColor: '#5B4CF5' }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#4A3DE0')} onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#5B4CF5')}>
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
