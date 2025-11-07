import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import MovieDetails from '../pages/MovieDetails'
import Favorites from '../pages/Favorites'
import Search from '../pages/Search'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  )
}

export default AppRoutes

