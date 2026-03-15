import { Educacion } from "../data/DataCv"

interface Props {
    educacion: Educacion[]
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