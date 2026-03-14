import { Experiencias } from "../data/DataCv"

interface Props {
    experiencias: Experiencias[]
}

export default function CurriculumExperiencias({ experiencias }: Props) {
    return (
        <div>
            <p>Experiencia</p>
            {experiencias.map((experiencia, index) => (
                <div key={index}>
                    <p>{experiencia.entidad}</p>
                    <p>{experiencia.fechas}</p>
                    <ul>
                        {experiencia.funciones.map((funcion, index) => (
                            <li key={index}>{funcion}</li>
                        ))}
                    </ul>
                    <p>{experiencia.puesto}</p>
                </div>
            ))}
        </div>
    )
}