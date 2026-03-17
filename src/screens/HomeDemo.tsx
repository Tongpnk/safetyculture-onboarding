import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Home, FileText, CheckSquare, FolderOpen, BookOpen, File, Zap,
  MapPin, Package, Users, MoreHorizontal, Search, HelpCircle, Bell,
  ChevronDown, Mic, Paperclip, X,
} from 'lucide-react'

// ─── Nav data ──────────────────────────────────────────────────────────────────

const NAV_PRIMARY = [
  { icon: Home,        label: 'Home',        active: true },
  { icon: FileText,    label: 'Forms' },
  { icon: CheckSquare, label: 'Tasks' },
  { icon: FolderOpen,  label: 'Projects' },
  { icon: BookOpen,    label: 'Training' },
  { icon: File,        label: 'Documents' },
  { icon: Zap,         label: 'Automations' },
]

const NAV_SECONDARY = [
  { icon: MapPin,          label: 'Sites' },
  { icon: Package,         label: 'Assets' },
  { icon: Users,           label: 'People' },
  { icon: MoreHorizontal,  label: 'More' },
]

// ─── Mini chart components ─────────────────────────────────────────────────────

const BAR_HEIGHTS = [12, 18, 38, 16, 13, 18, 26, 33, 29, 21, 26, 16, 13, 18]

function BarChart() {
  return (
    <div className="flex items-end gap-[3px] h-[39px] overflow-hidden w-full">
      {BAR_HEIGHTS.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-[2px]"
          style={{ height: `${h}px`, backgroundColor: '#99E5C9', minWidth: '6px' }}
        />
      ))}
    </div>
  )
}

function FlaggedLineChart() {
  return (
    <div className="h-[39px] w-full rounded-lg overflow-hidden" style={{ backgroundColor: '#FFF0F1' }}>
      <svg width="100%" height="39" viewBox="0 0 200 39" fill="none" preserveAspectRatio="none">
        <path
          d="M0 20 C15 18, 25 24, 40 22 C55 20, 60 15, 75 28 C90 38, 100 30, 115 24 C130 18, 140 22, 155 20 C170 18, 185 22, 200 20"
          stroke="#F87171" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

function ActionLineChart() {
  return (
    <div className="h-[39px] w-full overflow-hidden rounded-lg" style={{ backgroundColor: '#F0FDF9' }}>
      <svg width="100%" height="39" viewBox="0 0 200 39" fill="none" preserveAspectRatio="none">
        <path
          d="M0 22 C20 20, 30 24, 50 21 C70 18, 80 25, 100 22 C120 19, 130 23, 150 21 C170 19, 185 22, 200 20"
          stroke="#34D399" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

// ─── Shared icon components ────────────────────────────────────────────────────

function SparkleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 33 33" fill="none">
      <path d="M16.5 3L18.6 12.3L28 14.5L18.6 16.7L16.5 26L14.4 16.7L5 14.5L14.4 12.3L16.5 3Z" fill="#675DF4"/>
      <path d="M26 21L27.1 24.4L30.5 25.5L27.1 26.6L26 30L24.9 26.6L21.5 25.5L24.9 24.4L26 21Z" fill="#00C9F0"/>
      <path d="M7 3L7.7 5.3L10 6L7.7 6.7L7 9L6.3 6.7L4 6L6.3 5.3L7 3Z" fill="#FFCB00"/>
    </svg>
  )
}

function ArrowUpIcon({ color }: { color: string }) {
  return (
    <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
      <path d="M5 1V11M1 5L5 1L9 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ArrowDownIcon({ color }: { color: string }) {
  return (
    <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
      <path d="M5 11V1M1 7L5 11L9 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ─── Progress bar ──────────────────────────────────────────────────────────────

function ProgressBar({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-1">
        <div className="flex-1 h-[5px] rounded-full overflow-hidden" style={{ backgroundColor: '#E9EDF6' }}>
          <div
            className="h-full rounded-full"
            style={{ width: `${value}%`, backgroundColor: '#564BE7' }}
          />
        </div>
        <span className="text-[12px] font-semibold text-[#1F2533] w-7 text-right flex-shrink-0">{value}%</span>
      </div>
      <p className="text-[12px] font-semibold text-[#545F70]">{label}</p>
    </div>
  )
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  icon, label, value, unit, trend, trendValue, positive, chart,
}: {
  icon: React.ReactNode; label: string; value: string; unit?: string
  trend: 'up' | 'down'; trendValue: string; positive: boolean
  chart: React.ReactNode
}) {
  const trendBg  = positive ? '#E8FCF5' : '#FFF0F1'
  const trendClr = positive ? '#007A52' : '#A8242A'

  return (
    <div className="flex-1 min-w-0 bg-white border rounded-xl px-4 pt-5 pb-4 flex flex-col gap-1" style={{ borderColor: '#E9EDF6' }}>
      <div className="flex items-center gap-1.5 mb-1">
        {icon}
        <span className="text-[12px] font-semibold text-[#3F495A] truncate">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[30px] font-bold text-[#3F495A] leading-none tracking-tight">{value}</span>
        {unit && <span className="text-[12px] font-semibold text-[#545F70] mb-0.5 self-end">{unit}</span>}
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: trendBg }}>
            {trend === 'up'
              ? <ArrowUpIcon  color={trendClr} />
              : <ArrowDownIcon color={trendClr} />
            }
          </div>
          <span className="text-[12px] font-semibold text-[#1F2533]">{trendValue}</span>
        </div>
      </div>
      <div className="mt-2">{chart}</div>
    </div>
  )
}

// ─── Filter chip ──────────────────────────────────────────────────────────────

function FilterChip({
  icon, label, active,
}: {
  icon: React.ReactNode; label: string; active?: boolean
}) {
  return (
    <div
      className="flex items-center gap-2 px-2 py-2 rounded-xl border text-[14px] font-medium text-[#1F2533]"
      style={{
        backgroundColor: active ? '#F1F3FB' : 'white',
        borderColor: active ? '#B3B3FF' : '#DBE0EB',
      }}
    >
      <div
        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: active ? '#D6DAFE' : undefined }}
      >
        {icon}
      </div>
      <span className="pr-1">{label}</span>
    </div>
  )
}

// ─── Task row ─────────────────────────────────────────────────────────────────

function TaskRow({ title, site, assignee, priority, badge }: {
  title: string; site: string; assignee: string; priority: string; badge: { label: string; color: string; bg: string }
}) {
  return (
    <div className="flex items-center justify-between px-3 py-3 rounded-xl border bg-white" style={{ borderColor: '#DBE0EB' }}>
      <div className="flex items-center gap-2 min-w-0">
        <div className="overflow-clip relative flex-shrink-0 w-5 h-5">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6 3H14C15.1 3 16 3.9 16 5V14.5L10 17L4 14.5V5C4 3.9 4.9 3 6 3Z" stroke="#545F70" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M10 17V10M7.5 10H12.5" stroke="#545F70" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-[14px] font-medium text-[#1F2533] truncate">{title}</p>
          <p className="text-[12px] text-[#545F70] truncate">{site} · {assignee}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="text-[12px] font-medium text-[#545F70]">{priority}</span>
        <span
          className="text-[12px] font-semibold px-2 py-0.5 rounded-lg"
          style={{ color: badge.color, backgroundColor: badge.bg }}
        >
          {badge.label}
        </span>
      </div>
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function HomeDemo() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<'today' | '7d' | '30d'>('today')

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: '#E9EDF6' }}>

      {/* ── Top bar ────────────────────────────────────────────────────────── */}
      <div className="flex items-center h-[52px] px-4 bg-white border-b flex-shrink-0 gap-3" style={{ borderBottomColor: '#E9EDF6' }}>
        <div className="flex items-center gap-2 flex-shrink-0" style={{ width: '211px' }}>
          <div
            className="flex items-center justify-center rounded-lg text-white text-[12px] font-bold flex-shrink-0"
            style={{ width: '30px', height: '30px', backgroundColor: '#2959E8', fontFamily: 'sans-serif' }}
          >MB</div>
          <div className="flex items-center gap-1">
            <span className="text-[15px] font-semibold text-[#1F2533]">MegaBites</span>
            <ChevronDown size={13} className="text-[#545F70]" />
          </div>
        </div>

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

      {/* ── Body row ───────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar ── */}
        <div className="flex flex-col bg-white border-r flex-shrink-0" style={{ width: '243px', borderColor: '#E9EDF6' }}>
          <nav className="px-2 pt-4 flex flex-col gap-0.5">
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

          <div className="mx-3 my-2 border-t" style={{ borderColor: '#E9EDF6' }} />

          <nav className="px-2 flex flex-col gap-0.5">
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

          <div className="flex-1" />

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
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">

          {/* Close preview button */}
          <div>
            <button
              onClick={() => navigate('/home')}
              className="flex items-center gap-1.5 border rounded-xl px-4 py-2 text-[14px] font-medium bg-white hover:bg-gray-50 transition-colors"
              style={{ borderColor: '#DBE0EB', color: '#3F495A' }}
            >
              <X size={14} />
              Close preview
            </button>
          </div>

          {/* AI Insight banner */}
          <div
            className="bg-white rounded-2xl p-4 flex items-center gap-3 border-2"
            style={{ borderColor: '#564BE7' }}
          >
            {/* Sparkle thumbnail */}
            <div
              className="flex-shrink-0 flex items-center justify-center rounded-xl"
              style={{ width: '48px', height: '48px', backgroundColor: '#675DF4' }}
            >
              <SparkleIcon size={22} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[12px] font-bold text-[#4740D4] tracking-[1px] uppercase">AI Insight</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#ECEDFE', color: '#4740D4' }}>Live</span>
              </div>
              <p className="text-[14px] text-[#545F70] leading-5">
                Across your 5 factories, safety compliance is up{' '}
                <span className="font-semibold text-[#007A52]">94%</span>
                , up 2% from the last week. Southfield needs attention with{' '}
                <span className="font-semibold text-[#A8242A]">3 missed calibration logs</span>.
              </p>
            </div>

            <button className="flex-shrink-0 text-[14px] font-medium underline text-[#3F495A] hover:text-[#1F2533]">
              Learn more
            </button>
          </div>

          {/* SafetyCulture Rating card */}
          <div className="bg-white rounded-2xl p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 tracking-tight">
                  <span className="text-[34px] font-bold text-[#1F2533] leading-none">4.8</span>
                  <span className="text-[22px] leading-none">⭐</span>
                </div>
                <span className="text-[12px] font-bold text-[#1F2533] tracking-[1px] uppercase">SafetyCulture rating</span>
              </div>
              <button className="text-[14px] font-medium underline" style={{ color: '#4740D4' }}>
                How to improve your score
              </button>
            </div>

            <p className="text-[12px] text-[#3F495A] leading-4">
              This score reflects how consistently your team is following safety and compliance processes. Higher ratings can help reduce risk and insurance costs.
            </p>

            <div className="flex gap-10">
              <ProgressBar value={98} label="Inspection completion rate" />
              <ProgressBar value={92} label="Issue resolution rate" />
            </div>
            <div className="flex gap-10">
              <ProgressBar value={94} label="Safety compliance rate" />
              <ProgressBar value={91} label="Near misses reported" />
            </div>
          </div>

          {/* Stats card */}
          <div className="bg-white rounded-2xl p-4 flex flex-col gap-4">
            {/* Period tabs + View all */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {(['today', '7d', '30d'] as const).map((t) => {
                  const labels = { today: 'Today', '7d': 'Last 7 days', '30d': 'Last 30 days' }
                  const active = tab === t
                  return (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className="px-3 py-1.5 rounded-xl border text-[13px] font-medium transition-colors"
                      style={{
                        backgroundColor: active ? 'white' : 'transparent',
                        borderColor: active ? '#564BE7' : 'transparent',
                        color: active ? '#4740D4' : '#3F495A',
                      }}
                    >
                      {labels[t]}
                    </button>
                  )
                })}
              </div>
              <button className="text-[14px] font-medium" style={{ color: '#4740D4' }}>View all</button>
            </div>

            {/* 3 stat cards */}
            <div className="flex gap-4">
              <StatCard
                icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="1.5" width="13" height="13" rx="2.5" stroke="#3F495A" strokeWidth="1.5"/><path d="M4 8L6.5 10.5L12 5" stroke="#3F495A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                label="Safety compliance"
                value="94%"
                trend="up"
                trendValue="4%"
                positive={true}
                chart={<BarChart />}
              />
              <StatCard
                icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#3F495A" strokeWidth="1.5"/><path d="M8 5V8.5" stroke="#3F495A" strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="11" r="0.75" fill="#3F495A"/></svg>}
                label="Flagged items"
                value="49"
                trend="up"
                trendValue="19%"
                positive={false}
                chart={<FlaggedLineChart />}
              />
              <StatCard
                icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="1.5" width="13" height="13" rx="2.5" stroke="#3F495A" strokeWidth="1.5"/><path d="M4.5 8L6.5 10L11 5.5" stroke="#3F495A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                label="Action average time open"
                value="2.5"
                unit="Days"
                trend="down"
                trendValue="4%"
                positive={true}
                chart={<ActionLineChart />}
              />
            </div>
          </div>

          {/* My teams agenda */}
          <div className="bg-white rounded-2xl p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[18px] font-semibold text-[#1F2533]">My teams agenda</h2>
              <button className="flex items-center gap-1 text-[13px] font-medium" style={{ color: '#4740D4' }}>
                All features <ChevronDown size={14} />
              </button>
            </div>

            {/* Filter chips */}
            <div className="flex items-center gap-2 flex-wrap">
              <FilterChip
                active
                icon={
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#4740D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="7" cy="7" r="5.5"/><path d="M4.5 7L6.5 9L9.5 5"/>
                  </svg>
                }
                label="All (23)"
              />
              <FilterChip
                icon={
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#A8242A" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="7" cy="7" r="5.5"/><path d="M7 4.5V7.5M7 9.5V10"/>
                  </svg>
                }
                label="Overdue (8)"
              />
              <FilterChip
                icon={
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#BD5800" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="7" cy="7" r="5.5"/><path d="M7 4V7L9 9"/>
                  </svg>
                }
                label="Due today (9)"
              />
              <FilterChip
                icon={
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#4740D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="7" cy="7" r="5.5"/><path d="M4.5 7L6.5 9L9.5 5"/>
                  </svg>
                }
                label="Upcoming (12)"
              />
            </div>

            {/* Task rows */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between py-3 px-3 border-b" style={{ borderColor: '#E9EDF6' }}>
                <div className="flex items-center gap-1.5">
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <rect x="1.5" y="1.5" width="13" height="13" rx="2.5" stroke="#4740D4" strokeWidth="1.5"/>
                    <path d="M4.5 8L7 10.5L11.5 5.5" stroke="#4740D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[11px] font-bold text-[#4740D4] tracking-[0.5px] uppercase">Task</span>
                </div>
                <span className="text-[12px] text-[#545F70]">WB-21231</span>
              </div>
              <TaskRow
                title="High Priority: Floor Cleaning"
                site="Southfield"
                assignee="Mike Johnson"
                priority="High"
                badge={{ label: 'Overdue', color: '#A8242A', bg: '#FFE5E9' }}
              />
              <TaskRow
                title="Temperature Log failure"
                site="Factory 2"
                assignee="Amy Lee"
                priority="High"
                badge={{ label: 'Due today', color: '#9E4A00', bg: '#FFFAE5' }}
              />
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
            <div className="text-[14px] text-[#1F2533] leading-5 flex flex-col gap-3 px-1">
              <p>This is a preview of your workspace once data starts coming in.</p>
              <p>You'll be able to see insights about your business, key metrics at a glance, and an overview of your SafetyCulture rating.</p>
            </div>

            {/* What's next */}
            <div className="flex flex-col gap-2 px-1">
              <p className="text-[16px] font-semibold text-[#1F2533]">What's next</p>

              <button
                className="flex gap-2 items-start p-2 rounded-xl border w-full text-left hover:bg-gray-50 transition-colors"
                style={{ borderColor: '#DBE0EB' }}
              >
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-lg"
                  style={{ width: '36px', height: '36px', backgroundColor: '#675DF4' }}
                >
                  <SparkleIcon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-[#1F2533] leading-5">Review the 5 star SafetyCulture rating</p>
                  <p className="text-[12px] text-[#3F495A] mt-0.5 leading-4">See what goes into the SafetyCulture rating and how it can impact things like compliance and lowering your insurance.</p>
                </div>
              </button>
            </div>
          </div>

          {/* Input */}
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
