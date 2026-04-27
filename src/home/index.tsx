import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import "./style.css";



interface Anime {

  mal_id: number
  url: string
  images: {
    jpg: {
      image_url: string
    }
  } 
  title: string
  score: number
  rank: number
}


type FiltroTipo = '' |'favorite' | 'airing' | 'upcoming' | 'bypopularity';



function Home() {

  const [Anime, setAnime] = useState<Anime[]>([]);
  const [page, setPage] = useState(1);

  const [filtro, setFiltro] = useState<FiltroTipo>('');

  const filtros: FiltroTipo[] = ['airing', 'upcoming', 'bypopularity', 'favorite'];
  
  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/top/anime?page=${page}&filter=${filtro}`
      );
      const data = await response.json();
      setAnime(data.data);
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  };

  fetchData();
  }, [page, filtro]);

  const [busqueda, setBusqueda] = useState('');

  const animeFiltrado = Anime.filter((anime) =>
    busqueda.length < 3
      ? true
      : anime.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  useEffect(() => {
  setBusqueda('');
  setPage(1);
}, [filtro]);


  return (
    <>
      <div className="filtros">
        {filtros.map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={filtro === f ? 'activo' : ''}
          >
            {f}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Buscar anime..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <h1>Top Anime</h1>
      <div className="home">
        {animeFiltrado.map((anime) => (
          <div key={anime.mal_id} className="anime-card">
            <Link to={`/anime/${anime.mal_id}`}>
            <img src={anime.images.jpg.image_url} alt={anime.title} />
            </Link>
            <p>⭐ {anime.score}</p>
            
            <h2
            className={
              busqueda.length >= 3 &&
              anime.title.toLowerCase().includes(busqueda.toLowerCase())
                ? 'resaltado'
                : ''
            }
          >
            {anime.rank}. {anime.title}
          </h2>
        </div>
      ))}
            
      </div>
            <div className="pagina">
        <p>Página: {page}</p>

        <button className="boton-ante" onClick={() => setPage(page - 1)} disabled={page === 1}>
          Anterior
        </button>
        
        <button className="boton-sig" onClick={() => setPage(page + 1)}>
          Siguiente
        </button>
      </div>
    </>
  )
}

export default Home;