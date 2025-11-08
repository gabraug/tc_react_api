import { useState, useCallback } from 'react'
import { useFavorites } from '../../contexts/Favorites/FavoritesContext'
import { useToast } from '../../contexts/Toast/ToastContext'
import Input from '../Input/Input'
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
  CreateListSection,
  CreateListButton,
  Actions,
} from './FavoriteModal.styles'

const MAX_LIST_NAME_LENGTH = 30
const MAX_LISTS = 3

interface FavoriteModalProps {
  movieId: number
  movieTitle: string
  isOpen: boolean
  onClose: () => void
  onConfirm: (listId: string | null) => void
}

function FavoriteModal({ movieTitle, isOpen, onClose, onConfirm }: FavoriteModalProps) {
  const { lists, createList } = useFavorites()
  const { showToast } = useToast()
  const [selectedListId, setSelectedListId] = useState<string | null>(null)
  const [newListName, setNewListName] = useState('')
  const [showCreateInput, setShowCreateInput] = useState(false)

  const canCreateMoreLists = lists.length < MAX_LISTS

  const handleNewListNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewListName(e.target.value)
  }, [])

  const handleClearNewListName = useCallback(() => {
    setNewListName('')
  }, [])

  if (!isOpen) return null

  const handleCreateList = () => {
    if (newListName.trim() && canCreateMoreLists) {
      const trimmedName = newListName.trim().slice(0, MAX_LIST_NAME_LENGTH)
      const newListId = createList(trimmedName)
      setSelectedListId(newListId)
      setNewListName('')
      setShowCreateInput(false)
      showToast(texts.success.listCreated(trimmedName), 'success')
    }
  }

  const handleConfirm = () => {
    onConfirm(selectedListId)
    onClose()
    setSelectedListId(null)
    setShowCreateInput(false)
    setNewListName('')
  }

  const handleCancel = () => {
    onClose()
    setSelectedListId(null)
    setShowCreateInput(false)
    setNewListName('')
  }

  return (
    <ModalOverlay onClick={handleCancel}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <Text as="h2" size="md" color="white" weight="bold">
            {texts.modals.addToFavorites(movieTitle)}
          </Text>
        </ModalHeader>
        <ModalBody>
          <Option>
            <OptionButton
              $selected={selectedListId === null}
              onClick={() => setSelectedListId(null)}
            >
              <Text as="span" size="sm" color="white">
                {texts.modals.favorites}
              </Text>
            </OptionButton>
          </Option>
          {lists.map(list => (
            <Option key={list.id}>
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
          <CreateListSection>
            {showCreateInput ? (
              <>
                <Input
                  type="text"
                  placeholder={texts.placeholders.listName}
                  value={newListName}
                  onChange={handleNewListNameChange}
                  maxLength={MAX_LIST_NAME_LENGTH}
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      handleCreateList()
                    }
                  }}
                  showClearButton={true}
                  onClear={handleClearNewListName}
                  showCharacterCount={true}
                  characterCountWarningThreshold={5}
                  autoFocus
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleCreateList}
                  disabled={!newListName.trim() || !canCreateMoreLists}
                >
                  {texts.buttons.create}
                </Button>
              </>
            ) : (
              <CreateListButton
                onClick={() => setShowCreateInput(true)}
                disabled={!canCreateMoreLists}
              >
                <Text as="span" size="sm" color="white">
                  {canCreateMoreLists
                    ? texts.modals.createNewList
                    : texts.modals.listLimitReached(lists.length, MAX_LISTS)}
                </Text>
              </CreateListButton>
            )}
          </CreateListSection>
        </ModalBody>
        <Actions>
          <Button variant="secondary" size="sm" onClick={handleCancel}>
            {texts.buttons.cancel}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleConfirm}
            disabled={showCreateInput && !newListName.trim()}
          >
            {texts.buttons.confirm}
          </Button>
        </Actions>
      </ModalContent>
    </ModalOverlay>
  )
}

export default FavoriteModal
