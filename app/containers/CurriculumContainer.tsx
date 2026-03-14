import CurriculumPerfil from "../components/CurriculumPerfil"
import CurriculumEducacion from "../components/CurriculumEducacion"
import CurriculumExperiencias from "../components/CurriculumExperiencias"
import CurriculumHabilidades from "../components/CurriculumHabilidades"
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
        }
    ]

    return (
        <main className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
            {sections.map((section) => (
                <section
                    key={section.id}
                    id={section.id}
                    className="min-h-screen snap-start flex items-center justify-center px-6"
                >
                    {section.component}
                </section>
            ))}
        </main>
    )
}