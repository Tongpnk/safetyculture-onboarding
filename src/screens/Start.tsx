import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Same blurred background as SignUp — Figma node positions (1440×900 frame)
const BG_ELEMENTS = [
  { label: 'Equipment performance', isTitle: true,
    style: { left: '22.9%', top: '11.2%', width: '54.2%' },
    delay: '0s', dur: '30s' },
  { q: 'Is the equipment operating without unusual noise or vibration?', isTitle: false,
    style: { left: '-4.4%', top: '34.7%', width: '54.2%' },
    delay: '-8s', dur: '26s' },
  { q: 'Are all safety guards and protective covers properly installed?', isTitle: false,
    style: { left: '61%', top: '28.4%', width: '54.2%' },
    delay: '-14s', dur: '34s' },
  { q: 'Are there any visible signs of wear, leaks, or damage on equipment?', isTitle: false,
    style: { left: '-9.6%', top: '67.6%', width: '54.2%' },
    delay: '-5s', dur: '28s' },
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
        <div className="flex gap-4 mt-3">
          {['Add note', 'Attach media', 'Create action'].map(a => (
            <div key={a} className="text-[11px] text-gray-400">{a}</div>
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

const SUGGESTIONS = ['Conduct site visits', 'Vehicle daily quick start check', '5S audits']

export default function Start() {
  const navigate = useNavigate()
  const [input, setInput] = useState('')

  const handleSubmit = () => {
    if (input.trim()) navigate('/plan')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#9CA3AF' }}>

      {/* Blurred drifting background cards */}
      <div className="absolute inset-0 pointer-events-none">
        {BG_ELEMENTS.map((el, i) =>
          el.isTitle
            ? <BgTitle key={i} label={el.label!} style={el.style} delay={el.delay} dur={el.dur} />
            : <BgQuestion key={i} q={el.q!} style={el.style} delay={el.delay} dur={el.dur} />
        )}
      </div>

      {/* Grey overlay */}
      <div className="absolute inset-0 bg-gray-500/40" />

      {/* Skip for now */}
      <button
        onClick={() => navigate('/plan')}
        className="absolute top-6 left-6 z-20 bg-gray-800 text-white text-[13px] font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
      >
        Skip for now
      </button>

      {/* Modal */}
      <div className="relative z-10 bg-white rounded-[17px] shadow-2xl w-full mx-4 px-8 py-8 flex flex-col items-center gap-10" style={{ maxWidth: '570px' }}>

        {/* Heading */}
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="flex items-center gap-2 pr-5 pt-2">
            {/* Sparkle icon */}
            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <path d="M16.5 3L18.6 12.3L28 14.5L18.6 16.7L16.5 26L14.4 16.7L5 14.5L14.4 12.3L16.5 3Z" fill="#675DF4"/>
              <path d="M26 21L27.1 24.4L30.5 25.5L27.1 26.6L26 30L24.9 26.6L21.5 25.5L24.9 24.4L26 21Z" fill="#00C9F0"/>
              <path d="M7 3L7.7 5.3L10 6L7.7 6.7L7 9L6.3 6.7L4 6L6.3 5.3L7 3Z" fill="#FFCB00"/>
            </svg>
            <h2 className="text-[23px] font-bold text-gray-900 tracking-tight">
              What process would you like to set up?
            </h2>
          </div>
          <p className="text-[14px] text-gray-500 text-center leading-relaxed">
            Describe what workflow you want to run or track, and we'll build it for you.
          </p>
        </div>

        {/* Search row */}
        <div className="flex gap-4 items-center w-full">
          <input
            autoFocus
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Eg. Weekly equipment performance check"
            className="flex-1 h-12 rounded-lg px-4 text-[16px] text-gray-900 placeholder-[#BFC6D4] outline-none border"
            style={{
              borderColor: '#0e9eec',
              boxShadow: '0px -4px 20px 0px rgba(101,89,255,0.1), -4px -4px 20px 0px rgba(101,89,255,0.1), -4px 4px 20px 0px rgba(14,138,216,0.1), 0px 4px 20px 0px rgba(14,138,216,0.1)',
            }}
          />
          <button
            onClick={handleSubmit}
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0 transition-colors"
            style={{ backgroundColor: '#675DF4' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#4740D4')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#675DF4')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z"/>
            </svg>
          </button>
        </div>

        {/* Suggestions */}
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.5 3L18.6 12.3L28 14.5L18.6 16.7L16.5 26L14.4 16.7L5 14.5L14.4 12.3L16.5 3Z" fill="#675DF4"/>
              <path d="M26 21L27.1 24.4L30.5 25.5L27.1 26.6L26 30L24.9 26.6L21.5 25.5L24.9 24.4L26 21Z" fill="#00C9F0"/>
            </svg>
            <span className="text-[12px] font-bold text-gray-900 tracking-[1px] uppercase">Suggestions</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                onClick={() => { setInput(s); navigate('/plan') }}
                className="border border-gray-300 rounded-full px-4 py-1.5 text-[13px] text-gray-700 hover:border-indigo-400 hover:text-indigo-700 transition-colors bg-white"
              >
                {s}
              </button>
            ))}
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
      `}</style>
    </div>
  )
}
