import './style.css'

function Informativa() {

    return (
        <div className="info-container">
            <div className="overlay">
                <h1 className="info-title">ANIME API</h1>
                <p className="info-author">por Samuel Díaz</p>

                <img
                className="info-image"
                src="https://myanimelist.net/images/anime/1244/111115.jpg"
                alt="Anime"
                />

                <div className="info-box">
                API con información de miles de animes 🎬
                </div>

                <p className="info-footer">
                <a href="https://github.com/SamuelDiaz2">Github Samuel Diaz</a> <br />
                v1.0.0
                </p>
            </div>
        </div>

    )
}

export default Informativa;