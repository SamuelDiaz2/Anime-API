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




function Home() {

  const [Anime, setAnime] = useState<Anime[]>([]);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://api.jikan.moe/v4/top/anime');
          const data = await response.json();
          setAnime(data.data);
        } catch (error) {
          console.error('Errror cargando datos:', error);
        }
      };

      fetchData();

  }, []);


  return (
    <>
      <h1>Top Anime</h1>
      
      {Anime.map((Anime) => (
        <div key={Anime.url} className="anime-card">
          <h2>{Anime.rank}. {Anime.title}</h2>
          <Link to={`/anime/${Anime.mal_id}`}>
            <img src={Anime.images.jpg.image_url} alt={Anime.title} />
          </Link>
          <p>Score: {Anime.score}</p>
        </div>
      ))}
    </>
  )
}

export default Home;