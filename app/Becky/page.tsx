import CurriculumContainer from "../containers/CurriculumContainer";
import { miCV } from "../data/DataCv";

export default function pruebasbecky() {
    return (
        <div>
            <CurriculumContainer DataCv={miCV} />
        </div>
    )
}