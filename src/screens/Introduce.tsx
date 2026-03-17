import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Paperclip, Mic, Monitor, Smartphone } from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const QUESTIONS = [
  'Is the equipment operating without unusual noise or vibration?',
  'Are all safety guards and protective covers properly installed?',
  'Are emergency stop buttons accessible and functioning correctly?',
  'Are there any visible signs of wear, leaks, or damage?',
  'Is routine maintenance up to date for all equipment?',
]

// ─── Sub-action icons ─────────────────────────────────────────────────────────

function NoteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="#4740D4" strokeWidth="1.5" strokeLinecap="round">
      <rect x="3" y="2" width="12" height="14" rx="2"/>
      <path d="M9 6v6M6 9h6"/>
    </svg>
  )
}
function MediaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="#4740D4" strokeWidth="1.5" strokeLinecap="round">
      <rect x="2" y="3" width="14" height="12" rx="2"/>
      <circle cx="6" cy="7.5" r="1.2"/>
      <path d="M2 13l3.5-3.5 2.5 2.5 2-2 4 4"/>
    </svg>
  )
}
function ActionIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="#4740D4" strokeWidth="1.5" strokeLinecap="round">
      <rect x="2" y="2" width="7" height="7" rx="1.5"/>
      <rect x="9" y="2" width="7" height="7" rx="1.5"/>
      <rect x="2" y="9" width="7" height="7" rx="1.5"/>
      <path d="M12 11v4M10 13h4"/>
    </svg>
  )
}
function SparkleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 33 33" fill="none">
      <path d="M16.5 3L18.6 12.3L28 14.5L18.6 16.7L16.5 26L14.4 16.7L5 14.5L14.4 12.3L16.5 3Z" fill="#675DF4"/>
      <path d="M26 21L27.1 24.4L30.5 25.5L27.1 26.6L26 30L24.9 26.6L21.5 25.5L24.9 24.4L26 21Z" fill="#00C9F0"/>
      <path d="M7 3L7.7 5.3L10 6L7.7 6.7L7 9L6.3 6.7L4 6L6.3 5.3L7 3Z" fill="#FFCB00"/>
    </svg>
  )
}
function InviteIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ flexShrink: 0 }}>
      <rect width="40" height="40" rx="8" fill="#F0F0F5"/>
      <circle cx="16" cy="15" r="4" stroke="#4740D4" strokeWidth="1.5" fill="none"/>
      <path d="M9 29c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#4740D4" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M26 18v7M22.5 21.5h7" stroke="#4740D4" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

// ─── Checklist components ─────────────────────────────────────────────────────

function ChecklistTitle() {
  return (
    <div className="rounded-2xl p-4 flex flex-col gap-3" style={{ backgroundColor: '#DDE1FF' }}>
      <p className="text-[24px] font-bold text-[#1F2533] leading-8 tracking-tight">Equipment performance</p>
      <div className="text-[12px] font-medium text-[#3F495A] leading-4">
        <p className="mb-1">Use this checklist to verify that equipment is operating correctly and safely.</p>
        <p>Inspect the condition of machinery, check for abnormal noise or vibration, confirm safety guards and emergency stops are functioning, and ensure maintenance requirements are up to date. Record any issues that may impact performance or reliability.</p>
      </div>
    </div>
  )
}

function QuestionCard({ q, mobile = false }: { q: string; mobile?: boolean }) {
  return (
    <div className="bg-white p-4 flex flex-col gap-4">
      <p className={`text-[#1F2533] leading-6 ${mobile ? 'text-[14px]' : 'text-[16px]'}`}>{q}</p>
      <div className="flex gap-2">
        {['Yes', 'No', 'N/A'].map(opt => (
          <button
            key={opt}
            className="flex-1 h-10 border rounded-lg text-[14px] font-medium text-[#1F2533] bg-white hover:bg-gray-50 transition-colors"
            style={{ borderColor: '#BFC6D4' }}
          >
            {opt}
          </button>
        ))}
      </div>
      {mobile ? (
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-1.5 text-[13px] font-medium text-[#4740D4]"><NoteIcon />Note</button>
          <button className="flex items-center gap-1.5 text-[13px] font-medium text-[#4740D4]"><MediaIcon />Media</button>
          <button className="flex items-center gap-1.5 text-[13px] font-medium text-[#4740D4]"><ActionIcon />Action</button>
        </div>
      ) : (
        <div className="flex items-center justify-end gap-6">
          <button className="flex items-center gap-1.5 text-[14px] font-medium text-[#4740D4]"><NoteIcon />Add note</button>
          <button className="flex items-center gap-1.5 text-[14px] font-medium text-[#4740D4]"><MediaIcon />Attach media</button>
          <button className="flex items-center gap-1.5 text-[14px] font-medium text-[#4740D4]"><ActionIcon />Create action</button>
        </div>
      )}
    </div>
  )
}

// ─── AI Side sheet ─────────────────────────────────────────────────────────────

function SideSheet() {
  return (
    <div
      className="flex-shrink-0 flex flex-col gap-2 p-3 rounded-xl"
      style={{
        width: '420px',
        backgroundColor: '#E9EDF6',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.12), 0px 2px 2px rgba(0,0,0,0.06)',
        height: 'calc(100vh - 56px)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 flex-shrink-0 px-1 pt-1">
        <SparkleIcon />
        <span className="text-[14px] font-semibold text-[#4740D4]">AI Assistant</span>
      </div>

      {/* Chat area */}
      <div className="flex-1 min-h-0 bg-white rounded-xl p-3 overflow-y-auto scrollbar-hide flex flex-col gap-4">
        {/* AI message */}
        <div className="text-[14px] text-[#1F2533] leading-5 flex flex-col gap-0 px-1">
          <p>
            I've created your first <strong>Equipment Performance Checklist</strong> based on leading organisations in your industry.
          </p>
          <p className="mt-3">
            The checklist includes checks recommended by industry safety and maintenance standards such as{' '}
            <strong>ISO 45001 (workplace safety) and ISO 9001 (quality management)</strong>
          </p>
          <p className="mt-3">In this inspection I've included:</p>
          <ul className="mt-2 flex flex-col gap-1.5">
            {[
              ['Equipment operating conditions', ' (noise, vibration, performance)'],
              ['Safety systems such as guards and emergency stops', ''],
              ['Signs of wear, leaks, or damage', ''],
              ['Preventive maintenance readiness', ''],
            ].map(([link, rest], i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-[#4740D4]">•</span>
                <span>
                  <span className="text-[#4740D4] underline underline-offset-2 decoration-solid">{link}</span>
                  <span className="text-[#1F2533]">{rest}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3">
            I can make the edits for you based on your feedback, or you can edit it yourself based on your company's needs.
          </p>
        </div>

        {/* What's next */}
        <div className="flex flex-col gap-3 px-1">
          <p className="text-[16px] font-semibold text-[#1F2533]">What's next</p>
          <div className="flex gap-3 items-start p-3 rounded-xl border" style={{ borderColor: '#DBE0EB' }}>
            <InviteIcon />
            <div className="min-w-0">
              <p className="text-[14px] font-semibold text-[#1F2533]">Invite teammates</p>
              <p className="text-[12px] text-[#3F495A] mt-1 leading-4">
                Share this checklist with your team so they can begin completing this inspections.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Orchestrator */}
      <div className="flex-shrink-0 border rounded-xl overflow-hidden bg-white" style={{ borderColor: '#DBE0EB' }}>
        <div className="flex items-center gap-2 px-2 pt-2 pb-0">
          <button className="inline-flex items-center gap-1 border rounded-lg px-2 py-1 text-[12px] font-medium text-[#4740D4] hover:bg-indigo-50 transition-colors" style={{ borderColor: '#DBE0EB' }}>
            <span className="text-[11px]">@</span> Setup
          </button>
        </div>
        <div className="px-3 py-2">
          <textarea
            rows={1}
            readOnly
            className="w-full resize-none bg-transparent text-[14px] placeholder-[#BFC6D4] outline-none"
            placeholder="Ask a question in any supported language"
          />
        </div>
        <div className="flex items-center justify-between px-2 pb-2">
          <button className="text-gray-400 hover:text-gray-600 p-1"><Paperclip size={16} /></button>
          <div className="flex items-center gap-1">
            <button className="text-gray-400 hover:text-gray-600 p-1"><Mic size={16} /></button>
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
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function Introduce() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<'desktop' | 'mobile'>('desktop')

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#E9EDF6' }}>

      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <div className="flex items-center h-14 px-5 bg-white border-b flex-shrink-0" style={{ borderBottomColor: '#DBE0EB' }}>
        {/* Cancel */}
        <button
          onClick={() => navigate('/plan')}
          className="border rounded-lg px-4 py-2 text-[14px] font-medium text-[#1F2533] hover:bg-gray-50 transition-colors"
          style={{ borderColor: '#BFC6D4' }}
        >
          Cancel
        </button>

        {/* Tabs */}
        <div className="flex items-center ml-4">
          {[
            { key: 'desktop', label: 'Desktop preview', Icon: Monitor },
            { key: 'mobile',  label: 'Mobile preview',  Icon: Smartphone },
          ].map(({ key, label, Icon }) => {
            const active = tab === key
            return (
              <button
                key={key}
                onClick={() => setTab(key as 'desktop' | 'mobile')}
                className="flex items-center gap-1.5 px-4 h-14 text-[14px] font-medium transition-colors"
                style={{
                  color: active ? '#4740D4' : '#545F70',
                  borderBottom: active ? '2px solid #4740D4' : '2px solid transparent',
                  marginBottom: '-1px',
                }}
              >
                <Icon size={14} />
                {label}
              </button>
            )
          })}
        </div>

        {/* Edit + Save */}
        <div className="ml-auto flex items-center gap-2">
          <button
            className="border rounded-lg px-4 py-2 text-[14px] font-medium text-[#1F2533] hover:bg-gray-50 transition-colors"
            style={{ borderColor: '#BFC6D4' }}
          >
            Edit
          </button>
          <button
            onClick={() => navigate('/home')}
            className="rounded-lg px-4 py-2 text-[14px] font-semibold text-white transition-colors"
            style={{ backgroundColor: '#675DF4' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#4740D4')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#675DF4')}
          >
            Save
          </button>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden gap-3 p-4">

        {/* Preview area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">

          {/* ── Desktop preview ── */}
          {tab === 'desktop' && (
            <div className="flex flex-col gap-2">
              <ChecklistTitle />
              {QUESTIONS.map((q, i) => (
                <div key={i} className="overflow-hidden" style={{ borderRadius: '2px', border: '1px solid #E9EDF6' }}>
                  <QuestionCard q={q} mobile={false} />
                </div>
              ))}
            </div>
          )}

          {/* ── Mobile preview ── */}
          {tab === 'mobile' && (
            <div className="flex gap-4 items-start">
              {/* QR Code card */}
              <div
                className="flex-shrink-0 bg-white rounded-xl p-3 flex flex-col gap-3 items-center"
                style={{
                  width: '148px',
                  boxShadow: '0px 4px 12px rgba(0,0,0,0.08), 0px 2px 2px rgba(0,0,0,0.04)',
                }}
              >
                <p className="text-[13px] text-[#3F495A] leading-5 self-start">
                  You can preview this checklist on your phone by scanning this QR code.
                </p>
                {/* QR code SVG */}
                <div className="border rounded-lg overflow-hidden" style={{ borderColor: '#DBE0EB' }}>
                  <svg viewBox="0 0 120 120" width="120" height="120">
                    <rect width="120" height="120" fill="white"/>
                    {/* Top-left finder */}
                    <rect x="8" y="8" width="30" height="30" rx="2" fill="#1F2533"/>
                    <rect x="12" y="12" width="22" height="22" rx="1" fill="white"/>
                    <rect x="16" y="16" width="14" height="14" rx="1" fill="#1F2533"/>
                    {/* Top-right finder */}
                    <rect x="82" y="8" width="30" height="30" rx="2" fill="#1F2533"/>
                    <rect x="86" y="12" width="22" height="22" rx="1" fill="white"/>
                    <rect x="90" y="16" width="14" height="14" rx="1" fill="#1F2533"/>
                    {/* Bottom-left finder */}
                    <rect x="8" y="82" width="30" height="30" rx="2" fill="#1F2533"/>
                    <rect x="12" y="86" width="22" height="22" rx="1" fill="white"/>
                    <rect x="16" y="90" width="14" height="14" rx="1" fill="#1F2533"/>
                    {/* Data modules */}
                    <rect x="44" y="8" width="6" height="6" fill="#1F2533"/>
                    <rect x="54" y="8" width="6" height="6" fill="#1F2533"/>
                    <rect x="44" y="18" width="6" height="6" fill="#1F2533"/>
                    <rect x="64" y="8" width="6" height="6" fill="#1F2533"/>
                    <rect x="74" y="14" width="6" height="6" fill="#1F2533"/>
                    <rect x="8" y="44" width="6" height="6" fill="#1F2533"/>
                    <rect x="18" y="44" width="6" height="6" fill="#1F2533"/>
                    <rect x="8" y="54" width="6" height="6" fill="#1F2533"/>
                    <rect x="8" y="64" width="6" height="6" fill="#1F2533"/>
                    <rect x="18" y="64" width="6" height="6" fill="#1F2533"/>
                    <rect x="106" y="44" width="6" height="6" fill="#1F2533"/>
                    <rect x="96" y="54" width="6" height="6" fill="#1F2533"/>
                    <rect x="106" y="54" width="6" height="6" fill="#1F2533"/>
                    <rect x="106" y="64" width="6" height="6" fill="#1F2533"/>
                    <rect x="44" y="106" width="6" height="6" fill="#1F2533"/>
                    <rect x="54" y="96" width="6" height="6" fill="#1F2533"/>
                    <rect x="64" y="106" width="6" height="6" fill="#1F2533"/>
                    <rect x="74" y="96" width="6" height="6" fill="#1F2533"/>
                    <rect x="44" y="44" width="6" height="6" fill="#1F2533"/>
                    <rect x="54" y="54" width="6" height="6" fill="#1F2533"/>
                    <rect x="64" y="44" width="6" height="6" fill="#1F2533"/>
                    <rect x="74" y="54" width="6" height="6" fill="#1F2533"/>
                    <rect x="44" y="64" width="6" height="6" fill="#1F2533"/>
                    <rect x="64" y="64" width="6" height="6" fill="#1F2533"/>
                    <rect x="54" y="74" width="6" height="6" fill="#1F2533"/>
                    <rect x="74" y="74" width="6" height="6" fill="#1F2533"/>
                    <rect x="84" y="44" width="6" height="6" fill="#1F2533"/>
                    <rect x="84" y="64" width="6" height="6" fill="#1F2533"/>
                    <rect x="84" y="74" width="6" height="6" fill="#1F2533"/>
                    <rect x="84" y="84" width="6" height="6" fill="#1F2533"/>
                    <rect x="94" y="84" width="6" height="6" fill="#1F2533"/>
                    <rect x="44" y="84" width="6" height="6" fill="#1F2533"/>
                  </svg>
                </div>
              </div>

              {/* Phone frame */}
              <div
                className="flex-shrink-0 overflow-hidden bg-white"
                style={{
                  width: '375px',
                  height: '720px',
                  borderRadius: '24px',
                  border: '1px solid #DBE0EB',
                  backgroundColor: '#E9EDF6',
                }}
              >
                <div className="h-full overflow-y-auto scrollbar-hide">
                  <div className="flex flex-col gap-2 p-2">
                    <ChecklistTitle />
                    {QUESTIONS.map((q, i) => (
                      <div key={i} className="overflow-hidden bg-white" style={{ borderRadius: '2px' }}>
                        <QuestionCard q={q} mobile={true} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AI Side sheet */}
        <SideSheet />
      </div>
    </div>
  )
}
