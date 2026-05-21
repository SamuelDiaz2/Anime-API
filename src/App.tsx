import { BrowserRouter as Router, Route, Routes, Link } from 'react-router'
import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut} from 'firebase/auth'
import type { User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore' // 👈 Importamos getDoc y doc para leer de Firestore
import { auth, db } from './firebase/firebaseConfig' // Asegúrate de que la ruta sea correcta

import Informativa from './informativa'
import Usuarios from './usuarios'
import Home from './home'
import Registro from './registro'
import Favoritos from './favoritos'
import Original from './original'
import './App.css'
import Anime from './anime'
import Login from './login'

function App() {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [nombreUsuario, setNombreUsuario] = useState<string>(''); // 👈 Estado para guardar el nombre de Firestore
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const desuscribir = onAuthStateChanged(auth, async (user) => {
      setUsuario(user);

      if (user) {
        try {
          
          const docRef = doc(db, 'usuarios', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            
            setNombreUsuario(docSnap.data().nombre);
          } else {
            
            setNombreUsuario(user.email || '');
          }
        } catch (error) {
          console.error("Error al obtener el nombre de Firestore:", error);
          setNombreUsuario(user.email || '');
        }
      } else {
        
        setNombreUsuario('');
      }

      setCargando(false);
    });

    return () => desuscribir();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  if (cargando) return <div className="loading">Cargando aplicación...</div>;

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
          <Route path='/registro' element={<Registro/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>

        <nav className="c-menu">
          <Link to="/">home</Link>
          <Link to="/favoritos">favoritos</Link>
          <Link to="/original">Comparador</Link>
          <Link to="/informativa">Informativa</Link>
          <Link to="/usuarios">Usuarios</Link>
          
          {/* Muestra el nombre traído desde Firestore si hay sesión activa */}
          {usuario ? (
            <div className="user-menu-item" style={{ display: 'inline', marginLeft: '15px' }}>
              <span style={{ color: '#fff', marginRight: '10px' }}>
                👤 {nombreUsuario || usuario.email}
              </span>
              <button onClick={handleLogout} className="btn-logout">cerrar sesion</button>
            </div>
          ) : (
            <Link to="/login">Iniciar Sesión</Link>
          )}
        </nav>
      </Router>
    </>
  )
}

export default App;