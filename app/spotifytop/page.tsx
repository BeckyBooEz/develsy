import { Cancion } from "./_datosdatos/CancionCard";
import CancionContainer from "./_datosdatos/CancionContainer"
import Header from "./_datosdatos/Header"
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