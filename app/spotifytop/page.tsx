import { Cancion } from "./_spotifyTop/CancionCard";
import CancionContainer from "./_spotifyTop/CancionContainer"
import Header from "./_spotifyTop/Header"
import cancionesJson from "../data/DataFull.json"
const canciones: Cancion[] = cancionesJson;


export default function spotifytop() {
    return (
        <main>
            <Header />
            <CancionContainer canciones={canciones} />
        </main>
    )
}