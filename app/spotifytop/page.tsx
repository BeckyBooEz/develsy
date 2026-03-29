import { Cancion } from "../components/CancionCard";
import CancionContainer from "../containers/CancionContainer"
import Header from "../components/Header"
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