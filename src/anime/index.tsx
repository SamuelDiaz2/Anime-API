import { useParams} from 'react-router';
import { useEffect, useState } from 'react'
import './style.css'

interface anime {
  rank: number
  trailer: {
    embed_url: string
  }
  mal_id: number
  url: string
  title: string
  images: {
    jpg: {
      image_url: string
    }
  }
  synopsis: string
  score: number
}

function Anime() {

    const { mal_id } = useParams();
    const [anime, setAnime] = useState<anime | null>(null);
    useEffect(() => {
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


    return (
      <div>
        <h1>Anime</h1>
        {anime && (
          <div>
            <h2>{anime.title}</h2>
            <p>Score: {anime.score}</p>
            <img src={anime.images.jpg.image_url} alt={anime.title} />
            <p>{anime.synopsis}</p>
              <iframe
                src={anime.trailer.embed_url}
                title="Anime Trailer"
                width="560"
                height="315"
                allowFullScreen
              ></iframe>
          </div>
        )}
      </div>
  );
}

export default Anime;