interface ChevronUpProps {
  size?: number
  color?: string
}

function ChevronUp({ size = 24, color = 'currentColor' }: ChevronUpProps) {
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
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  )
}

export default ChevronUp
