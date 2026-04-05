import type { Curriculum } from "./types"

interface Props {
    experiencias: Curriculum["experiencias"]
}

export default function CurriculumExperiencias({ experiencias }: Props) {
    return (
        <div className="flex flex-col w-full">
            <div className="flex items-center gap-3 mt-4">
                <h2 className="text-xs font-medium uppercase tracking-widest text-gray-400 whitespace-nowrap">
                    Experiencia
                </h2>
                <span className="flex-1 h-px bg-indigo-600" />
            </div>

            <div className="flex flex-col gap-3 mt-3">
                {experiencias.map((experiencia, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">

                        <div className="flex justify-between items-start flex-wrap gap-2 px-4 py-3 border-b border-gray-100">
                            <div>
                                <p className="text-sm font-medium">{experiencia.entidad}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{experiencia.puesto}</p>
                            </div>
                            <span className={`
                                text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap
                                ${index === 0
                                    ? "bg-indigo-50 text-indigo-700"
                                    : "bg-gray-100 text-gray-500"
                                }
                            `}>
                                {experiencia.fechas}
                            </span>
                        </div>

                        <ul className="px-4 py-3 flex flex-col gap-1.5 list-disc list-outside ml-3">
                            {experiencia.funciones.map((funcion, i) => (
                                <li key={i} className="text-xs text-gray-500 leading-relaxed">
                                    {funcion}
                                </li>
                            ))}
                        </ul>

                    </div>
                ))}
            </div>
        </div>
    )
}