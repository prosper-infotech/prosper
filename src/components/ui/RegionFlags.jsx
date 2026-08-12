export function FlagUSA({ className = 'h-14 w-14' }) {
  return (
    <div className={`relative ${className} shrink-0 overflow-hidden rounded-full border border-ink-300 shadow-sm`}>
      <div
        className="absolute inset-0"
        style={{
          background:
            'repeating-linear-gradient(180deg, #B22234 0px, #B22234 4px, #FFFFFF 4px, #FFFFFF 8px)',
        }}
      />
      <div className="absolute left-0 top-0 h-[46%] w-[46%] bg-[#3C3B6E]" />
    </div>
  )
}

export function FlagIndia({ className = 'h-14 w-14' }) {
  return (
    <div className={`relative ${className} shrink-0 overflow-hidden rounded-full border border-ink-300 shadow-sm`}>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #FF9933 0%, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%, #138808 100%)',
        }}
      />
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#000080]" />
    </div>
  )
}

export function FlagJapan({ className = 'h-14 w-14' }) {
  return (
    <div className={`relative ${className} shrink-0 overflow-hidden rounded-full border border-ink-300 shadow-sm bg-white`}>
      <div className="absolute left-1/2 top-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#BC002D]" />
    </div>
  )
}

export const FLAG_COMPONENTS = {
  usa: FlagUSA,
  india: FlagIndia,
  japan: FlagJapan,
}
