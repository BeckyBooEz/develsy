import { Cancion } from "./_SpotifyTop/CancionCard";
import CancionContainer from "../containers/CancionContainer"
import Header from "./_SpotifyTop/Header"
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