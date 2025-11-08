interface ChevronDownProps {
  size?: number
  color?: string
}

function ChevronDown({ size = 24, color = 'currentColor' }: ChevronDownProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  )
}

export default ChevronDown
