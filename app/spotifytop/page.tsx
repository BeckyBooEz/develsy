import { Cancion } from "../components/CancionCard";
import CancionContainer from "../components/CancionContainer"
import Header from "../components/Header"
import cancionesJson from "../data/DataCore.json"
const canciones: Cancion[] = cancionesJson;


export default function spotifytop() {
    return (
        <main>
            <Header />
            <CancionContainer canciones={canciones} />
        </main>
    )
}