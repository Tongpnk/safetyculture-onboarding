import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import SafetyCultureLogo from '../components/SafetyCultureLogo'

export default function SignUp() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [form, setForm] = useState({ email: '', firstName: '', lastName: '', password: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/start')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: '#9CA3AF' }}>
      <div className="mb-8"><SafetyCultureLogo white /></div>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-[22px] font-bold text-gray-900 mb-1">Create your free account</h1>
        <p className="text-[13px] text-gray-500 mb-6">No credit card, no commitment, and cancel anytime.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Work email</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">First name</label>
              <input type="text" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Last name</label>
              <input type="text" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
            </div>
          </div>
          <div>
            <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Password <span className="font-normal text-gray-400">(min 8 characters)</span></label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 pr-10 text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <input type="checkbox" id="agree" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-indigo-600 flex-shrink-0" />
            <label htmlFor="agree" className="text-[12px] text-gray-500 leading-relaxed cursor-pointer">By checking this box, I agree to receive updates, insights and offers from SafetyCulture and its affiliates by email and phone to the above contact information. I understand I can withdraw my consent.</label>
          </div>
          <button type="submit" className="w-full text-[15px] text-white font-semibold rounded-lg py-3 transition-colors mt-2" style={{ backgroundColor: '#5B4CF5' }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#4A3DE0')} onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#5B4CF5')}>Create free account</button>
        </form>
        <p className="text-[12px] text-gray-500 text-center mt-4">By creating an account you agree to SafetyCulture's <a href="#" className="text-indigo-600 hover:underline">Terms & Conditions</a> and <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.</p>
        <p className="text-[13px] text-gray-700 text-center mt-3 font-medium">Already have an account? <a href="#" className="text-indigo-600 hover:underline">Log in</a> instead.</p>
      </div>
    </div>
  )
}
