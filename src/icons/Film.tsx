interface FilmProps {
  size?: number
  color?: string
}

function Film({ size = 24, color = 'currentColor' }: FilmProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" stroke={color} strokeWidth="2" fill="none" />
      <line x1="9" y1="4" x2="9" y2="20" stroke={color} strokeWidth="2" />
      <line x1="15" y1="4" x2="15" y2="20" stroke={color} strokeWidth="2" />
      <line x1="3" y1="8" x2="9" y2="8" stroke={color} strokeWidth="2" />
      <line x1="3" y1="12" x2="9" y2="12" stroke={color} strokeWidth="2" />
      <line x1="3" y1="16" x2="9" y2="16" stroke={color} strokeWidth="2" />
      <line x1="15" y1="8" x2="21" y2="8" stroke={color} strokeWidth="2" />
      <line x1="15" y1="12" x2="21" y2="12" stroke={color} strokeWidth="2" />
      <line x1="15" y1="16" x2="21" y2="16" stroke={color} strokeWidth="2" />
    </svg>
  )
}

export default Film
