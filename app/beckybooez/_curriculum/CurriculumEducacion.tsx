import type { Curriculum } from "./types"

interface Props {
    educacion: Curriculum["educacion"]
}

export default function CurriculumEducacion({ educacion }: Props) {
    return (
        <div>
            <p>Educación</p>
            <div>
                {educacion.map((instituto, index) => (
                    <div key={index}>
                        <p >{instituto.escuela}</p>
                        <p >{instituto.nivel}</p>
                        <p>{instituto.titulo}</p>
                        <p >{instituto.fechas}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}