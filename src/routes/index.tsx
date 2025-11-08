import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('../pages/Home/Home'))
const MovieDetailsPage = lazy(() => import('../pages/MovieDetails/MovieDetails'))
const Favorites = lazy(() => import('../pages/Favorites/Favorites'))
const Search = lazy(() => import('../pages/Search/Search'))

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetailsPage />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  )
}

export default AppRoutes
