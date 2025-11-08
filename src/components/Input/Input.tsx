import { forwardRef, useCallback } from 'react'
import { InputWrapper, InputField, ClearButton, ClearIcon, CharacterCount } from './Input.styles'
import { texts } from '../../constants/texts'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showClearButton?: boolean
  onClear?: () => void
  showCharacterCount?: boolean
  maxLength?: number
  characterCountWarningThreshold?: number
  hasSearchButton?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      showClearButton = false,
      onClear,
      showCharacterCount = false,
      maxLength,
      characterCountWarningThreshold: _characterCountWarningThreshold = 5,
      hasSearchButton = false,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const stringValue = typeof value === 'string' ? value : String(value || '')
    const hasValue = stringValue.length > 0
    const shouldShowClearButton = !!(showClearButton && hasValue && onClear)

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (maxLength) {
          const newValue = e.target.value.slice(0, maxLength)
          e.target.value = newValue
        }
        onChange?.(e)
      },
      [maxLength, onChange]
    )

    return (
      <InputWrapper>
        {shouldShowClearButton && (
          <ClearButton type="button" onClick={onClear} aria-label={texts.aria.clear}>
            <ClearIcon />
          </ClearButton>
        )}
        <InputField
          ref={ref}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          $hasClearButton={shouldShowClearButton}
          $hasCharacterCount={showCharacterCount}
          $hasSearchButton={hasSearchButton}
          {...props}
        />
        {showCharacterCount && maxLength && (
          <CharacterCount $hasSearchButton={hasSearchButton}>
            {stringValue.length}/{maxLength}
          </CharacterCount>
        )}
      </InputWrapper>
    )
  }
)

Input.displayName = 'Input'

export default Input
