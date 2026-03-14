import CurriculumArturo from "../components/CurriculumArturo";
import { miCV } from "../data/micv";
import Image from "next/image";

export default function pruebasbecky() {
    return (
        <div>
            <CurriculumArturo miCV={miCV} />
        </div>
    )
}