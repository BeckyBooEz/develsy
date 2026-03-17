import Image from "next/image"
import { Perfil } from "../data/DataCv"

interface Props {
    perfil: Perfil
}

export default function CurriculumPerfil({ perfil }: Props) {
    return (
        <main className="flex flex-col md:flex-row justify-start items-center w-screen gap-10">
            <div className="w-full md:w-1/3 flex justify-center">
                <Image
                    className="rounded-full"
                    src={"/img/perfilarturo.webp"}
                    alt="FotoPerfil"
                    width={400}
                    height={400}
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