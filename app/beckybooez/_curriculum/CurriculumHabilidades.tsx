import type { Curriculum } from "./types"

interface Props {
    habilidades: Curriculum["habilidades"]
}

const nivelColor: Record<string, string> = {
    "Avanzado": "bg-indigo-600",
    "Intermedio": "bg-indigo-300",
    "Básico": "bg-gray-300",
}

const nivelTexto: Record<string, string> = {
    "Avanzado": "text-indigo-600",
    "Intermedio": "text-indigo-300",
    "Básico": "text-gray-400",
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

            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-6 gap-y-4 mt-3">

                {/* Técnicas */}
                <div>
                    <p className="text-[10px] font-medium uppercase tracking-widest text-gray-400 mb-2.5">
                        Técnicas
                    </p>
                    <div className="flex flex-col gap-1.5">
                        {habilidades.duras.map((dura, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full shrink-0 ${nivelColor[dura.nivel] ?? "bg-gray-300"}`} />
                                <span className={`text-xs ${nivelTexto[dura.nivel] === "text-gray-400" ? "text-gray-400" : "text-gray-700"}`}>
                                    {dura.habilidad}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Leyenda */}
                    <div className="flex gap-3 mt-3">
                        {Object.entries(nivelColor).map(([nivel, color]) => (
                            <div key={nivel} className="flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
                                <span className="text-[10px] text-gray-400">{nivel}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Blandas + Idiomas */}
                <div>
                    <p className="text-[10px] font-medium uppercase tracking-widest text-gray-400 mb-2.5">
                        Blandas
                    </p>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                        {habilidades.blandas.map((habilidad, index) => (
                            <span key={index} className="text-xs text-gray-500">
                                {habilidad}
                            </span>
                        ))}
                    </div>

                    <p className="text-[10px] font-medium uppercase tracking-widest text-gray-400 mt-4 mb-2.5">
                        Idiomas
                    </p>
                    <div className="flex flex-col gap-1.5">
                        {habilidades.idiomas.map((idioma, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full shrink-0 bg-indigo-300" />
                                <span className="text-xs text-gray-700">{idioma.lengua}</span>
                                <span className="text-xs text-gray-400">· {idioma.nivel}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}