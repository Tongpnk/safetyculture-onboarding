import { useNavigate } from 'react-router-dom'
import { ChevronDown, Globe, LogIn } from 'lucide-react'

export default function Website() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
        <div className="flex items-center gap-8">
          <img src="/assets/sc-logo.svg" alt="SafetyCulture" className="h-[22px] w-auto" />
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
            style={{ backgroundColor: '#675DF4' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#4740D4')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#675DF4')}
          >
            Sign up for free
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center" style={{ backgroundColor: '#F0F0F5' }}>
        <div className="flex flex-col items-center pt-16 pb-12 px-6 text-center max-w-4xl mx-auto w-full">
          {/* Badge */}
          <div className="inline-flex items-center border border-gray-300 bg-white rounded-full px-4 py-1.5 text-[13px] text-gray-600 font-medium mb-8">
            Improvement Operating System
          </div>

          {/* Heading */}
          <h1 className="text-[60px] leading-[1.1] font-bold text-gray-900 mb-6 tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
            A better way of working
          </h1>

          {/* Subheading */}
          <p className="text-[18px] text-gray-600 leading-relaxed max-w-2xl mb-10">
            Give your frontline teams the tools, knowledge, and confidence to work safely, meet higher standards, and improve every day.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/signup')}
              className="text-[15px] text-white font-semibold rounded-xl px-6 py-3 shadow-sm transition-colors"
              style={{ backgroundColor: '#675DF4' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#4740D4')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#675DF4')}
            >
              Sign up for free
            </button>
            <button className="text-[15px] text-gray-700 font-semibold rounded-xl px-6 py-3 border border-gray-300 bg-white hover:bg-gray-50 transition-colors">
              View demo
            </button>
          </div>
        </div>

        {/* Product screenshot */}
        <div className="w-full max-w-6xl mx-auto px-8 pb-0 relative">
          <img
            src="/assets/hero-product.png"
            alt="SafetyCulture platform"
            className="w-full block"
            style={{ maxWidth: '956px', margin: '0 auto', display: 'block' }}
          />
          {/* Glow effect */}
          <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #F0F0F5)' }}></div>
        </div>
      </main>
    </div>
  )
}
