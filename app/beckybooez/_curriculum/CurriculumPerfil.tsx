import type { Curriculum } from "./types"

interface Props {
    perfil: Curriculum["perfil"]
}

export default function CurriculumPerfil({ perfil }: Props) {
    return (
        <main className="flex flex-col md:flex-row justify-start items-center w-screen gap-6">
            <div className="w-full md:w-1/3 flex justify-center">
                <img
                    className="rounded-full w-60 h-80 md:w-80 md:h-120 object-cover"
                    src={"/img/perfilprofesional.png"}
                    alt="FotoPerfil"
                    width={200}
                    height={300}
                    loading="eager"
                />
            </div>
            <div className="flex flex-col w-full md:w-2/3 gap-2 justify-center">
                <h1 className="text-2xl">{perfil.nombre}</h1>
                <h2>{perfil.profesion}</h2>
                <p>{perfil.ubicacion}</p>
                <p className="text-justify">{perfil.resumen}</p>
                <p>{perfil.correo}</p>
                <p>{perfil.telefono}</p>
            </div>
        </main>
    )
}