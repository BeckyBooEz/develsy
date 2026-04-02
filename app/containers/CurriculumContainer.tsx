import CurriculumPerfil from "../components/Curriculum/CurriculumPerfil"
import CurriculumEducacion from "../components/Curriculum/CurriculumEducacion"
import CurriculumExperiencias from "../components/Curriculum/CurriculumExperiencias"
import CurriculumHabilidades from "../components/Curriculum/CurriculumHabilidades"
import CurriculumRedes from "../components/Curriculum/CurriculumRedes"
import CurriculumHeader from "../components/Curriculum/CurriculumHeader"
import { Curriculum } from "../data/DataCv"

interface Props {
    DataCv: Curriculum
}

export default function CurriculumContainer({ DataCv }: Props) {

    const sections = [
        {
            id: "perfil",
            component: <CurriculumPerfil perfil={DataCv.perfil} />
        },
        {
            id: "educacion",
            component: <CurriculumEducacion educacion={DataCv.educacion} />
        },
        {
            id: "experiencia",
            component: <CurriculumExperiencias experiencias={DataCv.experiencias} />
        },
        {
            id: "habilidades",
            component: <CurriculumHabilidades habilidades={DataCv.habilidades} />
        },
        {
            id: "redes",
            component: <CurriculumRedes redes={DataCv.redes} />
        },
    ]

    return (
        <div className="h-screen flex flex-col">
            < CurriculumHeader />
            <main className="flex-1 overflow-y-auto snap-y snap-mandatory scroll-smooth">
                {sections.map((section) => (
                    <section
                        key={section.id}
                        id={section.id}
                        className="min-h-full snap-start flex px-6"
                    >
                        {section.component}
                    </section>
                ))}
            </main>
        </div >
    )
}