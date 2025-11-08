import { texts } from '../constants/texts'

export const formatDate = (
  dateString: string | null | undefined,
  locale: string = 'pt-BR'
): string => {
  if (!dateString) {
    return texts.empty.noReleaseDate
  }

  try {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return texts.errors.invalidDate
  }
}

export const formatDateShort = (
  dateString: string | null | undefined,
  locale: string = 'pt-BR'
): string => {
  if (!dateString) {
    return 'N/A'
  }

  try {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  } catch {
    return 'N/A'
  }
}
