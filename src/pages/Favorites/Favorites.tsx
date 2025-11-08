import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMoviesByIds } from '../../services/utils/movies'
import type { MovieDetails as MovieDetailsType } from '../../types/movie'
import { useFavorites } from '../../contexts/Favorites/FavoritesContext'
import { useToast } from '../../contexts/Toast/ToastContext'
import { useSorting } from '../../hooks/useSorting'
import MovieCard from '../../components/MovieCard/MovieCard'
import MovieCardSkeleton from '../../components/MovieCardSkeleton/MovieCardSkeleton'
import SortPanel from '../../components/SortPanel/SortPanel'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import Text from '../../components/Text/Text'
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal'
import Film from '../../icons/Film'
import { texts } from '../../constants/texts'
import { colors } from '../../styles/constants'
import {
  Container,
  MainContainer,
  ListsContainer,
  ListSection,
  ListActions,
  CreateListButton,
  CreateListButtonContent,
  ListCountBadge,
  Header,
  ContentWrapper,
  Grid,
  EmptyState,
  EmptyImage,
  EmptyButton,
} from './Favorites.styles'

type SortOption = 'title-asc' | 'title-desc' | 'rating-asc' | 'rating-desc'

function Favorites() {
  const navigate = useNavigate()
  const { favorites, lists, removeFavorite, createList, updateList, deleteList } = useFavorites()
  const { showToast } = useToast()
  const [selectedListId, setSelectedListId] = useState<string | null>(null)
  const [movies, setMovies] = useState<MovieDetailsType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>('title-asc')
  const [editingListId, setEditingListId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [showCreateInput, setShowCreateInput] = useState(false)
  const [newListName, setNewListName] = useState('')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [listToDelete, setListToDelete] = useState<{ id: string; name: string } | null>(null)

  const currentList = selectedListId
    ? lists.find(l => l.id === selectedListId)
    : { id: 'general', name: texts.lists.favorites, movieIds: favorites }

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true)
        setError(null)

        const movieIds = selectedListId
          ? lists.find(l => l.id === selectedListId)?.movieIds || []
          : favorites

        if (movieIds.length === 0) {
          setMovies([])
          return
        }

        const moviesData = await getMoviesByIds(movieIds)
        setMovies(moviesData)
      } catch (_err) {
        const errorMessage = texts.errors.loadFavorites
        setError(errorMessage)
        showToast(errorMessage, 'error')
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [favorites, lists, selectedListId, showToast])

  const sortedMovies = useSorting({
    items: movies,
    sortBy,
  })

  const handleDelete = (movieId: number) => {
    removeFavorite(movieId, selectedListId || undefined)
    setMovies(prev => prev.filter(m => m.id !== movieId))
  }

  const handleCreateList = () => {
    if (newListName.trim() && lists.length < 3) {
      const trimmedName = newListName.trim().slice(0, 30)
      const newListId = createList(trimmedName)
      setNewListName('')
      setShowCreateInput(false)
      setSelectedListId(newListId)
      showToast(texts.success.listCreated(trimmedName), 'success')
    }
  }

  const handleClearNewListName = useCallback(() => {
    setNewListName('')
  }, [])

  const handleNewListNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewListName(e.target.value)
  }, [])

  const canCreateMoreLists = lists.length < 3

  const handleStartEdit = (listId: string, currentName: string) => {
    setEditingListId(listId)
    setEditingName(currentName)
  }

  const handleSaveEdit = () => {
    if (editingListId && editingName.trim()) {
      const trimmedName = editingName.trim().slice(0, 30)
      const list = lists.find(l => l.id === editingListId)
      updateList(editingListId, trimmedName)
      setEditingListId(null)
      setEditingName('')
      if (list && list.name !== trimmedName) {
        showToast(texts.success.listRenamed(trimmedName), 'success')
      }
    }
  }

  const handleEditingNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingName(e.target.value)
  }, [])

  const handleDeleteListClick = (listId: string) => {
    const list = lists.find(l => l.id === listId)
    if (list) {
      setListToDelete({ id: listId, name: list.name })
      setDeleteModalOpen(true)
    }
  }

  const handleConfirmDelete = useCallback(() => {
    if (listToDelete) {
      deleteList(listToDelete.id)
      if (selectedListId === listToDelete.id) {
        setSelectedListId(null)
      }
      showToast(texts.info.listDeleted(listToDelete.name), 'info')
      setListToDelete(null)
      setDeleteModalOpen(false)
    }
  }, [listToDelete, selectedListId, deleteList, showToast])

  const handleCancelDelete = useCallback(() => {
    setDeleteModalOpen(false)
    setListToDelete(null)
  }, [])

  if (loading) {
    return (
      <Container>
        <ListsContainer>
          <ListSection $selected={selectedListId === null} onClick={() => setSelectedListId(null)}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Text as="div" size="sm" color="white" weight="semibold">
                {texts.lists.favorites} ({favorites.length})
              </Text>
            </div>
          </ListSection>
          {lists.map(list => (
            <ListSection
              key={list.id}
              $selected={selectedListId === list.id}
              onClick={() => setSelectedListId(list.id)}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Text as="div" size="sm" color="white" weight="semibold">
                  {list.name} ({list.movieIds.length})
                </Text>
              </div>
            </ListSection>
          ))}
        </ListsContainer>
        <MainContainer>
          <SortPanel
            title={texts.labels.sortBy}
            options={[
              { value: 'title-asc', label: texts.sortOptions.titleAsc },
              { value: 'title-desc', label: texts.sortOptions.titleDesc },
              { value: 'rating-desc', label: texts.sortOptions.ratingDesc },
              { value: 'rating-asc', label: texts.sortOptions.ratingAsc },
            ]}
            activeValue={sortBy}
            onSelect={() => {}}
          />
          <ContentWrapper>
            <Header>
              <Text as="h2" size="md" color="white" weight="bold">
                {currentList?.name || texts.lists.favorites}
              </Text>
            </Header>
            <Grid>
              <MovieCardSkeleton count={12} />
            </Grid>
          </ContentWrapper>
        </MainContainer>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <Text size="md" color="error">
          {error}
        </Text>
      </Container>
    )
  }

  return (
    <Container>
      <ListsContainer>
        <ListSection $selected={selectedListId === null} onClick={() => setSelectedListId(null)}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Text as="div" size="sm" color="white" weight="semibold">
              {texts.lists.favorites} ({favorites.length})
            </Text>
          </div>
        </ListSection>
        {lists.map(list => (
          <ListSection
            key={list.id}
            $selected={selectedListId === list.id}
            onClick={() => setSelectedListId(list.id)}
          >
            {editingListId === list.id ? (
              <>
                <div
                  style={{
                    display: 'flex',
                    gap: 'clamp(0.5rem, 1vw, 1rem)',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <Input
                      type="text"
                      value={editingName}
                      onChange={handleEditingNameChange}
                      maxLength={30}
                      onKeyPress={e => {
                        if (e.key === 'Enter') {
                          handleSaveEdit()
                        }
                      }}
                      onClick={e => e.stopPropagation()}
                      showClearButton={true}
                      onClear={() => setEditingName('')}
                      showCharacterCount={true}
                      characterCountWarningThreshold={5}
                      autoFocus
                    />
                  </div>
                  <ListActions>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={e => {
                        e.stopPropagation()
                        handleSaveEdit()
                      }}
                    >
                      {texts.buttons.save}
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={e => {
                        e.stopPropagation()
                        setEditingListId(null)
                        setEditingName('')
                      }}
                    >
                      {texts.buttons.cancel}
                    </Button>
                  </ListActions>
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Text as="div" size="sm" color="white" weight="semibold">
                    {list.name} ({list.movieIds.length})
                  </Text>
                  <ListActions>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={e => {
                        e.stopPropagation()
                        handleStartEdit(list.id, list.name)
                      }}
                    >
                      {texts.buttons.edit}
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={e => {
                        e.stopPropagation()
                        handleDeleteListClick(list.id)
                      }}
                    >
                      {texts.buttons.delete}
                    </Button>
                  </ListActions>
                </div>
              </>
            )}
          </ListSection>
        ))}
        {showCreateInput ? (
          <ListSection>
            <div
              style={{
                display: 'flex',
                gap: 'clamp(0.5rem, 1vw, 1rem)',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <div style={{ flex: 1 }}>
                <Input
                  type="text"
                  placeholder={texts.placeholders.listName}
                  value={newListName}
                  onChange={handleNewListNameChange}
                  maxLength={30}
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
              </div>
              <ListActions>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleCreateList}
                  disabled={!newListName.trim() || !canCreateMoreLists}
                >
                  {texts.buttons.create}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setShowCreateInput(false)
                    setNewListName('')
                  }}
                >
                  {texts.buttons.cancel}
                </Button>
              </ListActions>
            </div>
          </ListSection>
        ) : (
          <CreateListButton onClick={() => setShowCreateInput(true)} disabled={!canCreateMoreLists}>
            <CreateListButtonContent>
              <span>
                {canCreateMoreLists
                  ? texts.modals.createNewList
                  : texts.modals.listLimitReached(lists.length, 3)}
              </span>
              <ListCountBadge $isFull={!canCreateMoreLists}>{lists.length}/3</ListCountBadge>
            </CreateListButtonContent>
          </CreateListButton>
        )}
      </ListsContainer>

      {loading ? (
        <Container>
          <Text size="md" color="text">
            {texts.loading.default}
          </Text>
        </Container>
      ) : error ? (
        <Container>
          <Text size="md" color="error">
            {error}
          </Text>
        </Container>
      ) : movies.length === 0 ? (
        <Container>
          <EmptyState>
            <EmptyImage>
              <Film size={64} color={colors.gray.icon} />
            </EmptyImage>
            <Text size="md" color="text" align="center">
              {selectedListId ? texts.empty.emptyList : texts.empty.noFavorites}
            </Text>
            <Text size="sm" color="textLight" align="center">
              {texts.empty.emptyListDescription}
            </Text>
            <EmptyButton onClick={() => navigate('/')}>
              <Text as="span" size="sm" color="white">
                {texts.buttons.exploreMovies}
              </Text>
            </EmptyButton>
          </EmptyState>
        </Container>
      ) : (
        <MainContainer>
          <SortPanel
            title={texts.labels.sortBy}
            options={[
              { value: 'title-asc', label: texts.sortOptions.titleAsc },
              { value: 'title-desc', label: texts.sortOptions.titleDesc },
              { value: 'rating-desc', label: texts.sortOptions.ratingDesc },
              { value: 'rating-asc', label: texts.sortOptions.ratingAsc },
            ]}
            activeValue={sortBy}
            onSelect={value => setSortBy(value as SortOption)}
          />
          <ContentWrapper>
            <Header>
              <Text as="h2" size="md" color="white" weight="bold">
                {currentList?.name || texts.lists.favorites}
              </Text>
            </Header>
            <Grid>
              {sortedMovies.map(movie => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  showDeleteButton={true}
                  onDelete={handleDelete}
                />
              ))}
            </Grid>
          </ContentWrapper>
        </MainContainer>
      )}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title={texts.modals.deleteList}
        message={listToDelete ? texts.modals.deleteListConfirm(listToDelete.name) : ''}
        confirmText={texts.buttons.delete}
        cancelText={texts.buttons.cancel}
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Container>
  )
}

export default Favorites
