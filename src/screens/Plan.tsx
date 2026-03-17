import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Paperclip, Mic, ChevronDown } from 'lucide-react'

// ─── Background (same as SignUp / Start) ────────────────────────────────────

const BG_ELEMENTS = [
  { label: 'Equipment performance', isTitle: true,
    style: { left: '22.9%', top: '11.2%', width: '54.2%' }, delay: '0s', dur: '30s' },
  { q: 'Is the equipment operating without unusual noise or vibration?', isTitle: false,
    style: { left: '-4.4%', top: '34.7%', width: '54.2%' }, delay: '-8s', dur: '26s' },
  { q: 'Are all safety guards and protective covers properly installed?', isTitle: false,
    style: { left: '61%', top: '28.4%', width: '54.2%' }, delay: '-14s', dur: '34s' },
  { q: 'Are there any visible signs of wear, leaks, or damage on equipment?', isTitle: false,
    style: { left: '-9.6%', top: '67.6%', width: '54.2%' }, delay: '-5s', dur: '28s' },
]

function BgQuestion({ q, style, delay, dur }: { q: string; style: React.CSSProperties; delay: string; dur: string }) {
  return (
    <div className="absolute bg-element" style={{ ...style, animationDelay: delay, animationDuration: dur }}>
      <div className="bg-white rounded-xl px-5 py-4" style={{ filter: 'blur(8px)', opacity: 0.55 }}>
        <div className="h-4 w-3/4 bg-gray-400 rounded mb-1" />
        <p className="text-[15px] text-gray-700 font-medium mb-4 leading-snug">{q}</p>
        <div className="flex gap-3">
          {['Yes', 'No', 'N/A'].map(opt => (
            <div key={opt} className="flex-1 py-2 text-[13px] font-medium text-center rounded-lg border border-gray-300 text-gray-600 bg-white">{opt}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

function BgTitle({ label, style, delay, dur }: { label: string; style: React.CSSProperties; delay: string; dur: string }) {
  return (
    <div className="absolute bg-element" style={{ ...style, animationDelay: delay, animationDuration: dur }}>
      <div style={{ filter: 'blur(8px)', opacity: 0.45 }}>
        <p className="text-[26px] font-bold text-white mb-2">{label}</p>
        <div className="h-3 w-full bg-white/40 rounded mb-1.5" />
        <div className="h-3 w-5/6 bg-white/30 rounded" />
      </div>
    </div>
  )
}

// ─── Conversation script ─────────────────────────────────────────────────────

type ConvItem =
  | { type: 'intro'; text: string; delay: number }
  | { type: 'qa'; q: string; answer: string; delay: number }
  | { type: 'qtags'; q: string; tags: string[]; selected: number[]; delay: number }

const SCRIPT: ConvItem[] = [
  { type: 'intro', text: 'Helping you build out your Equipment Performance workflow.', delay: 300 },
  { type: 'qa', q: 'First, what company do you work for?', answer: 'Megabites', delay: 900 },
  { type: 'qa', q: 'What is your job title?', answer: 'Site manager', delay: 1600 },
  { type: 'qa', q: 'What industry are you in?', answer: 'Manufacturing', delay: 2300 },
  {
    type: 'qtags',
    q: 'Which manufacturing standards are the most important to you?',
    tags: ['Occupational Safety and Health Administration (OSHA)', 'Safe Work', 'ISO 45001'],
    selected: [0],
    delay: 3100,
  },
  {
    type: 'qtags',
    q: 'What equipment are you looking to do maintenance checks on?',
    tags: ['CNC Router', 'Water Jet Cutter', 'SLA 3D Printer', 'Hydraulic Press'],
    selected: [0, 1, 2, 3],
    delay: 4000,
  },
]

const THINKING_STEPS = [
  { icon: 'dot', text: 'Building out your checklist based on ISO 9001', delay: 5000 },
  { icon: 'wrench', text: 'Adding your assets', delay: 5700 },
  { icon: 'dot-pulse', text: 'Thinking...', delay: 6400 },
]

const REVIEW_DELAY = 8200

const REVIEW_STEPS = [
  {
    title: 'Adding your assets',
    desc: 'Monitor equipment performance and catch issues early',
  },
  {
    title: 'Standardise routine inspections across your team',
    desc: 'Ensure every check is completed the same way with guided steps, photos, and clear pass/fail criteria.',
  },
  {
    title: 'Log issues and trigger follow-up actions',
    desc: 'Capture faults during inspections and automatically assign fixes to keep things running smoothly.',
  },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

function Tag({ label, selected }: { label: string; selected: boolean }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium border mr-2 mb-1 whitespace-nowrap"
      style={selected
        ? { borderColor: '#6559FF', color: '#4740D4', backgroundColor: 'white' }
        : { borderColor: '#BFC6D4', color: '#545F70', backgroundColor: 'white' }}
    >
      {label}
    </span>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function Plan() {
  const navigate = useNavigate()
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [visibleThinking, setVisibleThinking] = useState<number[]>([])
  const [showReview, setShowReview] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    SCRIPT.forEach((item, i) => {
      timers.push(setTimeout(() => {
        setVisibleItems(prev => [...prev, i])
      }, item.delay))
    })

    THINKING_STEPS.forEach((step, i) => {
      timers.push(setTimeout(() => {
        setVisibleThinking(prev => [...prev, i])
      }, step.delay))
    })

    timers.push(setTimeout(() => setShowReview(true), REVIEW_DELAY))

    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [visibleItems, visibleThinking, showReview])

  const showThinkingBlock = visibleThinking.length > 0

  return (
    <div className="relative min-h-screen flex justify-center overflow-hidden" style={{ backgroundColor: '#9CA3AF' }}>

      {/* Drifting background */}
      <div className="absolute inset-0 pointer-events-none">
        {BG_ELEMENTS.map((el, i) =>
          el.isTitle
            ? <BgTitle key={i} label={el.label!} style={el.style} delay={el.delay} dur={el.dur} />
            : <BgQuestion key={i} q={el.q!} style={el.style} delay={el.delay} dur={el.dur} />
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-500/40" />

      {/* Skip for now */}
      <button
        onClick={() => navigate('/introduce')}
        className="absolute top-6 left-6 z-20 bg-gray-800 text-white text-[13px] font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
      >
        Skip for now
      </button>

      {/* Modal panel */}
      <div
        className="relative z-10 bg-white rounded-lg shadow-2xl flex flex-col mx-4 mt-6 mb-6"
        style={{ width: '100%', maxWidth: '529px', maxHeight: 'calc(100vh - 48px)' }}
      >
        {/* Scrollable conversation */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">

          {SCRIPT.map((item, i) => {
            if (!visibleItems.includes(i)) return null
            return (
              <div key={i} className="animate-fadeIn">
                {item.type === 'intro' && (
                  <p className="text-[16px] text-[#545F70] leading-6">{item.text}</p>
                )}

                {item.type === 'qa' && (
                  <div className="flex flex-col gap-2 items-end w-full">
                    <p className="text-[16px] text-[#545F70] leading-6 w-full">{item.q}</p>
                    <div
                      className="px-3 py-2 rounded-lg text-[16px] text-white leading-6"
                      style={{ backgroundColor: '#6559FF' }}
                    >
                      {item.answer}
                    </div>
                  </div>
                )}

                {item.type === 'qtags' && (
                  <div className="flex flex-col gap-2 w-full">
                    <p className="text-[16px] text-[#545F70] leading-6">{item.q}</p>
                    <div className="flex flex-wrap overflow-hidden relative" style={{ maxHeight: '38px' }}>
                      {item.tags.map((tag, j) => (
                        <Tag key={j} label={tag} selected={item.selected.includes(j)} />
                      ))}
                      <div className="absolute right-0 top-0 h-full w-10 pointer-events-none"
                        style={{ background: 'linear-gradient(to right, transparent, white)' }} />
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {/* Thinking block */}
          {showThinkingBlock && (
            <div className="animate-fadeIn border rounded-xl overflow-hidden" style={{ borderColor: '#DBE0EB' }}>
              {THINKING_STEPS.map((step, i) => {
                if (!visibleThinking.includes(i)) return null
                const isDone = i < 2
                return (
                  <div key={i} className="relative">
                    {i < 2 && visibleThinking.includes(i + 1) && (
                      <div className="absolute left-[13px] top-[26px] w-px bg-gray-200" style={{ height: '16px' }} />
                    )}
                    <div className="flex items-center gap-2 px-2 py-2">
                      {step.icon === 'wrench' ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" className="flex-shrink-0">
                          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                        </svg>
                      ) : step.icon === 'dot-pulse' ? (
                        <div className="w-3 h-3 rounded-full border-2 border-indigo-400 animate-pulse flex-shrink-0" />
                      ) : (
                        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${isDone ? 'bg-gray-300' : 'bg-indigo-400 animate-pulse'}`} />
                      )}
                      {step.icon === 'dot-pulse' ? (
                        <span className="text-[12px] thinking-shimmer">{step.text}</span>
                      ) : (
                        <span className="flex-1 text-[12px] text-[#3F495A]">{step.text}</span>
                      )}
                      {isDone && (
                        <ChevronDown size={12} className="text-gray-300 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Review block */}
          {showReview && (
            <div className="animate-fadeIn border rounded-xl p-4 flex flex-col gap-4" style={{ borderColor: '#BFC6D4' }}>
              <p className="text-[14px] font-semibold text-[#1F2533]">Equipment performance</p>

              <div className="flex flex-col gap-4">
                {REVIEW_STEPS.map((step, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <div className="flex flex-col items-center pt-0.5 w-2 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-gray-300 flex-shrink-0" />
                      {i < REVIEW_STEPS.length - 1 && (
                        <div className="w-px flex-1 bg-gray-200 mt-1" style={{ minHeight: '28px' }} />
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <p className="text-[12px] font-semibold text-[#1F2533] leading-4">{step.title}</p>
                      <p className="text-[12px] text-[#3F495A] leading-4 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/introduce')}
                className="inline-flex items-center gap-1.5 text-[13px] text-white font-semibold px-4 py-2 rounded-lg transition-colors self-start"
                style={{ backgroundColor: '#675DF4' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#4740D4')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#675DF4')}
              >
                <svg width="13" height="13" viewBox="0 0 33 33" fill="none">
                  <path d="M16.5 3L18.6 12.3L28 14.5L18.6 16.7L16.5 26L14.4 16.7L5 14.5L14.4 12.3L16.5 3Z" fill="white"/>
                  <path d="M26 21L27.1 24.4L30.5 25.5L27.1 26.6L26 30L24.9 26.6L21.5 25.5L24.9 24.4L26 21Z" fill="white" opacity="0.7"/>
                </svg>
                Build it
              </button>
            </div>
          )}
        </div>

        {/* AI chat input — always visible at bottom */}
        <div className="border-t p-3 flex-shrink-0" style={{ borderColor: '#DBE0EB' }}>
          <div className="border rounded-xl overflow-hidden bg-white" style={{ borderColor: '#DBE0EB' }}>
            <div className="flex items-center gap-2 px-2 pt-2 pb-1">
              <button className="inline-flex items-center gap-1 border rounded-lg px-2 py-1 text-[12px] font-medium text-[#4740D4] hover:bg-indigo-50 transition-colors" style={{ borderColor: '#DBE0EB' }}>
                <span className="text-[11px]">@</span>
                Setup
              </button>
            </div>
            <div className="px-3 py-1">
              <textarea
                rows={2}
                className="w-full resize-none bg-transparent text-[14px] text-gray-400 placeholder-gray-400 outline-none"
                placeholder="Ask a question in any supported language"
              />
            </div>
            <div className="flex items-center justify-between px-2 pb-2">
              <button className="text-gray-400 hover:text-gray-600 p-1">
                <Paperclip size={16} />
              </button>
              <div className="flex items-center gap-1">
                <button className="text-gray-400 hover:text-gray-600 p-1">
                  <Mic size={16} />
                </button>
                <button
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white transition-colors"
                  style={{ backgroundColor: '#675DF4' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#4740D4')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#675DF4')}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bgDrift {
          0%   { transform: translate(0px, 0px); }
          33%  { transform: translate(6px, -14px); }
          66%  { transform: translate(-5px, -8px); }
          100% { transform: translate(4px, -18px); }
        }
        .bg-element {
          animation-name: bgDrift;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
          will-change: transform;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.35s ease-out forwards;
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .thinking-shimmer {
          background: linear-gradient(90deg, #BFC6D4 0%, #828EA0 40%, #BFC6D4 80%);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 2s linear infinite;
        }
      `}</style>
    </div>
  )
}
