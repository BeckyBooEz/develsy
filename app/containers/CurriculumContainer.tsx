import CurriculumPerfil from "../components/CurriculumPerfil"
import CurriculumEducacion from "../components/CurriculumEducacion"
import CurriculumExperiencias from "../components/CurriculumExperiencias"
import CurriculumHabilidades from "../components/CurriculumHabilidades"
import { Curriculum } from "../data/DataCv"

interface Props {
    DataCv: Curriculum
}

export default function CurriculumContainer({ DataCv }: Props) {
    return (
        <div>
            <CurriculumPerfil perfil={DataCv.perfil} />
            <CurriculumEducacion educacion={DataCv.educacion} />
            <CurriculumExperiencias experiencias={DataCv.experiencias} />
            <CurriculumHabilidades habilidades={DataCv.habilidades} />
        </div>
    )
}