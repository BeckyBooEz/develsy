import Image from "next/image"

export interface Cancion {
    Artista: string,
    "Canción": string,
    "Reproducciones Totales": number,
    "Minutos Reproducidos": number,
    "Portada Spotify": string,
    "Álbum": string,
    "Fecha de Lanzamiento": string,
    "Duración (min)": number,
    Popularidad: number,
    "Spotify Link": string,
}

export default function CancionCard({ cancion }: { cancion: Cancion }) {
    return (
        <div>
            <Image src={cancion["Portada Spotify"]} alt="PortadaSpotify" width={40} height={40} />
            <p>{cancion["Canción"]}</p>
            <p>{cancion["Álbum"]}</p>
            <p>{cancion["Artista"]}</p>
            <p>{cancion["Reproducciones Totales"]}</p>
            <p>{cancion["Minutos Reproducidos"]}</p>
            <p>{cancion["Duración (min)"]}</p>
            <p>{cancion["Popularidad"]}</p>
            <a href={cancion["Spotify Link"]}>Escuchar</a>
        </div>
    )
}