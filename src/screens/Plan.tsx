import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Paperclip, Mic, Square } from 'lucide-react'

const QUESTIONS = [
  { q: 'What company do you work for?', answer: 'Megabites', delay: 600 },
  { q: 'What is your job title?', answer: 'Site manager', delay: 1200 },
  { q: 'What industry are you in?', answer: 'Manufacturing', delay: 1800 },
  { q: 'How many locations does your company operate?', answer: 'Greenville, Summit, Lakewood, Riverside, Southfield', delay: 2400 },
  { q: 'What are you mainly looking to use SafetyCulture for?', tags: ['Equipment performance', 'Product inspection', 'Quality Control'], delay: 3000 },
  { q: 'Which manufacturing standards are the most important to you?', tags: ['Occupational Safety and Health Administration (OSHA)', 'Safe Work'], delay: 3600 },
  { q: 'What equipment are you looking to do maintenance checks on?', tags: ['CNC Router', 'Water Jet Cutter', 'SLA 3D Printer', 'Hydraulic Press'], delay: 4200 },
]

const AI_STEPS = [
  { text: 'Building out your template based on ISO 9001', done: true, delay: 4800 },
  { text: 'Adding your assets', done: true, delay: 5400 },
  { text: 'Thinking...', done: false, delay: 6000 },
]

interface QItem { q: string; answer?: string; tags?: string[] }

function Tag({ label, selected = false }: { label: string; selected?: boolean }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium border mr-2 mb-1 ${selected ? 'border-indigo-500 text-indigo-700 bg-white' : 'border-gray-200 text-gray-600 bg-white'}`}>{label}</span>
  )
}

function BlurredBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ filter: 'blur(3px)', transform: 'scale(1.02)' }}>
      <div className="flex h-full bg-gray-100">
        <div className="w-44 bg-white border-r border-gray-200 p-3">
          <div className="text-[11px] font-bold text-gray-900 mb-3 px-2">SafetyCulture</div>
          {['Home', 'Forms', 'Tasks', 'Projects', 'Training', 'Documents'].map((item) => (
            <div key={item} className="text-[11px] px-2 py-1.5 rounded text-gray-600 flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gray-300"></div>
              {item}
            </div>
          ))}
        </div>
        <div className="flex-1 p-8">
          <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[1, 2, 3].map(i => (<div key={i} className="bg-white rounded-xl p-4 shadow-sm"><div className="h-3 w-20 bg-gray-200 rounded mb-2"></div><div className="h-6 w-12 bg-gray-300 rounded"></div></div>))}
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="h-3 w-28 bg-gray-200 rounded mb-3"></div>
            {[1, 2, 3].map(i => (<div key={i} className="flex gap-3 py-2 border-b border-gray-100"><div className="w-5 h-5 rounded-full bg-gray-200"></div><div className="flex-1 h-3 bg-gray-200 rounded"></div></div>))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Plan() {
  const navigate = useNavigate()
  const [visibleItems, setVisibleItems] = useState<QItem[]>([])
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const [showInput, setShowInput] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    QUESTIONS.forEach((item, _i) => {
      timers.push(setTimeout(() => {
        setVisibleItems(prev => [...prev, item])
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }, item.delay))
    })
    AI_STEPS.forEach((step, i) => {
      timers.push(setTimeout(() => setVisibleSteps(prev => [...prev, i]), step.delay))
    })
    timers.push(setTimeout(() => setShowInput(true), 6200))
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [visibleItems, visibleSteps, showInput])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <BlurredBackground />
      <div className="absolute inset-0 bg-gray-500/40"></div>
      <button onClick={() => navigate('/introduce')} className="absolute top-6 left-6 z-20 bg-gray-800 text-white text-[13px] font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">Skip for now</button>
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full mx-4 flex flex-col overflow-hidden" style={{ maxWidth: '530px', maxHeight: '90vh' }}>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-hide">
          {visibleItems.map((item, i) => (
            <div key={i} className="animate-fadeIn">
              <div className="text-[14px] text-gray-900 font-medium mb-2">{item.q}</div>
              {item.answer && (
                <div className="flex justify-end">
                  <span className="inline-block px-4 py-2 rounded-xl text-[13px] font-medium text-white" style={{ backgroundColor: '#5B4CF5' }}>{item.answer}</span>
                </div>
              )}
              {item.tags && (
                <div className="flex flex-wrap mt-1">
                  {item.tags.map((tag, j) => <Tag key={j} label={tag} selected={j === 0} />)}
                </div>
              )}
            </div>
          ))}
          {visibleSteps.length > 0 && (
            <div className="animate-fadeIn">
              <div className="text-[14px] text-gray-900 font-medium mb-3">This is the AI recommendation for SafetyCulture</div>
              <div className="border border-gray-100 rounded-xl p-4 space-y-2">
                {AI_STEPS.map((step, idx) => visibleSteps.includes(idx) && (
                  <div key={idx} className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] ${step.done ? 'text-gray-400' : 'text-indigo-500 animate-pulse'}`}>●</span>
                      <span className={`text-[13px] ${step.done ? 'text-gray-500' : 'text-gray-700 font-medium'}`}>{step.text}</span>
                    </div>
                    {step.done && <span className="text-gray-300 text-[12px]">›</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {showInput && (
          <div className="p-4 border-t border-gray-100">
            <div className="rounded-xl border-2 p-3" style={{ borderColor: '#5B4CF5' }}>
              <div className="text-[12px] text-gray-400 mb-2">@ Add context</div>
              <div className="text-[13px] text-gray-400 italic mb-3">AI Assistant is thinking...</div>
              <div className="flex items-center justify-between">
                <button className="text-gray-400 hover:text-gray-600"><Paperclip size={16} /></button>
                <div className="flex items-center gap-2">
                  <button className="text-gray-400 hover:text-gray-600"><Mic size={16} /></button>
                  <button onClick={() => navigate('/introduce')} className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: '#5B4CF5' }}>
                    <Square size={12} fill="white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>
    </div>
  )
}
