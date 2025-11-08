import { useState } from 'react'
import { useFavorites } from '../../contexts/Favorites/FavoritesContext'
import Button from '../Button/Button'
import Text from '../Text/Text'
import { texts } from '../../constants/texts'
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Option,
  OptionButton,
  Actions,
} from './RemoveFavoriteModal.styles'

interface RemoveFavoriteModalProps {
  movieId: number
  movieTitle: string
  isOpen: boolean
  onClose: () => void
  onConfirm: (listId: string | null) => void
}

function RemoveFavoriteModal({
  movieId,
  movieTitle,
  isOpen,
  onClose,
  onConfirm,
}: RemoveFavoriteModalProps) {
  const { getListsContainingMovie } = useFavorites()
  const [selectedListId, setSelectedListId] = useState<string | null>(null)

  if (!isOpen) return null

  const listsContainingMovie = getListsContainingMovie(movieId)

  const handleConfirm = () => {
    if (selectedListId !== undefined) {
      onConfirm(selectedListId)
      onClose()
      setSelectedListId(null)
    }
  }

  const handleCancel = () => {
    onClose()
    setSelectedListId(null)
  }

  return (
    <ModalOverlay onClick={handleCancel}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <Text as="h2" size="md" color="white" weight="bold">
            {texts.modals.removeFromFavorites(movieTitle)}
          </Text>
        </ModalHeader>
        <ModalBody>
          <Text size="sm" color="textLight" style={{ marginBottom: '1rem' }}>
            {texts.modals.selectListToRemove}
          </Text>
          {listsContainingMovie.map(list => (
            <Option key={list.id || 'general'}>
              <OptionButton
                $selected={selectedListId === list.id}
                onClick={() => setSelectedListId(list.id)}
              >
                <Text as="span" size="sm" color="white">
                  {list.name}
                </Text>
              </OptionButton>
            </Option>
          ))}
        </ModalBody>
        <Actions>
          <Button variant="secondary" size="sm" onClick={handleCancel}>
            {texts.buttons.cancel}
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleConfirm}
            disabled={selectedListId === null && listsContainingMovie.length > 0}
          >
            {texts.buttons.remove}
          </Button>
        </Actions>
      </ModalContent>
    </ModalOverlay>
  )
}

export default RemoveFavoriteModal
