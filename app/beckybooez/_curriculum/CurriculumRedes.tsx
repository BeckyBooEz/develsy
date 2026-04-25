import type { Curriculum } from "./types"

interface Props {
    redes: Curriculum["redes"]
}

export default function CurriculumRedes({ redes }: Props) {
    return (
        <div className="flex flex-col w-full">
            <div className="flex items-center gap-3 mt-4">
                <h2 className="text-xs font-medium uppercase tracking-widest text-gray-400 whitespace-nowrap">
                    Redes
                </h2>
                <span className="flex-1 h-px bg-indigo-600" />
            </div>
            <div className="grid grid-cols-2 gap-3 ms:grid-cols-1">

                {redes.map((red, index) => (
                    <a
                        key={index}
                        href={red.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            flex items-center gap-3 p-3 rounded-lg border border-gray-200
                            hover:border-indigo-400 hover:bg-indigo-50
                            transition-all duration-200
                            group
                        "
                    >
                        <div className="
                            w-10 h-10 flex items-center justify-center
                            rounded-full bg-indigo-100
                            group-hover:bg-indigo-200
                        ">
                            <img src={red.img} alt={red.red} className="w-5 h-5" />
                        </div>
                        <span className="text-sm text-gray-700 group-hover:text-indigo-600">
                            {red.red}
                        </span>
                    </a>
                ))}
            </div>
            <div className="w-full flex justify-center p-40">
                <a href="\CV_ArturoMiranda.pdf" download="CV_ArturoMiranda.pdf">
                    <button className="rounded-lg border border-gray-200
                            hover:border-indigo-400 hover:bg-indigo-50
                            transition-all duration-200
                            group">
                        Descargar CV
                    </button>
                </a>
            </div>
        </div >
    )
}