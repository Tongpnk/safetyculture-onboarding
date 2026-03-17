import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Home, FileText, CheckSquare, FolderOpen, BookOpen, File, Zap,
  MapPin, Package, Users, MoreHorizontal, Search, HelpCircle, Bell,
  ChevronDown, Mic, Paperclip,
} from 'lucide-react'

// ─── Nav data ─────────────────────────────────────────────────────────────────

const NAV_PRIMARY = [
  { icon: Home, label: 'Home' },
  { icon: FileText, label: 'Forms' },
  { icon: CheckSquare, label: 'Tasks', active: true },
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

// ─── Task data ─────────────────────────────────────────────────────────────────

const TASKS = [
  { ref: 'WB-01', title: 'Send your first inspection', priority: 'Medium', status: 'Complete', completed: true },
  { ref: 'WB-03', title: 'Preview your workspace',     priority: 'Medium', status: 'To Do',    completed: false },
  { ref: 'WB-02', title: 'Review created assets',      priority: 'Medium', status: 'To Do',    completed: false },
  { ref: 'WB-04', title: 'Understand the 5 star SafetyCulture rating', priority: 'Medium', status: 'To Do', completed: false },
]

// ─── Icons ────────────────────────────────────────────────────────────────────

function SparkleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 33 33" fill="none">
      <path d="M16.5 3L18.6 12.3L28 14.5L18.6 16.7L16.5 26L14.4 16.7L5 14.5L14.4 12.3L16.5 3Z" fill="#675DF4"/>
      <path d="M26 21L27.1 24.4L30.5 25.5L27.1 26.6L26 30L24.9 26.6L21.5 25.5L24.9 24.4L26 21Z" fill="#00C9F0"/>
      <path d="M7 3L7.7 5.3L10 6L7.7 6.7L7 9L6.3 6.7L4 6L6.3 5.3L7 3Z" fill="#FFCB00"/>
    </svg>
  )
}

function TaskIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="1.5" width="13" height="13" rx="2.5" stroke="#4740D4" strokeWidth="1.5"/>
      <path d="M4.5 8L7 10.5L11.5 5.5" stroke="#4740D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// Thumbnail icons for AI what's next cards
function LayoutIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#545F70" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="7" height="7" rx="1.5"/>
      <rect x="11" y="2" width="7" height="7" rx="1.5"/>
      <rect x="2" y="11" width="7" height="7" rx="1.5"/>
      <rect x="11" y="11" width="7" height="7" rx="1.5"/>
    </svg>
  )
}

function CubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#545F70" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2L17 6V14L10 18L3 14V6L10 2Z"/>
      <path d="M10 2V18M3 6L10 10L17 6"/>
    </svg>
  )
}

function StarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#545F70" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2L12.3 7.2H17.9L13.5 10.6L15.2 16L10 12.6L4.8 16L6.5 10.6L2.1 7.2H7.7L10 2Z"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#007A52" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 7L5.5 10.5L12 3.5"/>
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#BD5800" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="7" cy="7" r="5.5"/>
      <path d="M7 4V7L9 9"/>
    </svg>
  )
}

function CircleCheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#4740D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="7" r="5.5"/>
      <path d="M4.5 7L6.5 9L9.5 5"/>
    </svg>
  )
}

// ─── Strikethrough title ───────────────────────────────────────────────────────

function AnimatedStrikethrough({ text }: { text: string }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setWidth(100), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <span className="relative inline-block text-[#1F2533]">
      {text}
      <span
        className="absolute left-0 top-1/2 h-[1.5px] bg-[#1F2533] -translate-y-1/2"
        style={{ width: `${width}%`, transition: 'width 0.5s ease-out' }}
      />
    </span>
  )
}

// ─── Task card ────────────────────────────────────────────────────────────────

function TaskCard({ ref: taskRef, title, priority, status, completed }: {
  ref?: string; title: string; priority: string; status: string; completed: boolean
}) {
  return (
    <div className="px-4 py-3">
      {/* Row 1: TASK label + ref */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <TaskIcon />
          <span className="text-[11px] font-semibold text-[#4740D4] tracking-[0.5px] uppercase">Task</span>
        </div>
        <span className="text-[12px] text-[#545F70]">{taskRef}</span>
      </div>

      {/* Row 2: Title */}
      <div className="mb-2.5 text-[15px] font-medium">
        {completed
          ? <AnimatedStrikethrough text={title} />
          : <span className="text-[#1F2533]">{title}</span>
        }
      </div>

      {/* Row 3: Avatar + priority + status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-[#C7D2FE] flex items-center justify-center">
            <span className="text-[9px] font-bold text-[#4740D4]">M</span>
          </div>
          {/* Priority */}
          <div className="flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 0.5L6.1 3.6H9.5L6.8 5.5L7.9 8.7L5 6.8L2.1 8.7L3.2 5.5L0.5 3.6H3.9L5 0.5Z" fill="#BD5800" opacity="0.8"/>
            </svg>
            <span className="text-[12px] font-medium text-[#545F70]">{priority}</span>
          </div>
        </div>

        {/* Status badge */}
        {completed ? (
          <span className="text-[12px] font-semibold px-2.5 py-1 rounded-lg bg-[#E8FCF5] text-[#007A52]">
            {status}
          </span>
        ) : (
          <span className="text-[12px] font-semibold px-2.5 py-1 rounded-lg bg-[#FFFAE5] text-[#9E4A00]">
            {status}
          </span>
        )}
      </div>
    </div>
  )
}

// ─── AI What's next action card ───────────────────────────────────────────────

function ActionCard({
  icon, title, description, onClick,
}: {
  icon: React.ReactNode; title: string; description: string; onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex gap-2 items-start p-2 rounded-xl border w-full text-left hover:bg-gray-50 transition-colors"
      style={{ borderColor: '#DBE0EB' }}
    >
      <div
        className="flex-shrink-0 flex items-center justify-center rounded-lg"
        style={{ width: '36px', height: '36px', backgroundColor: '#F1F3FB' }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-[#1F2533] leading-5">{title}</p>
        <p className="text-[12px] text-[#3F495A] mt-0.5 leading-4">{description}</p>
      </div>
    </button>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function HomeEmpty() {
  const navigate = useNavigate()

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: '#E9EDF6' }}>

      {/* ── Top bar (full width) ───────────────────────────────────────────── */}
      <div className="flex items-center h-[52px] px-4 bg-white border-b flex-shrink-0 gap-3" style={{ borderBottomColor: '#E9EDF6' }}>
        {/* MB Logo + MegaBites */}
        <div className="flex items-center gap-2 flex-shrink-0" style={{ width: '211px' }}>
          <div
            className="flex items-center justify-center rounded-lg text-white text-[12px] font-bold flex-shrink-0"
            style={{ width: '30px', height: '30px', backgroundColor: '#2959E8', fontFamily: 'sans-serif' }}
          >
            MB
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[15px] font-semibold text-[#1F2533]">MegaBites</span>
            <ChevronDown size={13} className="text-[#545F70]" />
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-[311px]">
          <div className="flex items-center gap-2 h-[34px] bg-white border rounded-lg px-3" style={{ borderColor: '#E9EDF6' }}>
            <Search size={14} className="text-gray-400 flex-shrink-0" />
            <span className="text-[14px] text-[#BFC6D4]">Search</span>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-5">
          <button className="text-[#545F70] hover:text-[#1F2533] p-1"><HelpCircle size={18} /></button>
          <button className="relative text-[#545F70] hover:text-[#1F2533]">
            <Bell size={18} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500" />
          </button>
          <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-[#C7D2FE] flex items-center justify-center">
            <span className="text-[9px] font-bold text-[#4740D4]">M</span>
          </div>
        </div>
      </div>

      {/* ── Body row ──────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar ── */}
        <div className="flex flex-col bg-white border-r flex-shrink-0" style={{ width: '243px', borderColor: '#E9EDF6' }}>
          <nav className="flex-1 px-2 pt-4 flex flex-col gap-0.5">
            {NAV_PRIMARY.map(({ icon: Icon, label, active }) => (
              <button
                key={label}
                className="flex items-center gap-2 w-full px-2 py-[6px] rounded-lg text-[14px] font-medium transition-colors"
                style={{
                  backgroundColor: active ? '#ECEDFE' : 'transparent',
                  color: active ? '#4740D4' : '#1F2533',
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.backgroundColor = '#F9FAFB' }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.backgroundColor = 'transparent' }}
              >
                <span className="p-1 flex-shrink-0"><Icon size={16} /></span>
                {label}
              </button>
            ))}
          </nav>

          {/* Divider */}
          <div className="mx-3 my-2 border-t" style={{ borderColor: '#E9EDF6' }} />

          <nav className="px-2 pb-4 flex flex-col gap-0.5">
            {NAV_SECONDARY.map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="flex items-center gap-2 w-full px-2 py-[6px] rounded-lg text-[14px] font-medium text-[#1F2533] transition-colors"
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F9FAFB')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <span className="p-1 flex-shrink-0"><Icon size={16} /></span>
                {label}
              </button>
            ))}
          </nav>

          {/* User footer */}
          <div className="border-t px-4 py-3" style={{ borderColor: '#E9EDF6' }}>
            <button className="flex items-center gap-2 w-full hover:bg-gray-50 rounded-lg p-1 transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#C7D2FE] flex items-center justify-center flex-shrink-0">
                <span className="text-[10px] font-bold text-[#4740D4]">M</span>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="text-[14px] font-medium text-[#1F2533] truncate">Mike</div>
                <div className="text-[12px] text-[#545F70] truncate">MegaBites Ltd</div>
              </div>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#545F70" strokeWidth="1.5" strokeLinecap="round">
                <path d="M5 7L9 4L13 7M5 11L9 14L13 11"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Page title */}
          <h1 className="text-[20px] font-semibold text-[#1F2533] tracking-[-0.25px] mb-6">Tasks</h1>

          {/* Filter tabs */}
          <div className="flex items-center gap-2 mb-6">
            {/* All (4) — active */}
            <div
              className="flex items-center gap-2 px-2 py-2 rounded-xl border"
              style={{ backgroundColor: '#F1F3FB', borderColor: '#B3B3FF' }}
            >
              <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D6DAFE' }}>
                <CircleCheckIcon />
              </div>
              <span className="text-[14px] font-medium text-[#1F2533] pr-1">All (4)</span>
            </div>

            {/* Completed (1) */}
            <div className="flex items-center gap-2 px-2 py-2 rounded-xl border bg-white" style={{ borderColor: '#DBE0EB' }}>
              <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#DAFBEF' }}>
                <CheckIcon />
              </div>
              <span className="text-[14px] font-medium text-[#1F2533] pr-1">Completed (1)</span>
            </div>

            {/* To do (3) */}
            <div className="flex items-center gap-2 px-2 py-2 rounded-xl border bg-white" style={{ borderColor: '#DBE0EB' }}>
              <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFFAE5' }}>
                <ClockIcon />
              </div>
              <span className="text-[14px] font-medium text-[#1F2533] pr-1">To do (3)</span>
            </div>
          </div>

          {/* Today section */}
          <div>
            <p className="text-[16px] font-medium text-[#1F2533] mb-2">Today</p>

            {/* Task list card */}
            <div className="bg-white rounded-xl overflow-hidden">
              {TASKS.map((task, i) => (
                <div key={task.ref}>
                  {i > 0 && <div className="border-t mx-4" style={{ borderColor: '#E9EDF6' }} />}
                  <TaskCard
                    ref={task.ref}
                    title={task.title}
                    priority={task.priority}
                    status={task.status}
                    completed={task.completed}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── AI Side sheet ── */}
        <div
          className="flex-shrink-0 flex flex-col gap-2 p-3"
          style={{
            width: '500px',
            backgroundColor: '#E9EDF6',
            boxShadow: '-4px 0px 12px rgba(0,0,0,0.06)',
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-2 flex-shrink-0 px-1 pt-1">
            <SparkleIcon />
            <span className="text-[14px] font-semibold text-[#4740D4]">AI Assistant</span>
          </div>

          {/* Chat area */}
          <div className="flex-1 min-h-0 bg-white rounded-xl p-3 overflow-y-auto scrollbar-hide flex flex-col gap-4">
            {/* Message */}
            <div className="text-[14px] text-[#1F2533] leading-5 flex flex-col gap-0 px-1">
              <p>Nice work getting your first inspection out!</p>
              <p className="mt-3">While you wait for your teammates to complete the inspections. I've set up a few things to help you get started.</p>
              <p className="mt-3">Review the tasks and complete them in your own time.</p>
            </div>

            {/* What's next */}
            <div className="flex flex-col gap-2 px-1">
              <p className="text-[16px] font-semibold text-[#1F2533]">What's next</p>

              <ActionCard
                icon={<LayoutIcon />}
                title="See how your workspace comes together"
                description="Get a view into how data will come together once inspections are completed, including insights and trends."
                onClick={() => navigate('/workspace')}
              />
              <ActionCard
                icon={<CubeIcon />}
                title="Check the created assets"
                description="See the assets that we've created and you can edit them to match your company."
              />
              <ActionCard
                icon={<StarIcon />}
                title="Review the 5 star SafetyCulture rating"
                description="See what goes into the SafetyCulture rating and how it can impact things like compliance and lowering your insurance."
              />
            </div>
          </div>

          {/* Orchestrator / input */}
          <div className="flex-shrink-0 border rounded-xl overflow-hidden bg-white" style={{ borderColor: '#DBE0EB' }}>
            <div className="flex items-center gap-2 px-2 pt-2 pb-0">
              <button
                className="inline-flex items-center gap-1 border rounded-lg px-2 py-1 text-[12px] font-medium text-[#4740D4] hover:bg-indigo-50 transition-colors"
                style={{ borderColor: '#DBE0EB' }}
              >
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
      </div>
    </div>
  )
}
