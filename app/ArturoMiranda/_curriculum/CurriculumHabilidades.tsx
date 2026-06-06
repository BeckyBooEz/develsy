import type { Curriculum } from "./types"

interface Props {
    habilidades: Curriculum["habilidades"]
}

const nivelBadge: Record<string, string> = {
    "Avanzado": "bg-indigo-100 text-indigo-700",
    "Intermedio": "bg-indigo-50 text-indigo-400",
    "Básico": "bg-gray-100 text-gray-400",
}

export default function CurriculumHabilidades({ habilidades }: Props) {
    return (
        <div className="flex flex-col w-full">
            <div className="flex items-center gap-3 mt-4">
                <h2 className="text-xs font-medium uppercase tracking-widest text-gray-400 whitespace-nowrap">
                    Habilidades
                </h2>
                <span className="flex-1 h-px bg-indigo-600" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">

                {/* Card Técnicas */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-[10px] font-medium uppercase tracking-widest text-gray-400">
                            Técnicas
                        </p>
                    </div>
                    <div className="px-4 py-3 flex flex-col gap-2">
                        {habilidades.duras.map((dura, index) => (
                            <div key={index} className="flex items-center justify-between gap-3">
                                <span className="text-xs text-gray-600">{dura.habilidad}</span>
                                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 min-w-24 text-center ${nivelBadge[dura.nivel] ?? "bg-gray-100 text-gray-400"}`}>
                                    {dura.nivel}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Columna derecha */}
                <div className="flex flex-col gap-3">

                    {/* Card Blandas */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-[10px] font-medium uppercase tracking-widest text-gray-400">
                                Blandas
                            </p>
                        </div>
                        <div className="px-4 py-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
                            {habilidades.blandas.map((habilidad, index) => (
                                <div key={index} className="flex items-center gap-1.5">
                                    <span className="w-1 h-1 rounded-full bg-indigo-400 shrink-0" />
                                    <span className="text-xs text-gray-500">{habilidad}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Card Idiomas */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-[10px] font-medium uppercase tracking-widest text-gray-400">
                                Idiomas
                            </p>
                        </div>
                        <div className="px-4 py-3 flex flex-col gap-2">
                            {habilidades.idiomas.map((idioma, index) => (
                                <div key={index} className="flex items-center justify-between gap-3">
                                    <span className="text-xs text-gray-600">{idioma.lengua}</span>
                                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 min-w-24 text-center bg-gray-100 text-gray-400">
                                        {idioma.nivel}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}