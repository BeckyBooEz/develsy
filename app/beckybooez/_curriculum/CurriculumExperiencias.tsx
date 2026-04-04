import type { Curriculum } from "./types"

interface Props {
    experiencias: Curriculum["experiencias"]
}

export default function CurriculumExperiencias({ experiencias }: Props) {
    return (
        <main className="w-screen">
            <p>Experiencia</p>
            {experiencias.map((experiencia, index) => (
                <div className="flex" key={index}>
                    <div className="flex flex-col w-1/4 gap-2">
                        <p>{experiencia.entidad}</p>
                        <p>{experiencia.puesto}</p>
                        <p>{experiencia.fechas}</p>
                    </div>
                    <ul className="w-2/4">
                        {experiencia.funciones.map((funcion, index) => (
                            <li key={index}>{funcion}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </main>
    )
}