import { useEffect, useState } from "react";
import { Link } from "react-router";

function Favoritos() {

  const [favorites, setFavorites] = useState<string[]>([]);
  const [titulos, setTitulos] = useState<string[]>([]);
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const storedTitulos = JSON.parse(localStorage.getItem('titulos') || '[]');
    setFavorites(storedFavorites || []);
    setTitulos(storedTitulos || []);
  }, []);
  

  return (
    <div>
      <h1>Favoritos</h1>
      {favorites.length === 0 ? (
        <p>No tienes favoritos aún.</p>
      ) : (
        <ol>
          {favorites.map((id, index) => (
            <li key={id}>
              <Link to={`/anime/${id}`}>{titulos[index]}</Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default Favoritos;