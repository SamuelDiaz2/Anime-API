import { BrowserRouter as Router, Route, Routes, Link } from 'react-router'

import Informativa from './informativa'
import Usuarios from './usuarios'
import Home from './home'
import Favoritos from './favoritos'
import Original from './original'
import './App.css'
import Anime from './anime'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/favoritos' element={<Favoritos/>} />
          <Route path='/original' element={<Original/>} />
          <Route path='/informativa' element={<Informativa/>} />
          <Route path='/usuarios' element={<Usuarios/>} />
          <Route path='/anime/:mal_id' element={<Anime/>} />
        </Routes>

        <nav className="c-menu">
          <Link to = "/">home</Link>
          <Link to = "/favoritos">favoritos</Link>
          <Link to = "/original">Original</Link>
          <Link to = "/informativa">Informativa</Link>
          <Link to = "/usuarios">Usuarios</Link>
        </nav>
      </Router>
    </>
  )
}

export default App
