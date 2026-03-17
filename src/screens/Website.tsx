import { useNavigate } from 'react-router-dom'
import { ChevronDown, Globe, LogIn } from 'lucide-react'
import SafetyCultureLogo from '../components/SafetyCultureLogo'

export default function Website() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
        <div className="flex items-center gap-8">
          <SafetyCultureLogo />
          <div className="flex items-center gap-6 text-[14px] text-gray-700 font-medium">
            <button className="flex items-center gap-1 hover:text-gray-900">Products <ChevronDown size={14} /></button>
            <button className="flex items-center gap-1 hover:text-gray-900">Solution <ChevronDown size={14} /></button>
            <button className="flex items-center gap-1 hover:text-gray-900">Support <ChevronDown size={14} /></button>
            <button className="hover:text-gray-900">Customers</button>
            <button className="hover:text-gray-900">Pricing</button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 text-[14px] text-gray-600 hover:text-gray-900 font-medium">
            <Globe size={14} />
            English <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-1.5 text-[14px] text-gray-700 hover:text-gray-900 font-medium border border-gray-200 rounded-lg px-3.5 py-2">
            <LogIn size={14} />
            Log in
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="text-[14px] text-white font-semibold rounded-lg px-4 py-2 transition-colors"
            style={{ backgroundColor: '#5B4CF5' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#4A3DE0')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#5B4CF5')}
          >
            Sign up for free
          </button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center" style={{ backgroundColor: '#F0F0F5' }}>
        <div className="flex flex-col items-center pt-16 pb-12 px-6 text-center max-w-4xl mx-auto w-full">
          <div className="inline-flex items-center border border-gray-300 bg-white rounded-full px-4 py-1.5 text-[13px] text-gray-600 font-medium mb-8">
            Improvement Operating System
          </div>
          <h1 className="text-[60px] leading-[1.1] font-bold text-gray-900 mb-6 tracking-tight">
            A better way of working
          </h1>
          <p className="text-[18px] text-gray-600 leading-relaxed max-w-2xl mb-10">
            Give your frontline teams the tools, knowledge, and confidence to work safely, meet higher standards, and improve every day.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/signup')}
              className="text-[15px] text-white font-semibold rounded-xl px-6 py-3 shadow-sm transition-colors"
              style={{ backgroundColor: '#5B4CF5' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#4A3DE0')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#5B4CF5')}
            >
              Sign up for free
            </button>
            <button className="text-[15px] text-gray-700 font-semibold rounded-xl px-6 py-3 border border-gray-300 bg-white hover:bg-gray-50 transition-colors">
              View demo
            </button>
          </div>
        </div>

        <div className="w-full max-w-6xl mx-auto px-8 pb-0 relative">
          <div className="relative flex items-end justify-center gap-6">
            <div className="w-[580px] rounded-t-2xl shadow-2xl overflow-hidden border border-gray-200 bg-white">
              <div className="h-8 bg-gray-50 border-b border-gray-200 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div className="flex-1 mx-4 h-4 bg-gray-200 rounded-full"></div>
              </div>
              <div className="flex h-72">
                <div className="w-40 bg-gray-50 border-r border-gray-100 p-3 flex flex-col gap-1">
                  <div className="text-[10px] font-bold text-gray-900 mb-2 px-2">SafetyCulture</div>
                  {['Home', 'Search', 'Notifications', 'Lone Worker', 'Templates', 'Inspections', 'Schedule', 'Actions', 'Training', 'Assets', 'Documents', 'Issues'].map((item) => (
                    <div key={item} className={`text-[9px] px-2 py-1 rounded text-gray-600 flex items-center gap-1.5 ${item === 'Home' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'hover:bg-gray-100'}`}>
                      <div className="w-2.5 h-2.5 rounded-sm bg-current opacity-40"></div>
                      {item}
                    </div>
                  ))}
                </div>
                <div className="flex-1 p-4">
                  <div className="text-[11px] font-semibold text-gray-800 mb-3">Analytics</div>
                  <div className="mb-3">
                    <div className="text-[10px] text-gray-500 mb-2">Getting started</div>
                    <div className="grid grid-cols-5 gap-2">
                      {['Inspections', 'Site', 'Actions', 'Flagged', 'Issues'].map((d) => (
                        <div key={d} className="bg-gray-50 rounded p-2 border border-gray-100">
                          <div className="h-8 bg-gradient-to-t from-indigo-100 to-indigo-50 rounded mb-1"></div>
                          <div className="text-[7px] text-gray-500 truncate">{d} Dashboard</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div>
                      <div className="text-[10px] text-gray-500 mb-1">Recently viewed</div>
                      <div className="flex items-center gap-2">
                        <div className="text-[18px] font-bold text-gray-800">340</div>
                        <div className="w-12 h-12">
                          <svg viewBox="0 0 42 42" className="w-full h-full">
                            <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#e5e7eb" strokeWidth="5"></circle>
                            <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#5B4CF5" strokeWidth="5" strokeDasharray="62 38" strokeDashoffset="25"></circle>
                            <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#FFCB00" strokeWidth="5" strokeDasharray="28 72" strokeDashoffset="-37"></circle>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] text-gray-500 mb-1">Insights</div>
                      <div className="bg-indigo-50 rounded p-2 text-[8px] text-indigo-700">"Daily equipment inspection" has a flagged rate of 55%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-48 rounded-[28px] shadow-2xl overflow-hidden border-4 border-gray-800 bg-white mb-0 self-end" style={{ height: '280px' }}>
              <div className="bg-gray-800 h-6 flex items-center justify-center">
                <div className="w-16 h-3 bg-gray-700 rounded-full"></div>
              </div>
              <div className="p-3 bg-white h-full">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[9px] font-bold text-gray-900">SafetyCulture</div>
                  <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[7px] font-bold">M</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-2 mb-2">
                  <div className="text-[8px] font-semibold text-gray-800 mb-0.5">Maria Murphy</div>
                  <div className="text-[7px] text-gray-500">New coffee machines! Learn how to use Fetco CBS-2142XTS</div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="bg-gray-50 rounded p-1.5"><div className="text-[7px] text-gray-500">Training</div><div className="text-[12px] font-bold text-gray-800">4</div></div>
                  <div className="bg-gray-50 rounded p-1.5"><div className="text-[7px] text-gray-500">Issues</div><div className="text-[12px] font-bold text-gray-800">3</div></div>
                </div>
                <div className="text-[8px] font-semibold text-gray-700 mb-1">In progress <span className="text-indigo-600 text-[7px]">View all</span></div>
                <div className="space-y-1">
                  <div className="bg-gray-50 rounded p-1.5">
                    <div className="text-[7px] text-gray-500">Inspection</div>
                    <div className="text-[7px] font-medium text-gray-800 truncate">00101 / Ari Bautista / 5 Oct 2023</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #F0F0F5)' }}></div>
        </div>
      </main>
    </div>
  )
}
