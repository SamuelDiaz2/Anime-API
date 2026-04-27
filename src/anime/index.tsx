import { useParams} from 'react-router';
import { useEffect, useState } from 'react'
import './style.css'

interface anime {
  rank: number
  trailer: {
    embed_url: string
  }
  mal_id: number
  title: string
  images: {
    jpg: {
      image_url: string
    }
  }
  synopsis: string
  score: number
  episodes: number
  type: string
  source: string
  duration: string
}

function Anime() {
    const { mal_id } = useParams<{ mal_id: string }>();
    const [anime, setAnime] = useState<anime | null>(null);

    useEffect(() => {
        if (!mal_id) return;
        const fetchAnime = async () => {
            try {
                const response = await fetch(`https://api.jikan.moe/v4/anime/${mal_id}`);
                const data = await response.json();
                setAnime(data.data);
            } catch (error) {
                console.error('Error fetching anime data:', error);
            }
        };

        fetchAnime();
    }, [mal_id]);

    
    const [isFavorite, SetIsFavorite] = useState(false);

    const toggleFavorite = () => {
      if (!mal_id) return;

      let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      let titulos = JSON.parse(localStorage.getItem('titulos') || '[]');

      if (favorites.includes(mal_id)) {
        favorites = favorites.filter((fav: string) => fav !== mal_id);
        titulos = titulos.filter((titulo: string) => titulo !== anime?.title);
        
        SetIsFavorite(false);
      } else {
        favorites.push(mal_id);
        titulos.push(anime?.title);
        SetIsFavorite(true);
      }
      localStorage.setItem('titulos', JSON.stringify(titulos));
      localStorage.setItem('favorites', JSON.stringify(favorites));
    };

    const [isComparador, setIsComparador] = useState(false);

    useEffect(() => {
      if (!mal_id) return;

      try {
        const comparador = JSON.parse(localStorage.getItem('comparador') || '[]');
        if (comparador.includes(mal_id)) {
          setIsComparador(true);
        }
      } catch {
        console.error("Error leyendo comparador");
      }
    }, [mal_id]);

    const toggleComparador = () => {
      if (!mal_id) return;

      let comparador: string[] = [];

      try {
        comparador = JSON.parse(localStorage.getItem('comparador') || '[]');
      } catch {
        comparador = [];
      }

      if (comparador.includes(mal_id)) {
        comparador = comparador.filter((id) => id !== mal_id);
        setIsComparador(false);
      } else {
        if (comparador.length >= 2) {
          alert("Solo puedes comparar 2 animes");
          return;
        }
        comparador.push(mal_id);
        setIsComparador(true);
      }

      localStorage.setItem('comparador', JSON.stringify(comparador));
    };

    if (!anime) return <p>Loading...</p>;


    return (
      <div className="anime-container">
        <h1 className="anime-title">Anime</h1>
        {anime && (
          <div className="anime-details">
            <h2 className="Titulo">{anime.title}</h2>
            <div className="Carta">
              <img className="Imagen" src={anime.images.jpg.image_url} alt={anime.title} />
              <p>Rank: {anime.rank}</p>
              <p>Episodes: {anime.episodes}</p>
              <p>Type: {anime.type}</p>
              <p>Source: {anime.source}</p>
              <p>Duration: {anime.duration}</p>
              <button onClick={toggleFavorite}>
                {isFavorite ? "❤️" : "🤍"}
              </button>
              <button onClick={toggleComparador}>
                {isComparador ? "⚔️" : "🆚"}
              </button>
            </div>
            <div className="contenido">
              <div className="Score">⭐{anime.score}</div>
              <p className="Sinopsis">{anime.synopsis}</p>
              <h2>Trailer</h2>
              <iframe className="Trailer"
                src={anime.trailer.embed_url}
                title="Anime Trailer"
                width="560"
                height="315"
                allowFullScreen
            ></iframe>
            </div>
          </div>
        )}
      </div>
  );
}

export default Anime;