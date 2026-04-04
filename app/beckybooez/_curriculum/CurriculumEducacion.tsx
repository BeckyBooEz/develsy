import type { Curriculum } from "./types"

interface Props {
    educacion: Curriculum["educacion"]
    cursos: Curriculum["cursos"]
}

export default function CurriculumEducacion({ educacion, cursos }: Props) {
    return (
        <div className="flex flex-col w-full justify-baseline">
            <div>
                <div className="flex items-center gap-3 mt-4">
                    <h2 className="tracking-widest">Educación</h2>
                    <div className="flex-1 h-px bg-indigo-600" />
                </div>
                {educacion.map((instituto, index) => (
                    <div key={index}>
                        <p>{instituto.escuela}</p>
                        <p>{instituto.nivel}</p>
                        <p>{instituto.titulo}</p>
                        <p>{instituto.fechas}</p>
                    </div>
                ))}
            </div>
            <div>
                <div className="flex items-center gap-3 mt-4">
                    <h2 className="tracking-widest">Cursos y Talleres</h2>
                    <div className="flex-1 h-px bg-indigo-600" />
                </div>
                <ul>
                    {cursos.map((curso, index) => (
                        <li key={index}>
                            <h1>{curso.nombre}</h1>
                            <div className="flex gap-2 pl-5">
                                <p>{curso.institucion}</p>
                                <p>{curso.fecha}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div >
    )
}