import { Habilidades } from "@/app/data/DataCv"

interface Props {
    habilidades: Habilidades
}

export default function CurriculumHabilidades({ habilidades }: Props) {
    return (
        <main>
            <h1>Habilidades</h1>
            <div className="flex justify-baseline">
                <section>
                    <h2>Blandas</h2>
                    <ul>
                        {habilidades.blandas.map((habilidad, index) => (
                            <li key={index}>{habilidad}</li>
                        ))}
                    </ul>
                </section>
                <section>
                    <h2>Duras</h2>
                    <ul>
                        {habilidades.duras.map((dura, index) => (
                            <li key={index}>{dura.habilidad} - {dura.nivel}</li>
                        ))}
                    </ul>
                </section>
            </div>
            <h2>Idiomas</h2>
            <section>
                <ul className="flex gap-7">
                    {habilidades.idiomas.map((idioma, index) => (
                        <li key={index}>
                            {idioma.lengua} - {idioma.nivel}
                        </li>
                    ))}
                </ul>
            </section>
        </main >
    )
}
