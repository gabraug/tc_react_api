import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <nav>
      <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', padding: '20px' }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/favorites">Favoritos</Link>
        </li>
        <li>
          <Link to="/search">Buscar</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation

