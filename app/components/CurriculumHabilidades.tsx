import { Habilidades } from "../data/DataCv"

interface Props {
    habilidades: Habilidades
}

export default function CurriculumHabilidades({ habilidades }: Props) {
    return (
        <div>
            <div>
                <h1>Habilidades</h1>
                <h2>Blandas</h2>
                {habilidades.blandas.map((blanda, index) => (
                    <p key={index}>{blanda}</p>
                ))}
                <h2>Duras</h2>
                {habilidades.duras.map((dura, index) => (
                    <div key={index}>
                        <p>{dura.habilidad}</p>
                        <p>{dura.nivel}</p>
                    </div>
                ))}
            </div>
            <div>
                <h1>Idiomas</h1>
                {habilidades.idiomas.map((idioma, index) => (
                    <div key={index}>
                        <p>{idioma.lengua}</p>
                        <p>{idioma.nivel}</p>
                    </div>
                ))}
            </div>
        </div>

    )
}
