import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useToast } from '../../contexts/Toast/ToastContext'
import Input from '../Input/Input'
import Button from '../Button/Button'
import Text from '../Text/Text'
import SearchIcon from '../../icons/Search'
import { texts } from '../../constants/texts'
import {
  HeaderContainer,
  Logo,
  SearchContainer,
  SearchWrapper,
  SearchForm,
  SearchButton,
  Navigation,
  MobileMenuButton,
  MobileMenu,
} from './Header.styles'

const MAX_SEARCH_LENGTH = 30

function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { showToast } = useToast()
  const [searchTerm, setSearchTerm] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (location.pathname === '/search') {
      const params = new URLSearchParams(location.search)
      const query = params.get('q') || ''
      setSearchTerm(query.slice(0, MAX_SEARCH_LENGTH))
    } else {
      setSearchTerm('')
    }
  }, [location])

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, MAX_SEARCH_LENGTH)
    setSearchTerm(value)
  }, [])

  const handleSearch = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault()
      if (searchTerm.trim()) {
        const trimmedSearch = searchTerm.trim()
        const currentQuery =
          location.pathname === '/search' ? new URLSearchParams(location.search).get('q') || '' : ''

        if (currentQuery.toLowerCase() === trimmedSearch.toLowerCase()) {
          showToast(texts.header.searchAlreadyActive, 'info')
          return
        }

        navigate(`/search?q=${encodeURIComponent(trimmedSearch)}`)
        setIsMobileMenuOpen(false)
      }
    },
    [searchTerm, navigate, location, showToast]
  )

  const handleLogoClick = useCallback(() => {
    navigate('/')
    setIsMobileMenuOpen(false)
  }, [navigate])

  const handleNavClick = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  const handleClear = useCallback(() => {
    setSearchTerm('')
    if (location.pathname === '/search') {
      navigate('/')
    }
  }, [location.pathname, navigate])

  return (
    <HeaderContainer>
      <Logo onClick={handleLogoClick}>{texts.header.logo}</Logo>
      <SearchContainer>
        <SearchForm onSubmit={handleSearch}>
          <SearchWrapper>
            <Input
              id="header-search-input"
              type="text"
              placeholder={texts.header.searchPlaceholder}
              value={searchTerm}
              onChange={handleSearchChange}
              maxLength={MAX_SEARCH_LENGTH}
              showClearButton={true}
              onClear={handleClear}
              showCharacterCount={true}
              characterCountWarningThreshold={5}
              hasSearchButton={true}
            />
            <SearchButton type="submit" aria-label={texts.aria.search}>
              <SearchIcon size={20} color="white" />
            </SearchButton>
          </SearchWrapper>
        </SearchForm>
      </SearchContainer>
      <Navigation>
        <Button
          variant="link"
          size="sm"
          onClick={() => {
            handleNavClick()
            navigate('/')
          }}
        >
          <Text as="span" size="sm" color={location.pathname === '/' ? 'white' : 'text'}>
            {texts.navigation.home}
          </Text>
        </Button>
        <Button
          variant="link"
          size="sm"
          onClick={() => {
            handleNavClick()
            navigate('/favorites')
          }}
        >
          <Text as="span" size="sm" color={location.pathname === '/favorites' ? 'white' : 'text'}>
            {texts.navigation.favorites}
          </Text>
        </Button>
      </Navigation>
      <MobileMenuButton onClick={toggleMobileMenu} $isOpen={isMobileMenuOpen}>
        <span></span>
        <span></span>
        <span></span>
      </MobileMenuButton>
      <MobileMenu $isOpen={isMobileMenuOpen}>
        <Button
          variant="link"
          size="sm"
          fullWidth
          onClick={() => {
            handleNavClick()
            navigate('/')
          }}
        >
          <Text as="span" size="sm" color={location.pathname === '/' ? 'white' : 'text'}>
            {texts.navigation.home}
          </Text>
        </Button>
        <Button
          variant="link"
          size="sm"
          fullWidth
          onClick={() => {
            handleNavClick()
            navigate('/favorites')
          }}
        >
          <Text as="span" size="sm" color={location.pathname === '/favorites' ? 'white' : 'text'}>
            {texts.navigation.favorites}
          </Text>
        </Button>
      </MobileMenu>
    </HeaderContainer>
  )
}

export default Header
