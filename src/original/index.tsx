import { useEffect, useState } from 'react';
import './style.css';


function Original() {

    const [animes, setAnimes] = useState<any[]>([]);

    useEffect(() => {
        const fetchComparador = async () => {
        try {
            const ids = JSON.parse(localStorage.getItem('comparador') || '[]');

            if (ids.length < 2) return;

            const requests = ids.map((id: string) =>
            fetch(`https://api.jikan.moe/v4/anime/${id}`)
                .then(res => res.json())
                .then(data => data.data)
            );

            const results = await Promise.all(requests);
            setAnimes(results);

        } catch (error) {
            console.error("Error cargando comparador", error);
        }
        };

        fetchComparador();
    }, []);


    const limpiarComparador = () => {
        localStorage.removeItem('comparador');
        setAnimes([]); // limpia el estado también
    };

    if (animes.length < 2) {
        return <p>Agrega 2 animes para comparar</p>;
    }

    const [a1, a2] = animes;

    return (
        <>
            <div className="comparador">
                <div className="anime" >
                    <h2>{a1.title}</h2>
                    <img src={a1.images?.jpg?.image_url} alt={a1.title} />
                    <p className={a1.score > a2.score ? "ganador" : ""}>
                    ⭐ {a1.score}
                    </p>
                    <p>📺 {a1.episodes}</p>
                </div>

                <div className="vs">VS</div>
                
                <div className="anime">
                    <h2>{a2.title}</h2>
                    <img src={a2.images?.jpg?.image_url} alt={a2.title} />
                    <p className={a2.score > a1.score ? "ganador" : ""}>
                    ⭐ {a2.score}
                    </p>
                    <p>📺 {a2.episodes}</p>
                </div>
            </div>
            <button className="limpiar" onClick={limpiarComparador}>Limpiar Comparador</button>
        </>
    );
    }

export default Original;