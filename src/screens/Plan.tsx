import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Paperclip, Mic, ChevronDown } from 'lucide-react'

// ─── Background ──────────────────────────────────────────────────────────────

// Checklist questions that appear one-by-one as the AI conversation progresses
const BG_QUESTIONS = [
  'Is the equipment operating without unusual noise or vibration?',
  'Are all safety guards and protective covers properly installed?',
  'Are there any visible signs of wear, leaks, or damage on equipment?',
  'Are emergency stop buttons accessible and functioning correctly?',
  'Is routine maintenance up to date for all equipment?',
]

// Each bg card appears after this ITEMS index enters shownItems
const BG_CARD_TRIGGERS = [2, 4, 6, 8, 10]

function BgCard({ q, top }: { q: string; top: string }) {
  return (
    <div
      className="absolute animate-fadeIn"
      style={{ left: '22.9%', top, width: '54.2%' }}
    >
      <div className="bg-white rounded-xl px-5 py-4" style={{ filter: 'blur(8px)', opacity: 0.5 }}>
        <div className="h-4 w-3/4 bg-gray-400 rounded mb-1" />
        <p className="text-[15px] text-gray-700 font-medium mb-4 leading-snug">{q}</p>
        <div className="flex gap-3">
          {['Yes', 'No', 'N/A'].map(opt => (
            <div key={opt} className="flex-1 py-2 text-[13px] text-center rounded-lg border border-gray-300 text-gray-600 bg-white">{opt}</div>
          ))}
        </div>
        <div className="flex gap-4 mt-3">
          {['Add note', 'Attach media', 'Create action'].map(a => (
            <div key={a} className="text-[11px] text-gray-400">{a}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Conversation types ───────────────────────────────────────────────────────

type ConvItem =
  | { type: 'intro'; text: string }
  | { type: 'ai'; text: string }
  | { type: 'user-text'; text: string }
  | { type: 'user-tags'; tags: string[]; selected: number[] }

const ITEMS: ConvItem[] = [
  { type: 'intro', text: 'Helping you build out your Equipment Performance workflow.' },
  { type: 'ai',   text: 'First, what company do you work for?' },
  { type: 'user-text', text: 'Megabites' },
  { type: 'ai',   text: 'What is your job title?' },
  { type: 'user-text', text: 'Site manager' },
  { type: 'ai',   text: 'What industry are you in?' },
  { type: 'user-text', text: 'Manufacturing' },
  { type: 'ai',   text: 'Which manufacturing standards are the most important to you?' },
  { type: 'user-tags', tags: ['ISO 9001', 'Safe Work Australia', 'Occupational Health and Safety'], selected: [0] },
  { type: 'ai',   text: 'What equipment are you looking to do maintenance checks on?' },
  { type: 'user-tags', tags: ['CNC Router', 'Water Jet Cutter', 'SLA 3D Printer', 'Hydraulic Press'], selected: [0, 1, 2, 3] },
]

const THINKING_STEPS = [
  { icon: 'dot',       text: 'Building out your checklist based on ISO 9001' },
  { icon: 'wrench',    text: 'Adding your assets' },
  { icon: 'dot-pulse', text: 'Thinking...' },
]

const REVIEW_STEPS = [
  { title: 'Adding your assets',
    desc: 'Monitor equipment performance and catch issues early' },
  { title: 'Standardise routine inspections across your team',
    desc: 'Ensure every check is completed the same way with guided steps, photos, and clear pass/fail criteria.' },
  { title: 'Log issues and trigger follow-up actions',
    desc: 'Capture faults during inspections and automatically assign fixes to keep things running smoothly.' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const wait = (ms: number) => new Promise<void>(res => setTimeout(res, ms))

function Tag({ label, selected }: { label: string; selected: boolean }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-lg text-[14px] font-medium border mr-2 flex-shrink-0 whitespace-nowrap"
      style={selected
        ? { borderColor: '#675DF4', color: '#675DF4', backgroundColor: 'white' }
        : { borderColor: '#BFC6D4', color: '#545F70', backgroundColor: 'white' }}
    >
      {label}
    </span>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Plan() {
  const navigate = useNavigate()
  const [shownItems, setShownItems]           = useState<number[]>([])
  const [shownThinking, setShownThinking]     = useState<number[]>([])
  const [showReview, setShowReview]           = useState(false)
  const [typingText, setTypingText]           = useState('')
  const [inputActive, setInputActive]         = useState(false)
  const scrollRef  = useRef<HTMLDivElement>(null)
  const cancelRef  = useRef(false)

  // Auto-scroll whenever content changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  })

  // Sequential animation chain
  useEffect(() => {
    cancelRef.current = false

    const show = (idx: number) => {
      if (cancelRef.current) return
      setShownItems(prev => prev.includes(idx) ? prev : [...prev, idx])
    }
    const showThink = (idx: number) => {
      if (cancelRef.current) return
      setShownThinking(prev => prev.includes(idx) ? prev : [...prev, idx])
    }
    const typeInto = async (text: string) => {
      if (cancelRef.current) return
      setInputActive(true)
      for (let i = 0; i <= text.length; i++) {
        if (cancelRef.current) return
        setTypingText(text.slice(0, i))
        await wait(55)
      }
      await wait(220)
    }
    const clearInput = () => {
      setTypingText('')
      setInputActive(false)
    }

    async function run() {
      await wait(400);  show(0)          // intro
      await wait(700);  show(1)          // Q1
      await wait(500);  await typeInto('Megabites')
      show(2); clearInput()              // A1

      await wait(600);  show(3)          // Q2
      await wait(500);  await typeInto('Site manager')
      show(4); clearInput()              // A2

      await wait(600);  show(5)          // Q3
      await wait(500);  await typeInto('Manufacturing')
      show(6); clearInput()              // A3

      await wait(600);  show(7)          // Q4 (standards)
      await wait(600);  show(8)          // standards tags

      await wait(700);  show(9)          // Q5 (equipment)
      await wait(600);  show(10)         // equipment tags

      await wait(800);  showThink(0)     // thinking: building checklist
      await wait(700);  showThink(1)     // thinking: adding assets
      await wait(700);  showThink(2)     // thinking: Thinking...
      await wait(1800)
      if (!cancelRef.current) setShowReview(true)
    }

    run()
    return () => { cancelRef.current = true }
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#9CA3AF' }}>

      {/* Stacking background cards — appear one by one as answers are given */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Title — always visible */}
        <div
          className="absolute animate-fadeIn"
          style={{ left: '22.9%', top: '5%', width: '54.2%', filter: 'blur(8px)', opacity: 0.4 }}
        >
          <p className="text-[26px] font-bold text-white mb-2">Equipment performance</p>
          <div className="h-3 w-full bg-white/40 rounded mb-1.5" />
          <div className="h-3 w-5/6 bg-white/30 rounded" />
        </div>

        {/* Question cards — each triggered after corresponding answer */}
        {BG_QUESTIONS.map((q, i) =>
          shownItems.includes(BG_CARD_TRIGGERS[i])
            ? <BgCard key={i} q={q} top={`${16 + i * 18}%`} />
            : null
        )}
      </div>

      {/* Grey overlay */}
      <div className="absolute inset-0 bg-gray-500/40" />

      {/* Skip for now */}
      <button
        onClick={() => navigate('/introduce')}
        className="absolute top-6 left-6 z-20 bg-gray-800 text-white text-[13px] font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
      >
        Skip for now
      </button>

      {/* Modal — vertically + horizontally centered, 80vh height, fixed chat at bottom */}
      <div
        className="relative z-10 bg-white rounded-lg shadow-2xl flex flex-col mx-4 w-full"
        style={{ maxWidth: '529px', height: 'min(720px, 80vh)' }}
      >
        {/* ── Scrollable conversation ─────────────────────────────────────── */}
        <div
          ref={scrollRef}
          className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 scrollbar-hide"
        >
          {ITEMS.map((item, i) => {
            if (!shownItems.includes(i)) return null
            return (
              <div key={i} className="animate-fadeIn">

                {item.type === 'intro' && (
                  <p className="text-[16px] text-[#545F70] leading-6">{item.text}</p>
                )}

                {item.type === 'ai' && (
                  <p className="text-[16px] text-[#545F70] leading-6">{item.text}</p>
                )}

                {item.type === 'user-text' && (
                  <div className="flex justify-end">
                    <div
                      className="px-3 py-2 rounded-lg text-[16px] text-white leading-6"
                      style={{ backgroundColor: '#6559FF' }}
                    >
                      {item.text}
                    </div>
                  </div>
                )}

                {item.type === 'user-tags' && (
                  <div className="flex flex-nowrap overflow-hidden relative">
                    {item.tags.map((tag, j) => (
                      <Tag key={j} label={tag} selected={item.selected.includes(j)} />
                    ))}
                    <div className="absolute right-0 top-0 h-full w-16 pointer-events-none flex-shrink-0"
                      style={{ background: 'linear-gradient(to right, transparent, white)' }} />
                  </div>
                )}
              </div>
            )
          })}

          {/* Thinking block — hidden once review is shown */}
          {shownThinking.length > 0 && !showReview && (
            <div className="animate-fadeIn border rounded-xl overflow-hidden" style={{ borderColor: '#DBE0EB' }}>
              {THINKING_STEPS.map((step, i) => {
                if (!shownThinking.includes(i)) return null
                const isDone = i < 2
                return (
                  <div key={i} className="relative">
                    {i < 2 && shownThinking.includes(i + 1) && (
                      <div className="absolute left-[13px] top-[26px] w-px bg-gray-200" style={{ height: '16px' }} />
                    )}
                    <div className="flex items-center gap-2 px-2 py-2">
                      {step.icon === 'wrench' ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" className="flex-shrink-0">
                          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                        </svg>
                      ) : step.icon === 'dot-pulse' ? (
                        <div className="w-3 h-3 rounded-full border-2 border-indigo-300 animate-pulse flex-shrink-0" />
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-gray-300 flex-shrink-0" />
                      )}
                      {step.icon === 'dot-pulse'
                        ? <span className="text-[12px] thinking-shimmer">{step.text}</span>
                        : <span className="flex-1 text-[12px] text-[#3F495A]">{step.text}</span>
                      }
                      {isDone && <ChevronDown size={12} className="text-gray-300 flex-shrink-0" />}
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
                        <div className="w-px bg-gray-200 mt-1" style={{ minHeight: '28px' }} />
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

        {/* ── AI chat input — fixed to bottom ─────────────────────────────── */}
        <div className="flex-shrink-0 p-3" style={{ borderTop: '1px solid #DBE0EB' }}>
          <div className="border rounded-xl overflow-hidden bg-white" style={{ borderColor: '#DBE0EB' }}>
            {/* Setup tag */}
            <div className="flex items-center gap-2 px-2 pt-2 pb-0">
              <button className="inline-flex items-center gap-1 border rounded-lg px-2 py-1 text-[12px] font-medium text-[#4740D4] hover:bg-indigo-50 transition-colors" style={{ borderColor: '#DBE0EB' }}>
                <span className="text-[11px]">@</span> Setup
              </button>
            </div>
            {/* Textarea — shows typing animation */}
            <div className="px-3 py-2">
              <textarea
                readOnly
                rows={2}
                value={typingText}
                className="w-full resize-none bg-transparent text-[14px] text-[#1F2533] placeholder-[#BFC6D4] outline-none"
                placeholder="Ask a question in any supported language"
                style={{ caretColor: inputActive ? '#675DF4' : 'transparent' }}
              />
            </div>
            {/* Actions */}
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
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
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
