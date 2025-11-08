import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import MovieDetailsPage from '../pages/MovieDetails/MovieDetails'
import Favorites from '../pages/Favorites/Favorites'
import Search from '../pages/Search/Search'

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
