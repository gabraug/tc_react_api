import { useState } from 'react'
import Text from '../Text/Text'
import ChevronDown from '../../icons/ChevronDown'
import ChevronUp from '../../icons/ChevronUp'
import { texts } from '../../constants/texts'
import {
  SortContainer,
  SortHeader,
  SortToggleButton,
  SortContent,
  SortList,
  SortOption,
} from './SortPanel.styles'

interface SortOptionItem {
  value: string
  label: string
}

interface SortPanelProps {
  title: string
  options: SortOptionItem[]
  activeValue: string
  onSelect: (value: string) => void
}

function SortPanel({ title, options, activeValue, onSelect }: SortPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const toggleExpand = () => {
    setIsExpanded(prev => !prev)
  }

  return (
    <SortContainer>
      <SortHeader>
        <Text as="div" size="sm" color="white" weight="semibold">
          {title}
        </Text>
        <SortToggleButton
          onClick={toggleExpand}
          aria-label={isExpanded ? texts.aria.minimize : texts.aria.maximize}
        >
          {isExpanded ? (
            <ChevronUp size={18} color="currentColor" />
          ) : (
            <ChevronDown size={18} color="currentColor" />
          )}
        </SortToggleButton>
      </SortHeader>
      {isExpanded && (
        <SortContent>
          <SortList>
            {options.map(option => (
              <SortOption
                key={option.value}
                $active={activeValue === option.value}
                onClick={() => onSelect(option.value)}
              >
                <Text as="span" size="sm" color="white">
                  {option.label}
                </Text>
              </SortOption>
            ))}
          </SortList>
        </SortContent>
      )}
    </SortContainer>
  )
}

export default SortPanel
