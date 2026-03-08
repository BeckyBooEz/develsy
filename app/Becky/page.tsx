import CurriculumArturo from "../components/CurriculumArturo";
import { miCV } from "../data/micv";

export default function pruebasbecky() {
    return (
        <div>
            <div>Hola</div>
            <CurriculumArturo miCV={miCV} />
        </div>
    )
}