import { Cancion } from "./_spotifytop/CancionCard";
import CancionContainer from "./_spotifytop/CancionContainer"
import Header from "./_spotifytop/Header"
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