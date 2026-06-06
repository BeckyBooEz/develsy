import CurriculumPerfil from "./CurriculumPerfil"
import CurriculumEducacion from "./CurriculumEducacion"
import CurriculumExperiencias from "./CurriculumExperiencias"
import CurriculumHabilidades from "./CurriculumHabilidades"
import CurriculumRedes from "./CurriculumRedes"
import CurriculumHeader from "./CurriculumHeader"
import type { Curriculum } from "./types"

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
            component: <CurriculumEducacion educacion={DataCv.educacion} cursos={DataCv.cursos} />
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