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

interface CancionCardProps {
    cancion: Cancion;
}

export default function CancionCard({ cancion }: CancionCardProps) {
    return (
        <div className="border rounded-lg shadow p-4 flex flex-col gap-2">
            <div className="w-full">
                <Image
                    src={cancion["Portada Spotify"]}
                    alt="PortadaSpotify"
                    width={300}
                    height={300}
                    className="w-full h-auto rounded-md"
                />
            </div>
            <div className="text-center">

                <p className="font-bold">{cancion["Canción"]}</p>
                <p className="text-gray-600">{cancion["Álbum"]}</p>
                <p>{cancion["Artista"]}</p>
                <p>Duración: {cancion["Duración (min)"]}</p>
                <p>Reproducciones: {cancion["Reproducciones Totales"]}</p>
                <p>Minutos: {cancion["Minutos Reproducidos"]}</p>
                <p>Popularidad: {cancion["Popularidad"]}/100</p>
                <a href={cancion["Spotify Link"]} className="text-green-600 font-semibold"
                >Escuchar</a>
            </div>
        </div>
    );
}