export default function SafetyCultureLogo({ white = false }: { white?: boolean }) {
  return (
    <div className="flex items-center">
      <span className={`font-bold text-[22px] tracking-tight ${white ? 'text-white' : 'text-gray-900'}`}>
        <span>Safety</span>
        <span className={white ? 'text-white' : 'text-gray-900'}>Culture</span>
      </span>
      <div className="relative ml-0.5 -mt-2">
        <div className="flex gap-[2px] h-[4px]">
          <div className="w-[14px] rounded-full" style={{ backgroundColor: '#FFCB00' }}></div>
          <div className="w-[10px] rounded-full" style={{ backgroundColor: '#5B4CF5' }}></div>
          <div className="w-[6px] rounded-full" style={{ backgroundColor: '#00C9F0' }}></div>
        </div>
      </div>
    </div>
  )
}
