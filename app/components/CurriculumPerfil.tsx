import Image from "next/image"
import { Perfil } from "../data/DataCv"

interface Props {
    perfil: Perfil
}

export default function CurriculumPerfil({ perfil }: Props) {
    return (
        <div className="flex flex-col md:flex-row w-screen gap-8 md:gap-32">
            <div className="flex justify-center">
                <Image src={"/img/perfilarturo.webp"} alt="FotoPerfil" width={400} height={400} />
            </div>
            <div className="flex flex-col justify-center gap-2">
                <p>{perfil.nombre}</p>
                <p>{perfil.profesion}</p>
                <p>{perfil.correo}</p>
                <p>{perfil.telefono}</p>
                <p>{perfil.ubicacion}</p>
                <p>{perfil.resumen}</p>
            </div>
        </div>
    )
}