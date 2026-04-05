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
                    <h2 className="text-xs font-medium uppercase tracking-widest text-gray-400 whitespace-nowrap">
                        Educación
                    </h2>
                    <span className="flex-1 h-px bg-indigo-600" />
                </div>
                <div className="flex flex-col gap-2.5 mt-3">
                    {educacion.map((instituto, index) => (
                        <div key={index} className="flex rounded-md border border-gray-200 overflow-hidden">
                            <div className={`w-1 shrink-0 bg-indigo-600 ${index > 0 ? "opacity-40" : ""}`} />
                            <div className="px-4 py-3 flex-1">
                                <div className="flex justify-between items-baseline gap-4">
                                    <p className="text-sm font-medium">{instituto.escuela}</p>
                                    <span className="text-xs text-gray-400 whitespace-nowrap">{instituto.fechas}</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5">{instituto.nivel} · {instituto.titulo}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <div className="flex items-center gap-3 mt-6">
                    <h2 className="text-xs font-medium uppercase tracking-widest text-gray-400 whitespace-nowrap">
                        Cursos y Talleres
                    </h2>
                    <span className="flex-1 h-px bg-indigo-600" />
                </div>
                <ul className="flex flex-col mt-1">
                    {cursos.map((curso, index) => (
                        <li key={index} className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-0 gap-4">
                            <div>
                                <p className="text-sm font-medium">{curso.nombre}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{curso.institucion}</p>
                            </div>
                            <span className="text-xs text-gray-400 whitespace-nowrap">{curso.fecha}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}